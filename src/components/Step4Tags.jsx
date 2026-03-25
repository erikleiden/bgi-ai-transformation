import { useState } from 'react'
import { STRUCTURAL_TAGS } from '../data/roles'
import { Badge } from '@/components/ui/badge'
import InfoTip from './InfoTip'
import { ChevronDown, ChevronUp } from 'lucide-react'

function ExposureBar({ auto, aug }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <InfoTip text={`Automation score: ${(auto * 100).toFixed(0)}% — how much of this task AI can do end-to-end`}>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 w-8">Auto</span>
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-bgi-crimson rounded-full" style={{ width: `${auto * 100}%` }} />
          </div>
        </div>
      </InfoTip>
      <InfoTip text={`Augmentation score: ${(aug * 100).toFixed(0)}% — how much AI can enhance human performance`}>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 w-8">Aug</span>
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-bgi-navy rounded-full" style={{ width: `${aug * 100}%` }} />
          </div>
        </div>
      </InfoTip>
    </div>
  )
}

const TAG_COLORS = {
  developmental: 'bg-purple-100 text-purple-700 border-purple-200',
  'atrophy-risk': 'bg-amber-100 text-amber-700 border-amber-200',
  'relationship-critical': 'bg-blue-100 text-blue-700 border-blue-200',
  bottleneck: 'bg-red-100 text-red-700 border-red-200',
}

export default function Step4Tags({ role, taskTags, onUpdateTags }) {
  const [expandedTask, setExpandedTask] = useState(null)
  const [filterImpacted, setFilterImpacted] = useState(true)

  const tasks = filterImpacted ? role.tasks.filter((t) => t.impacted) : role.tasks

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-bgi-navy mb-1">Structural Tagging</h2>
          <p className="text-gray-500 text-sm">
            Tag tasks with structural properties that carry forward as constraints. Sorted by AI exposure.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap mt-1">
          <input
            type="checkbox"
            checked={filterImpacted}
            onChange={(e) => setFilterImpacted(e.target.checked)}
            className="rounded"
          />
          AI-impacted only
        </label>
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

      <div className="space-y-2">
        {tasks
          .sort((a, b) => b.auto - a.auto || b.aug - a.aug)
          .map((task) => {
            const tags = taskTags[task.id] || []
            const isExpanded = expandedTask === task.id

            return (
              <div
                key={task.id}
                className={`border rounded-lg transition-all ${
                  task.impacted ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <button
                  onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                  className="w-full p-3 flex items-start gap-3 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 leading-snug">{task.text}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <ExposureBar auto={task.auto} aug={task.aug} />
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
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 border-t pt-3">
                    <p className="text-xs text-gray-500 mb-2">Select applicable structural tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {STRUCTURAL_TAGS.map((tag) => {
                        const isActive = tags.includes(tag.id)
                        return (
                          <button
                            key={tag.id}
                            onClick={() => {
                              const next = isActive
                                ? tags.filter((t) => t !== tag.id)
                                : [...tags, tag.id]
                              onUpdateTags(task.id, next)
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
              </div>
            )
          })}
      </div>
    </div>
  )
}
