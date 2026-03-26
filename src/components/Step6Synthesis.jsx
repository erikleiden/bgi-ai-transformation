import { useMemo } from 'react'
import { CORE_QUESTIONS, routeTask, BUCKETS, getEnrichedClusters } from '../data/roles'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import InfoTip from './InfoTip'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

// Resolve cluster-level answers/tags to per-task bucket assignments
function resolveTaskBuckets(role, clusterAnswers, clusterTags) {
  const bucketMap = {
    'human-led': [],
    'human-in-the-loop': [],
    'human-on-the-loop': [],
    'fully-automated': [],
  }
  const taskToCluster = {}

  for (const cluster of role.clusters) {
    const answers = clusterAnswers[cluster.id] || {}
    const tags = clusterTags[cluster.id] || []
    const allAnswered = CORE_QUESTIONS.every((q) => answers[q.id])

    for (const taskId of cluster.taskIds) {
      taskToCluster[taskId] = cluster.id
      const task = role.tasks.find((t) => t.id === taskId)
      if (!task || !task.impacted || !allAnswered) continue
      const bucket = routeTask(answers, tags)
      bucketMap[bucket].push({ ...task, clusterId: cluster.id })
    }
  }

  return { bucketMap, taskToCluster }
}

function ClusterGroupedBucketCard({ bucketId, tasks, role }) {
  const b = BUCKETS[bucketId]
  // Group tasks by cluster
  const clusterMap = {}
  for (const task of tasks) {
    const cluster = role.clusters.find((c) => c.taskIds.includes(task.id))
    const key = cluster?.id || 'unknown'
    if (!clusterMap[key]) clusterMap[key] = { cluster, tasks: [] }
    clusterMap[key].tasks.push(task)
  }

  return (
    <Card className="border-l-4" style={{ borderLeftColor: b.color }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <span style={{ color: b.color }}>{b.label}</span>
          <Badge variant="outline">{tasks.length} tasks</Badge>
        </CardTitle>
        <p className="text-xs text-gray-500">{b.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.values(clusterMap).map(({ cluster, tasks: clusterTasks }) => (
            <div key={cluster?.id || 'unknown'}>
              <p className="text-xs font-medium text-gray-500 mb-1">
                {cluster?.label || 'Unclustered'}
              </p>
              <ul className="space-y-1 pl-3">
                {clusterTasks.map((task) => (
                  <li key={task.id} className="text-sm text-gray-700 list-disc">
                    {task.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SkillImplications({ role, bucketMap }) {
  const implications = useMemo(() => {
    const automatedCount = (bucketMap['fully-automated'] || []).length
    const hotlCount = (bucketMap['human-on-the-loop'] || []).length
    const hitlCount = (bucketMap['human-in-the-loop'] || []).length
    const humanLedCount = (bucketMap['human-led'] || []).length
    const total = automatedCount + hotlCount + hitlCount + humanLedCount

    if (total === 0) return null

    const automationRate = (automatedCount + hotlCount) / total

    return role.skills.map((skill) => {
      let status, color
      if (automationRate > 0.6) {
        status = 'Declining \u2014 most associated tasks automated'
        color = 'text-red-600'
      } else if (automationRate > 0.3) {
        status = 'Transforming \u2014 shifting from execution to oversight'
        color = 'text-amber-600'
      } else {
        status = 'Persisting \u2014 remains core to the human-led work'
        color = 'text-green-600'
      }
      return { ...skill, status, color }
    })
  }, [role.skills, bucketMap])

  if (!implications) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-bgi-navy">Skill Implications</CardTitle>
        <p className="text-xs text-gray-500">
          How the task allocations affect demand for this role's key skills
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {implications.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between py-1.5 border-b last:border-0">
              <div>
                <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                {skill.salaryPremium !== undefined && (
                  <span className="text-xs text-gray-400 ml-2">
                    {skill.salaryPremium >= 0 ? '+' : ''}
                    {skill.salaryPremium}% salary premium
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${skill.color}`}>{skill.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ExpertiseAnalysis({ clusterAnswers, bucketMap }) {
  const analysis = useMemo(() => {
    const allTasks = Object.values(bucketMap).flat()
    let routineAutomated = 0
    let expertAutomated = 0
    let routineTotal = 0
    let expertTotal = 0

    // Get the cluster-level expertise answer for each task
    allTasks.forEach((task) => {
      const clusterId = task.clusterId
      const answers = clusterAnswers[clusterId] || {}
      const bucket = (() => {
        for (const [b, tasks] of Object.entries(bucketMap)) {
          if (tasks.some((t) => t.id === task.id)) return b
        }
        return null
      })()

      if (answers.expertise === 'routine') {
        routineTotal++
        if (bucket === 'fully-automated' || bucket === 'human-on-the-loop') routineAutomated++
      } else if (answers.expertise === 'expert') {
        expertTotal++
        if (bucket === 'fully-automated' || bucket === 'human-on-the-loop') expertAutomated++
      }
    })

    const routineRate = routineTotal > 0 ? routineAutomated / routineTotal : 0
    const expertRate = expertTotal > 0 ? expertAutomated / expertTotal : 0

    if (routineRate > expertRate && routineRate > 0.3) {
      return {
        direction: 'up',
        text: 'Expertise bar is rising. Primarily routine task clusters are being automated, concentrating the role around its most expert functions. This implies a smaller, more specialized, potentially higher-paid talent pool.',
      }
    } else if (expertRate > routineRate && expertRate > 0.3) {
      return {
        direction: 'down',
        text: 'Expertise bar is lowering. Expert task clusters are being automated, making the role more accessible. This expands the talent pool but may reduce compensation expectations.',
      }
    }
    return {
      direction: 'neutral',
      text: 'Mixed expertise impact. Both routine and expert task clusters are being redistributed, leading to a transformed rather than simply elevated or simplified role.',
    }
  }, [clusterAnswers, bucketMap])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-bgi-navy flex items-center gap-2">
          Expertise Implications
          <Badge
            variant="outline"
            className={
              analysis.direction === 'up'
                ? 'border-green-300 text-green-700'
                : analysis.direction === 'down'
                ? 'border-orange-300 text-orange-700'
                : 'border-gray-300 text-gray-600'
            }
          >
            Bar {analysis.direction === 'up' ? 'Rising' : analysis.direction === 'down' ? 'Lowering' : 'Mixed'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 leading-relaxed">{analysis.text}</p>
      </CardContent>
    </Card>
  )
}

function Flags({ clusterTags, bucketMap, role }) {
  const flags = useMemo(() => {
    const result = []
    const allTasks = Object.values(bucketMap).flat()

    // Build cluster -> bucket mapping
    const clusterBuckets = {}
    for (const [bucketId, tasks] of Object.entries(bucketMap)) {
      for (const task of tasks) {
        const cluster = role.clusters.find((c) => c.taskIds.includes(task.id))
        if (cluster) clusterBuckets[cluster.id] = bucketId
      }
    }

    for (const cluster of role.clusters) {
      const tags = clusterTags[cluster.id] || []
      const bucket = clusterBuckets[cluster.id]
      if (!bucket) continue

      if (tags.includes('developmental') && (bucket === 'fully-automated' || bucket === 'human-on-the-loop')) {
        result.push({
          type: 'warning',
          text: `"${cluster.label}" is tagged as developmental but routed to ${BUCKETS[bucket].label}. Automating these tasks may erode the learning pipeline.`,
        })
      }
      if (tags.includes('atrophy-risk') && (bucket === 'human-on-the-loop' || bucket === 'human-in-the-loop')) {
        result.push({
          type: 'caution',
          text: `"${cluster.label}" has atrophy risk in a ${BUCKETS[bucket].label} configuration. Human oversight may degrade over time. Consider rotation or manual practice periods.`,
        })
      }
      if (tags.includes('relationship-critical') && bucket === 'fully-automated') {
        result.push({
          type: 'warning',
          text: `"${cluster.label}" is relationship-critical but routed to fully automated. This may destroy relational value.`,
        })
      }
    }

    return result
  }, [clusterTags, bucketMap, role.clusters])

  if (flags.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-bgi-navy">Flags & Considerations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {flags.map((flag, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm ${
                flag.type === 'warning'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {flag.text}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RoleNarrative({ role, bucketMap }) {
  const autoCount = (bucketMap['fully-automated']?.length || 0) + (bucketMap['human-on-the-loop']?.length || 0)
  const humanCount = (bucketMap['human-led']?.length || 0) + (bucketMap['human-in-the-loop']?.length || 0)
  const total = autoCount + humanCount

  if (total === 0) return <p className="text-sm text-gray-500">Complete cluster assessments to generate narrative.</p>

  const autoRate = autoCount / total
  const humanLedTasks = bucketMap['human-led'] || []
  const fullyAutoTasks = bucketMap['fully-automated'] || []

  let narrative = ''
  if (autoRate > 0.6) {
    narrative = `Based on your assessment, the ${role.title} role is poised for significant transformation. Over ${Math.round(autoRate * 100)}% of assessed tasks can be meaningfully automated or operate with minimal human oversight. `
  } else if (autoRate > 0.3) {
    narrative = `The ${role.title} role shows a balanced transformation profile. About ${Math.round(autoRate * 100)}% of tasks can be automated or monitored, while the remainder requires active human involvement. `
  } else {
    narrative = `The ${role.title} role remains primarily human-centered. Only ${Math.round(autoRate * 100)}% of tasks are candidates for automation. `
  }

  if (humanLedTasks.length > 0) {
    narrative += `${humanLedTasks.length} task${humanLedTasks.length > 1 ? 's remain' : ' remains'} fundamentally human, anchoring the role's core identity. `
  }

  if (fullyAutoTasks.length > 0) {
    narrative += `${fullyAutoTasks.length} task${fullyAutoTasks.length > 1 ? 's are' : ' is'} candidates for full automation, freeing capacity for the higher-value human work that remains.`
  }

  return <p className="text-sm text-gray-700 leading-relaxed">{narrative}</p>
}

export default function Step6Synthesis({ role, clusterTags, clusterAnswers }) {
  const { bucketMap } = useMemo(
    () => resolveTaskBuckets(role, clusterAnswers, clusterTags),
    [role, clusterAnswers, clusterTags]
  )

  const assessedCount = Object.values(bucketMap).flat().length
  const totalImpacted = role.tasks.filter((t) => t.impacted).length
  const clusters = getEnrichedClusters(role).filter((c) => c.impactedCount > 0)
  const assessedClusters = clusters.filter((c) => {
    const a = clusterAnswers[c.id] || {}
    return CORE_QUESTIONS.every((q) => a[q.id])
  }).length

  // Chart data — count individual tasks
  const pieData = Object.entries(BUCKETS).map(([id, b]) => ({
    name: b.label,
    value: (bucketMap[id] || []).length,
    color: b.color,
  })).filter((d) => d.value > 0)

  const barData = Object.entries(BUCKETS).map(([id, b]) => ({
    name: b.label.replace('Human-', 'H-'),
    count: (bucketMap[id] || []).length,
    fill: b.color,
  }))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-bgi-navy mb-1">Synthesis</h2>
        <p className="text-gray-500 text-sm">
          {assessedClusters} of {clusters.length} clusters assessed ({assessedCount} of {totalImpacted} impacted tasks).
          {assessedClusters < clusters.length && (
            <span className="text-amber-600 ml-1">
              Go back to Step 5 to assess remaining clusters.
            </span>
          )}
        </p>
      </div>

      {assessedCount === 0 ? (
        <Card className="p-8 text-center text-gray-500">
          No clusters have been assessed yet. Complete Step 5 to see the synthesis.
        </Card>
      ) : (
        <>
          {/* Distribution charts */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base text-bgi-navy">Task Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <RTooltip formatter={(value, name) => [`${value} tasks`, name]} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-xs">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-base text-bgi-navy">Tasks per Bucket</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} allowDecimals={false} />
                    <RTooltip
                      contentStyle={{ fontSize: 13, borderRadius: 6 }}
                      formatter={(value) => [`${value} tasks`]}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {barData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Task allocation map — grouped by cluster within each bucket */}
          <div>
            <h3 className="text-lg font-semibold text-bgi-navy mb-3">Task Allocation Map</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(BUCKETS).map((bucketId) => {
                const tasks = bucketMap[bucketId] || []
                if (tasks.length === 0) return null
                return (
                  <ClusterGroupedBucketCard
                    key={bucketId}
                    bucketId={bucketId}
                    tasks={tasks}
                    role={role}
                  />
                )
              })}
            </div>
          </div>

          {/* Skill implications */}
          <SkillImplications role={role} bucketMap={bucketMap} />

          {/* Expertise analysis */}
          <ExpertiseAnalysis clusterAnswers={clusterAnswers} bucketMap={bucketMap} />

          {/* Flags */}
          <Flags clusterTags={clusterTags} bucketMap={bucketMap} role={role} />

          {/* Role narrative */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-bgi-navy">Role-Level Narrative</CardTitle>
            </CardHeader>
            <CardContent>
              <RoleNarrative role={role} bucketMap={bucketMap} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
