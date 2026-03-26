import { useState } from 'react'
import { STRUCTURAL_TAGS, getEnrichedClusters } from '../data/roles'
import { Badge } from '@/components/ui/badge'
import InfoTip from './InfoTip'
import { ChevronDown, ChevronUp } from 'lucide-react'

function ExposureBar({ label, value, color }) {
  return (
    <InfoTip text={`${label}: ${(value * 100).toFixed(0)}%`}>
      <div className="flex items-center gap-1 text-xs">
        <span className="text-gray-400 w-8">{label}</span>
        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${value * 100}%`, backgroundColor: color }} />
        </div>
      </div>
    </InfoTip>
  )
}

const TAG_COLORS = {
  developmental: 'bg-purple-100 text-purple-700 border-purple-200',
  'atrophy-risk': 'bg-amber-100 text-amber-700 border-amber-200',
  'relationship-critical': 'bg-blue-100 text-blue-700 border-blue-200',
  bottleneck: 'bg-red-100 text-red-700 border-red-200',
}

export default function Step4Tags({ role, clusterTags, onUpdateTags }) {
  const [expandedCluster, setExpandedCluster] = useState(null)
  const clusters = getEnrichedClusters(role).sort((a, b) => b.avgAuto - a.avgAuto)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-bgi-navy mb-1">Structural Tagging</h2>
        <p className="text-gray-500 text-sm">
          Tasks are grouped into functional clusters. Tag each cluster with structural properties that carry forward as constraints.
        </p>
      </div>

      {/* Tag legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STRUCTURAL_TAGS.map((tag) => (
          <InfoTip key={tag.id} text={tag.description}>
            <Badge variant="outline" className={TAG_COLORS[tag.id]}>
              {tag.label}
            </Badge>
          </InfoTip>
        ))}
      </div>

      <div className="space-y-3">
        {clusters.map((cluster) => {
          const tags = clusterTags[cluster.id] || []
          const isExpanded = expandedCluster === cluster.id
          const hasImpacted = cluster.impactedCount > 0

          return (
            <div
              key={cluster.id}
              className={`border rounded-lg transition-all ${hasImpacted ? 'bg-white' : 'bg-gray-50 opacity-60'}`}
            >
              {/* Cluster header */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setExpandedCluster(isExpanded ? null : cluster.id)}
                onKeyDown={(e) => e.key === 'Enter' && setExpandedCluster(isExpanded ? null : cluster.id)}
                className="w-full p-4 flex items-start gap-3 text-left cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{cluster.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {cluster.impactedCount}/{cluster.totalCount} tasks impacted
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{cluster.description}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <ExposureBar label="Auto" value={cluster.avgAuto} color="#C12035" />
                    <ExposureBar label="Aug" value={cluster.avgAug} color="#024879" />
                    {tags.map((t) => (
                      <Badge key={t} variant="outline" className={`text-xs ${TAG_COLORS[t]}`}>
                        {STRUCTURAL_TAGS.find((s) => s.id === t)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                )}
              </div>

              {/* Expanded: tasks + tag selection */}
              {isExpanded && (
                <div className="border-t px-4 pb-4 pt-3 space-y-3">
                  {/* Tag selection */}
                  {hasImpacted && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2 font-medium">Structural tags for this cluster:</p>
                      <div className="flex flex-wrap gap-2">
                        {STRUCTURAL_TAGS.map((tag) => {
                          const isActive = tags.includes(tag.id)
                          return (
                            <button
                              key={tag.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                const next = isActive
                                  ? tags.filter((t) => t !== tag.id)
                                  : [...tags, tag.id]
                                onUpdateTags(cluster.id, next)
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                                isActive
                                  ? TAG_COLORS[tag.id] + ' font-medium'
                                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
                              }`}
                            >
                              {tag.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Task list */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Tasks in this cluster:</p>
                    <ul className="space-y-1.5">
                      {cluster.tasks.map((task) => (
                        <li
                          key={task.id}
                          className={`text-sm p-2 rounded ${
                            task.impacted ? 'text-gray-700 bg-gray-50' : 'text-gray-400 bg-gray-100 italic'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="flex-1">{task.text}</span>
                            {task.impacted ? (
                              <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                                {(task.auto * 100).toFixed(0)}% / {(task.aug * 100).toFixed(0)}%
                              </span>
                            ) : (
                              <Badge variant="outline" className="text-xs shrink-0 opacity-60">
                                Not impacted
                              </Badge>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
