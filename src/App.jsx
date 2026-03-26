import { useState, useCallback } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ROLES } from './data/roles'
import Header from './components/Header'
import Footer from './components/Footer'
import StepNav from './components/StepNav'
import Step1Category from './components/Step1Category'
import Step2Intent from './components/Step2Intent'
import Step3Role from './components/Step3Role'
import Step4Tags from './components/Step4Tags'
import Step5Questions from './components/Step5Questions'
import Step6Synthesis from './components/Step6Synthesis'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])

  const [category, setCategory] = useState(null)
  const [intent, setIntent] = useState(null)
  const [roleId, setRoleId] = useState(null)

  const [clusterTags, setClusterTags] = useState({})
  const [clusterAnswers, setClusterAnswers] = useState({})

  const selectedRole = ROLES.find((r) => r.id === roleId)

  const completeStep = useCallback(
    (step) => {
      if (!completedSteps.includes(step)) {
        setCompletedSteps((prev) => [...prev, step])
      }
    },
    [completedSteps]
  )

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!category
      case 2: return !!intent
      case 3: return !!roleId
      case 4: return true
      case 5: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (canProceed()) {
      completeStep(currentStep)
      setCurrentStep((s) => Math.min(6, s + 1))
    }
  }

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1))
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <StepNav
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={(step) => setCurrentStep(step)}
        />

        <main className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
          {currentStep === 1 && (
            <Step1Category
              selected={category}
              onSelect={(c) => {
                setCategory(c)
                setRoleId(null)
              }}
            />
          )}
          {currentStep === 2 && <Step2Intent selected={intent} onSelect={setIntent} />}
          {currentStep === 3 && (
            <Step3Role
              category={category}
              selected={roleId}
              onSelect={(id) => setRoleId(id)}
            />
          )}
          {currentStep === 4 && selectedRole && (
            <Step4Tags
              role={selectedRole}
              clusterTags={clusterTags}
              onUpdateTags={(clusterId, tags) =>
                setClusterTags((prev) => ({ ...prev, [clusterId]: tags }))
              }
            />
          )}
          {currentStep === 5 && selectedRole && (
            <Step5Questions
              role={selectedRole}
              clusterTags={clusterTags}
              clusterAnswers={clusterAnswers}
              onUpdateAnswers={(clusterId, answers) =>
                setClusterAnswers((prev) => ({ ...prev, [clusterId]: answers }))
              }
            />
          )}
          {currentStep === 6 && selectedRole && (
            <Step6Synthesis
              role={selectedRole}
              clusterTags={clusterTags}
              clusterAnswers={clusterAnswers}
            />
          )}
        </main>

        <div className="border-t bg-white px-6 py-3 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < 6 && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium bg-bgi-navy text-white hover:bg-bgi-navy/90 disabled:opacity-30 transition-colors"
            >
              {currentStep < 5 ? 'Continue' : 'View Synthesis'}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <Footer />
      </div>
    </TooltipProvider>
  )
}
