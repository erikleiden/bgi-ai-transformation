import { ROLES } from '../data/roles'
import { Badge } from '@/components/ui/badge'
import InfoTip from './InfoTip'

export default function Step3Role({ category, selected, onSelect }) {
  const filtered = ROLES.filter((r) => r.category === category)

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-bgi-navy mb-2">Select a Role</h2>
      <p className="text-gray-500 mb-6">
        Choose the specific role to evaluate for AI transformation.
      </p>
      <div className="grid gap-3">
        {filtered.map((role) => (
          <div
            key={role.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(role.id)}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(role.id)}
            className={`p-5 rounded-lg border-2 text-left transition-all cursor-pointer ${
              selected === role.id
                ? 'border-bgi-navy bg-blue-50'
                : 'border-gray-200 hover:border-bgi-midblue hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900 text-lg">{role.title}</span>
              <Badge
                variant="outline"
                className={
                  role.aiImpact.tilt === 'augmentation'
                    ? 'border-green-300 text-green-700 bg-green-50'
                    : 'border-orange-300 text-orange-700 bg-orange-50'
                }
              >
                {role.aiImpact.tilt === 'augmentation' ? 'Augmentation tilt' : 'Automation tilt'}
              </Badge>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <InfoTip text="Projected change in demand over 3 years under baseline AI adoption scenario">
                <span>
                  Impact:{' '}
                  <span className={role.aiImpact.score >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {role.aiImpact.score >= 0 ? '+' : ''}
                    {role.aiImpact.score}%
                  </span>
                </span>
              </InfoTip>
              <InfoTip text="Share of tasks exposed to current AI capabilities (0\u20131 scale)">
                <span>Exposure: {role.aiImpact.exposure.toFixed(2)}</span>
              </InfoTip>
              <span>{role.tasks.length} tasks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
