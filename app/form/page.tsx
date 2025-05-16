/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { storeFormDataAndGeneratePlan } from "../submit-form/actions/submitForm"
import { useState } from "react"
import { toast } from "sonner"
import { ArrowLeft, ArrowRight, CheckCircle2, Loader, MonitorIcon as Running } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  goal: z.string().min(1, "Please select a running goal"),
  fitnessLevel: z.string().min(1, "Please select your fitness level"),
  daysPerWeek: z.string().min(1, "Please select days per week"),
  timePerRun: z.string().min(1, "Please enter time per run"),
  injuries: z.string().optional(),
  environment: z.string().min(1, "Please select your preferred environment"),
  pace: z.string().min(1, "Please enter your typical pace"),
  motivations: z.array(z.string()).min(1, "Please select at least one motivation"),
  nutrition: z.string().min(1, "Please select your nutrition habit"),
  additionalInfo: z.string().optional(),
  raceDate: z.string().optional(),
  prefersCrossTraining: z.boolean().optional(),
  crossTrainingActivities: z.array(z.string()).optional(),
  sleepQuality: z.string().optional(),
  recoveryTools: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof formSchema>

// Define the steps
const steps = [
  {
    id: "goals",
    name: "Running Goals",
    fields: ["goal", "raceDate"],
  },
  {
    id: "fitness",
    name: "Current Fitness",
    fields: ["fitnessLevel", "pace", "injuries"],
  },
  {
    id: "training",
    name: "Training Preferences",
    fields: ["daysPerWeek", "timePerRun", "environment", "prefersCrossTraining", "crossTrainingActivities"],
  },
  {
    id: "recovery",
    name: "Recovery & Motivation",
    fields: ["recoveryTools", "sleepQuality", "motivations"],
  },
  {
    id: "additional",
    name: "Additional Info",
    fields: ["nutrition", "additionalInfo"],
  },
]

export default function FormPage() {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [previousStep, setPreviousStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivations: [],
      crossTrainingActivities: [],
      recoveryTools: [],
    },
    mode: "onChange",
  })

  const processForm = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await storeFormDataAndGeneratePlan(data)
      setIsComplete(true)
      toast.success("Form submitted successfully!")
    } catch (error) {
      console.error("Error storing form data:", error)
      toast.error("There was an error submitting the form.")
    } finally {
      setLoading(false)
    }
  }

  // Check if fields in the current step are valid
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

  const currentFields = steps[currentStep].fields

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mr-3"></div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
            YourRunPlan
          </h1>
        </div>
        <Link href="/">
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
            <Running className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
            Get Your Personalized Running Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your running goals and preferences so we can create the perfect training plan for you.
          </p>
        </div>

        {/* Progress indicator */}
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

        {isComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Your Plan is Being Created!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for providing your information. Our AI is now crafting your personalized running plan.
            </p>
            <p className="text-gray-600 mb-6">
              We&apos;ll notify you as soon as your custom plan is ready. In the meantime, get your running shoes ready!
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                Return to Home
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <Form {...form}>
              <form className="space-y-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {/* Step 1: Running Goals */}
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-6">Your Running Goals</h2>

                        <FormField
                          control={form.control}
                          name="goal"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                What is your primary running goal?
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500">
                                    <SelectValue placeholder="Select your primary running goal" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="5K">5K</SelectItem>
                                  <SelectItem value="10K">10K</SelectItem>
                                  <SelectItem value="Half Marathon">Half Marathon</SelectItem>
                                  <SelectItem value="Marathon">Marathon</SelectItem>
                                  <SelectItem value="General Fitness">General Fitness</SelectItem>
                                  <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="raceDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                Do you have a target race date?
                              </FormLabel>
                              <Input
                                type="date"
                                {...field}
                                className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 2: Current Fitness */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-6">Your Current Fitness</h2>

                        <FormField
                          control={form.control}
                          name="fitnessLevel"
                          render={({ field }) => (
                            <FormItem className="space-y-3 mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                How would you describe your current fitness level?
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                    <FormItem key={level} className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={level} className="text-emerald-600" />
                                      </FormControl>
                                      <FormLabel className="font-normal">{level}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pace"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                What is your typical running pace or speed?
                              </FormLabel>
                              <Input
                                placeholder="e.g., 6:30/km or 9 mph"
                                {...field}
                                className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="injuries"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                Do you have any current or past injuries or health issues?
                              </FormLabel>
                              <Textarea
                                {...field}
                                className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Please describe any injuries or health concerns that might affect your training"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 3: Training Preferences */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-6">Training Preferences</h2>

                        <FormField
                          control={form.control}
                          name="daysPerWeek"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                How many days per week can you commit to running?
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500">
                                    <SelectValue placeholder="Select days per week" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[...Array(7)].map((_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timePerRun"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                How much time (in minutes) do you have for each run?
                              </FormLabel>
                              <Input
                                type="number"
                                {...field}
                                className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="environment"
                          render={({ field }) => (
                            <FormItem className="space-y-3 mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                What type of running environment do you prefer?
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  {["Road", "Trail", "Treadmill", "Mixed"].map((env) => (
                                    <FormItem key={env} className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={env} className="text-emerald-600" />
                                      </FormControl>
                                      <FormLabel className="font-normal">{env}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="prefersCrossTraining"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 mb-6">
                              <FormControl>
                                <Checkbox
                                  checked={!!field.value}
                                  onCheckedChange={(checked) => field.onChange(checked)}
                                  className="text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-gray-700">
                                Do you want to include cross-training in your plan?
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="crossTrainingActivities"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                If yes, what types of cross-training do you enjoy?
                              </FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                {["Cycling", "Swimming", "Yoga", "Strength Training", "HIIT", "Other"].map(
                                  (activity) => {
                                    const isChecked = field.value?.includes(activity)
                                    return (
                                      <FormItem key={activity} className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={(checked) => {
                                              const newValue = checked
                                                ? [...(field.value || []), activity]
                                                : (field.value || []).filter((v) => v !== activity)
                                              field.onChange(newValue)
                                            }}
                                            className="text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">{activity}</FormLabel>
                                      </FormItem>
                                    )
                                  },
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 4: Recovery & Motivation */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-6">Recovery & Motivation</h2>

                        <FormField
                          control={form.control}
                          name="recoveryTools"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                Which recovery tools or methods do you use?
                              </FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                {["Foam Roller", "Massage", "Stretching", "Ice Bath", "None", "Other"].map((tool) => {
                                  const isChecked = field.value?.includes(tool)
                                  return (
                                    <FormItem key={tool} className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={isChecked}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...(field.value || []), tool]
                                              : (field.value || []).filter((v) => v !== tool)
                                            field.onChange(newValue)
                                          }}
                                          className="text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{tool}</FormLabel>
                                    </FormItem>
                                  )
                                })}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sleepQuality"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                How would you rate your sleep quality?
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500">
                                    <SelectValue placeholder="Select sleep quality" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Excellent">Excellent</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="motivations"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">What motivates you to run?</FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                {[
                                  "Competition",
                                  "Weight Loss",
                                  "Stress Relief",
                                  "Social",
                                  "Fun",
                                  "Health",
                                  "Other",
                                ].map((motivation) => {
                                  const isChecked = field.value.includes(motivation)
                                  return (
                                    <FormItem key={motivation} className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={isChecked}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...field.value, motivation]
                                              : field.value.filter((v) => v !== motivation)
                                            field.onChange(newValue)
                                          }}
                                          className="text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{motivation}</FormLabel>
                                    </FormItem>
                                  )
                                })}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 5: Additional Information */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-emerald-700 mb-6">Additional Information</h2>

                        <FormField
                          control={form.control}
                          name="nutrition"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel className="text-gray-700 font-medium">
                                How would you describe your current nutrition habits?
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500">
                                    <SelectValue placeholder="Select your nutrition habit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Balanced">Balanced</SelectItem>
                                  <SelectItem value="High Carb">High Carb</SelectItem>
                                  <SelectItem value="Low Carb">Low Carb</SelectItem>
                                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="additionalInfo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                Any additional information or preferences you&apos;d like to share?
                              </FormLabel>
                              <Textarea
                                {...field}
                                className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Tell us anything else that might help us create your perfect running plan"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
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
              </form>
            </Form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mr-2"></div>
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
              YourRunPlan
            </h3>
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} YourRunPlan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
