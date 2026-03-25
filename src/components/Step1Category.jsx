import { JOB_CATEGORIES } from '../data/roles'

export default function Step1Category({ selected, onSelect }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-bgi-navy mb-2">Select a Job Category</h2>
      <p className="text-gray-500 mb-6">
        Choose a broad grouping to start narrowing the role you want to evaluate.
      </p>
      <div className="grid gap-3">
        {JOB_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
              selected === cat.id
                ? 'border-bgi-navy bg-blue-50'
                : 'border-gray-200 hover:border-bgi-midblue hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="font-medium text-gray-900">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
