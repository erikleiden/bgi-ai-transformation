import { useState } from 'react'
import { CORE_QUESTIONS, routeTask, BUCKETS, getEnrichedClusters } from '../data/roles'
import { Badge } from '@/components/ui/badge'
import InfoTip from './InfoTip'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

function QuestionCard({ question, value, onChange }) {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <InfoTip text={question.description}>
          <span className="font-medium text-sm text-gray-800">{question.question}</span>
        </InfoTip>
      </div>
      <div className="grid gap-1.5">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`p-2.5 rounded-lg border text-left text-sm transition-all ${
              value === opt.value
                ? 'border-bgi-navy bg-blue-50 text-bgi-navy'
                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{opt.label}</span>
            <span className="text-gray-500 ml-1.5">&mdash; {opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Step5Questions({ role, clusterTags, clusterAnswers, onUpdateAnswers }) {
  const clusters = getEnrichedClusters(role)
    .filter((c) => c.impactedCount > 0)
    .sort((a, b) => b.avgAuto - a.avgAuto)

  const [currentIdx, setCurrentIdx] = useState(0)
  const cluster = clusters[currentIdx]

  if (!cluster) return null

  const answers = clusterAnswers[cluster.id] || {}
  const tags = clusterTags[cluster.id] || []
  const allAnswered = CORE_QUESTIONS.every((q) => answers[q.id])
  const bucket = allAnswered ? routeTask(answers, tags) : null

  const answeredCount = clusters.filter((c) => {
    const a = clusterAnswers[c.id] || {}
    return CORE_QUESTIONS.every((q) => a[q.id])
  }).length

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-bgi-navy mb-1">Task-Level Question Tree</h2>
          <p className="text-gray-500 text-sm">
            Answer questions for each task cluster to determine its automation bucket. Answers apply to all tasks in the cluster.
          </p>
        </div>
        <Badge variant="outline" className="text-sm whitespace-nowrap">
          {answeredCount} / {clusters.length} clusters assessed
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-bgi-navy rounded-full transition-all"
          style={{ width: `${(answeredCount / clusters.length) * 100}%` }}
        />
      </div>

      {/* Cluster navigator */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm text-gray-500">
          Cluster {currentIdx + 1} of {clusters.length}
        </span>
        <button
          onClick={() => setCurrentIdx(Math.min(clusters.length - 1, currentIdx + 1))}
          disabled={currentIdx === clusters.length - 1}
          className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Current cluster */}
      <div className="bg-gray-50 rounded-lg p-4 mb-5 border">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">{cluster.label}</span>
          <Badge variant="outline" className="text-xs">
            {cluster.impactedCount} tasks
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-3">{cluster.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>Avg Auto: {(cluster.avgAuto * 100).toFixed(0)}%</span>
          <span>Avg Aug: {(cluster.avgAug * 100).toFixed(0)}%</span>
          {tags.length > 0 && (
            <span className="text-amber-600">Tags: {tags.join(', ')}</span>
          )}
        </div>
        {/* Task list for context */}
        <details className="text-sm">
          <summary className="text-xs text-bgi-navy cursor-pointer hover:underline">
            View {cluster.impactedCount} tasks in this cluster
          </summary>
          <ul className="mt-2 space-y-1 pl-4">
            {cluster.impactedTasks.map((task) => (
              <li key={task.id} className="text-gray-600 text-xs list-disc">
                {task.text}
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Questions */}
      {CORE_QUESTIONS.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          value={answers[q.id]}
          onChange={(val) => {
            onUpdateAnswers(cluster.id, { ...answers, [q.id]: val })
          }}
        />
      ))}

      {/* Routing result */}
      {bucket && (
        <div
          className="mt-4 p-4 rounded-lg border-2 flex items-center gap-3"
          style={{ borderColor: BUCKETS[bucket].color, backgroundColor: BUCKETS[bucket].color + '10' }}
        >
          <Check className="h-5 w-5 shrink-0" style={{ color: BUCKETS[bucket].color }} />
          <div>
            <p className="font-semibold" style={{ color: BUCKETS[bucket].color }}>
              {BUCKETS[bucket].label}
            </p>
            <p className="text-sm text-gray-600">
              {BUCKETS[bucket].description} All {cluster.impactedCount} tasks in this cluster receive this assignment.
            </p>
          </div>
        </div>
      )}

      {/* Quick nav dots */}
      <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t">
        {clusters.map((c, i) => {
          const a = clusterAnswers[c.id] || {}
          const done = CORE_QUESTIONS.every((q) => a[q.id])
          const b = done ? routeTask(a, clusterTags[c.id] || []) : null
          return (
            <button
              key={c.id}
              onClick={() => setCurrentIdx(i)}
              title={c.label}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                i === currentIdx ? 'ring-2 ring-bgi-navy ring-offset-1' : ''
              }`}
              style={{
                backgroundColor: b ? BUCKETS[b].color + '30' : '#f9fafb',
                color: b ? BUCKETS[b].color : '#9ca3af',
                border: `1px solid ${b ? BUCKETS[b].color + '50' : '#e5e7eb'}`,
              }}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
