/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { storeFormDataAndGeneratePlan } from "../submit-form/actions/submitForm"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { ArrowLeft, ArrowRight, CheckCircle2, MonitorIcon as Running } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ProgressIndicator from "@/components/progress-indicator"
import { formSchema } from "@/lib/schema"
import NavigationButtons from "@/components/navigation-buttons"

const loadingStates = [
  {
    text: "Saving your inputs...",
    icon: "💾",
  },
  {
    text: "Your inputs have been saved successfully!",
    icon: "✅",
  },
  {
    text: "Creating your personalized running plan...",
    icon: "🏃",
  },
  {
    text: "Analyzing your fitness level...",
    icon: "📊",
  },
  {
    text: "Calculating optimal training schedule...",
    icon: "📅",
  },
  {
    text: "Designing your workout routines...",
    icon: "💪",
  },
  {
    text: "Optimizing recovery periods...",
    icon: "🧘",
  },
  {
    text: "Finalizing your plan...",
    icon: "🎯",
  },
]

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

type FormData = z.infer<typeof formSchema>

export default function FormPage() {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [previousStep, setPreviousStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [generatedPlanId, setGeneratedPlanId] = useState<string | null>(null)
  const [loadingComplete, setLoadingComplete] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivations: [],
      crossTrainingActivities: [],
      recoveryTools: [],
    },
    mode: "onChange",
  })

  // Handle loading steps animation
  useEffect(() => {
    if (isSubmitting && !loadingComplete) {
      const interval = setInterval(() => {
        if (loadingStep < loadingStates.length - 1) {
          setLoadingStep((prev) => prev + 1)
        } else {
          clearInterval(interval)
          setLoadingComplete(true)
        }
      }, 1500) // Change step every 1.5 seconds

      return () => clearInterval(interval)
    }
  }, [isSubmitting, loadingStep, loadingComplete])

  const processForm = async (data: FormData) => {
    setLoading(true)
    setIsSubmitting(true)

    try {
      // Simulate API delay for the loading animation to show
      const response = await storeFormDataAndGeneratePlan(data)

      console.log('response', response);
      setGeneratedPlanId(response?.planId as string)
      setIsComplete(true)
      toast.success("Your running plan has been created successfully!")

    } catch (error) {
      console.error("Error storing form data:", error)
      toast.error("There was an error creating your plan.")
      setIsSubmitting(false)
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

  const loadingVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
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

        {!isSubmitting && <ProgressIndicator steps={steps} currentStep={currentStep} />}

        {isSubmitting ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              {/* Loading animation container */}
              {!loadingComplete && (
                <div className="relative h-60 w-full mb-8">
                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((loadingStep + 1) / loadingStates.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Loading steps */}
                  <div className="absolute top-32 left-0 right-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={loadingStep}
                        variants={loadingVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <div className="text-4xl mb-4">{loadingStates[loadingStep].icon}</div>
                        <p className="text-lg font-medium text-gray-800">{loadingStates[loadingStep].text}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Step {loadingStep + 1} of {loadingStates.length}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Loading complete view */}
              {loadingComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-emerald-700">Your Plan is Ready!</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    We&apos;ve created your personalized running plan based on your goals and preferences.
                  </p>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Link href={`/generated-plan/${generatedPlanId}`}>
                      <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:cursor-pointer text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
                        View Your Running Plan
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        ) : isComplete ? (
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
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:cursor-pointer text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
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
                <NavigationButtons steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} form={form} processForm={processForm} loading={loading}/>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}
