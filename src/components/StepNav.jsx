import { CheckCircle2, Circle } from 'lucide-react'

const STEPS = [
  { num: 1, label: 'Job Category' },
  { num: 2, label: 'Intent' },
  { num: 3, label: 'Select Role' },
  { num: 4, label: 'Structural Tags' },
  { num: 5, label: 'Question Tree' },
  { num: 6, label: 'Synthesis' },
]

export default function StepNav({ currentStep, onStepClick, completedSteps }) {
  return (
    <nav className="flex items-center gap-1 px-6 py-3 bg-gray-50 border-b overflow-x-auto">
      {STEPS.map((step, i) => {
        const isCompleted = completedSteps.includes(step.num)
        const isCurrent = currentStep === step.num
        const isClickable = isCompleted || step.num <= Math.max(...completedSteps, 0) + 1

        return (
          <div key={step.num} className="flex items-center">
            {i > 0 && <div className="w-6 h-px bg-gray-300 mx-1" />}
            <button
              onClick={() => isClickable && onStepClick(step.num)}
              disabled={!isClickable}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                isCurrent
                  ? 'bg-bgi-navy text-white font-medium'
                  : isCompleted
                  ? 'bg-green-50 text-green-700 hover:bg-green-100'
                  : isClickable
                  ? 'bg-white text-gray-600 hover:bg-gray-100 border'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.num}</span>
            </button>
          </div>
        )
      })}
    </nav>
  )
}
