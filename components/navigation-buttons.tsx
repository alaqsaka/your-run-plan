/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { Button } from './ui/button'
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CheckCircle2, Loader } from 'lucide-react'

const NavigationButtons = ({currentStep, setCurrentStep, form, steps, loading, processForm}) => {
    const [previousStep, setPreviousStep] = useState(0)
    const [direction, setDirection] = useState(0)
  const validateCurrentStep = async () => {
    const fields = steps[currentStep].fields
    const output = await form.trigger(fields as any, { shouldFocus: true })
    return output
  }

  const next = async () => {
    const isValid = await validateCurrentStep()

    if (!isValid) {
      return
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep)
      setDirection(1)
      setCurrentStep((step) => step + 1)
    } else {
      // If on last step, submit the form
      await form.handleSubmit(processForm)()
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setDirection(-1)
      setCurrentStep((step) => step - 1)
    }
  }

  return (
    <div className="flex justify-between pt-6 border-t border-gray-100">
    <Button
      type="button"
      onClick={prev}
      disabled={currentStep === 0}
      variant="outline"
      className={cn(
        "border-emerald-600 text-emerald-600 hover:bg-emerald-50",
        currentStep === 0 && "opacity-50 cursor-not-allowed",
      )}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Previous
    </Button>

    <Button
      type="button"
      onClick={next}
      className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md hover:shadow-lg transition-all"
    >
      {loading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : currentStep === steps.length - 1 ? (
        <>
          Submit
          <CheckCircle2 className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  </div>
  )
}

export default NavigationButtons