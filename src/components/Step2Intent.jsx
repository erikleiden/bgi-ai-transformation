import { INTENTS } from '../data/roles'
import { Target, Cog, Shield } from 'lucide-react'

const ICONS = {
  'augment-decisions': Target,
  'automate-routine': Cog,
  'enhance-monitoring': Shield,
}

export default function Step2Intent({ selected, onSelect }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-bgi-navy mb-2">Scope the Intent</h2>
      <p className="text-gray-500 mb-6">
        What kind of AI transformation are you contemplating? This shapes how tasks are evaluated.
      </p>
      <div className="grid gap-3">
        {INTENTS.map((intent) => {
          const Icon = ICONS[intent.id]
          return (
            <button
              key={intent.id}
              onClick={() => onSelect(intent.id)}
              className={`flex items-start gap-4 p-5 rounded-lg border-2 text-left transition-all ${
                selected === intent.id
                  ? 'border-bgi-navy bg-blue-50'
                  : 'border-gray-200 hover:border-bgi-midblue hover:bg-gray-50'
              }`}
            >
              <Icon className="h-6 w-6 text-bgi-navy shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">{intent.label}</div>
                <div className="text-sm text-gray-500 mt-1">{intent.description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
