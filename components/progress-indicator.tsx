import React from 'react'
import { cn } from "@/lib/utils"
import { CheckCircle2 } from 'lucide-react'

const ProgressIndicator = ({steps, currentStep}) => {
  return (
    <div className="mb-10">
        <div className="flex justify-between items-center w-full mb-4">
             {steps.map((step, index) => (
               <div key={step.id} className="flex flex-col items-center">
                 <div
                   className={cn(
                     "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm relative",
                     currentStep > index
                       ? "bg-emerald-600 text-white"
                       : currentStep === index
                         ? "bg-emerald-100 text-emerald-600 ring-2 ring-emerald-600 ring-offset-2"
                         : "bg-gray-100 text-gray-500",
                   )}
                 >
                   {currentStep > index ? <CheckCircle2 className="h-6 w-6" /> : <span>{index + 1}</span>}
                 </div>
                 <span
                   className={cn(
                     "text-xs mt-2 font-medium hidden md:block",
                     currentStep >= index ? "text-emerald-600" : "text-gray-500",
                   )}
                 >
                   {step.name}
                 </span>
               </div>
             ))}
           </div>
           <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
             <div
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300 ease-in-out"
               style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
             ></div>
        </div>
    </div>
  )
}

export default ProgressIndicator