/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Award, Calendar, Heart, Medal, Shield, Timer, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getGeneratedPlansList } from "./submit-form/actions/submitForm"

export default function LandingPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const handleNotifyClick = () => {
    router.push("/form")
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await getGeneratedPlansList()
        if (result.success) {
          setPlans(result.plans as any)
        }
      } catch (err) {
        console.error("Failed to load plans:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  // Enhanced animations
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const drawPath = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 flex flex-col">
      {/* Header with sports-themed gradient accent */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mr-3"
          ></motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500"
          >
            YourRunPlan
          </motion.h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href="#plans"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Plans
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              href="#features"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Features
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              href="/plans"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
             Browse Plans
            </motion.a>
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={handleNotifyClick}
              className="bg-gradient-to-r hover:cursor-pointer from-emerald-500 to-green-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              Try Now!
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero section with enhanced animations */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 z-0"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-500 opacity-20"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, Math.random() * 50 - 25],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Decorative SVG paths */}
        <svg className="absolute left-0 top-1/4 h-64 w-64 text-emerald-500 opacity-10 z-0" viewBox="0 0 100 100">
          <motion.path
            d="M10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            variants={drawPath}
            initial="hidden"
            animate="visible"
          />
        </svg>

        <svg className="absolute right-0 bottom-1/4 h-64 w-64 text-green-500 opacity-10 z-0" viewBox="0 0 100 100">
          <motion.path
            d="M20,20 L80,20 L80,80 L20,80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            variants={drawPath}
            initial="hidden"
            animate="visible"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-4xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-6">
            <motion.span
              variants={scaleIn}
              className="inline-block px-3 py-1 bg-green-100 text-emerald-800 rounded-full text-sm font-medium mb-4"
            >
              Beta
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 leading-tight"
            >
              AI-Powered Running Plans Tailored Just for You
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              YourRunPlan adapts to your pace, goals, and lifestyle — creating the perfect training program that evolves
              as you do.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative"
          >
            {/* Button: no unexpected scaling */}
            <Button
              onClick={handleNotifyClick}
              size="lg"
              className="relative z-10 bg-gradient-to-r hover:cursor-pointer from-emerald-500 to-green-600  text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
            >
              Try now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Glow animation behind the button, click-through, subtle scale only on itself */}
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 opacity-30 blur-xl pointer-events-none z-0"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Animated stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto text-center"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md"
            >
              <p className="text-emerald-600 font-bold text-2xl">5K+</p>
              <p className="text-xs text-gray-500">Runners</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md"
            >
              <p className="text-emerald-600 font-bold text-2xl">98%</p>
              <p className="text-xs text-gray-500">Completion</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md"
            >
              <p className="text-emerald-600 font-bold text-2xl">24/7</p>
              <p className="text-xs text-gray-500">Support</p>
            </motion.div>
          </motion.div> */}
        </div>

        {/* Enhanced decorative running path */}
        <div className="absolute bottom-0 left-0 right-0 h-8 z-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-200 opacity-70"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-200 opacity-70"
            initial={{ x: "0%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 7.5 }}
          />
        </div>
      </section>

      {/* Sample Plans Section with loading state */}
      <section id="plans" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Popular Training Plans</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our collection of AI-generated training plans or create your own personalized plan.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full">
                  <motion.div
                    className="w-16 h-16 border-4 border-emerald-200 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <motion.div
                    className="w-16 h-16 border-t-4 border-emerald-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </div>
              </div>
              <p className="mt-4 text-gray-600">Loading training plans...</p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence>
                  {plans?.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/plan/${plan.id}`} className="block group">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col"
                        >
                          <div className="relative h-40 bg-gradient-to-br from-emerald-400 to-green-600 overflow-hidden">
                            <motion.div
                              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 0.1 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-white text-center p-4">
                                <h4 className="text-xl font-bold">{plan.plan.category}</h4>
                                <div className="flex items-center justify-center mt-2">
                                  <Medal className="h-6 w-6 mr-1" />
                                  <span>{plan.plan.difficulty}</span>
                                </div>
                              </div>
                            </div>
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                              initial={{ scaleX: 0, originX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                {plan.plan.category}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{plan.plan.weeks.length} weeks</span>
                              </div>
                            </div>
                            <h4 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                              {plan.plan.title}
                            </h4>
                            <div className="mt-auto pt-4 flex justify-between items-center">
                              <div className="flex items-center text-sm text-gray-500">
                                <Timer className="h-4 w-4 mr-1" />
                                <span>{plan.plan.weeks.length * 3} workouts</span>
                              </div>
                              <span className="text-emerald-600 text-sm font-medium group-hover:underline flex items-center">
                                View Plan
                                <motion.span initial={{ x: 0 }} whileHover={{ x: 3 }} className="inline-block ml-1">
                                  <ArrowRight className="h-3 w-3" />
                                </motion.span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mt-10"
              >
                <Button
                  onClick={handleNotifyClick}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md hover:shadow-lg transition-all group"
                >
                  Create Your Custom Plan
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 3 }} className="inline-block ml-2">
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Features section with enhanced animations */}
      <section id="features" className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Training Smarter, Not Harder</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI analyzes your performance data to create the perfect balance of challenge and recovery.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Zap className="h-6 w-6 text-emerald-600" />,
                title: "Adaptive Training",
                description:
                  "AI adjusts your weekly mileage, rest days, and pacing based on your performance and feedback.",
              },
              {
                icon: <Shield className="h-6 w-6 text-emerald-600" />,
                title: "Injury Prevention",
                description:
                  "We prioritize sustainable progress with smart recovery periods to prevent overtraining and burnout.",
              },
              {
                icon: <Award className="h-6 w-6 text-emerald-600" />,
                title: "Goal-Oriented",
                description:
                  "Whether it's your first 5K or a full marathon, your plan evolves with your target and timeline.",
              },
              {
                icon: <Heart className="h-6 w-6 text-emerald-600" />,
                title: "Holistic Support",
                description: "Includes guidance on nutrition, mental focus, and recovery techniques — not just miles.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action with enhanced animations */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-emerald-500 to-green-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, Math.random() * 50 - 25],
                opacity: [0.1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Transform Your Running?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl opacity-90 max-w-2xl mx-auto mb-8"
          >
            We&apos;re building YourRunPlan for passionate runners like you. Join our waitlist today and be the first to
            experience the future of personalized training.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block"
          >
            <Button
              onClick={handleNotifyClick}
              size="lg"
              variant="outline"
              className="bg-white text-emerald-600 hover:bg-gray-100 border-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all relative z-10"
            >
              Try Now!
            </Button>
            {/* Animated glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-xl bg-white opacity-30 blur-xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
