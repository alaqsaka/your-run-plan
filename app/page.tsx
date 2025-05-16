"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Award, Heart, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  const router = useRouter()

  const handleNotifyClick = () => {
    router.push("/form")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 flex flex-col">
      {/* Header with sports-themed gradient accent */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mr-3"></div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
            YourRunPlan
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-gray-700 hover:text-emerald-600 transition-colors">
              FAQ
            </a>
          </nav>
          <Button
            onClick={handleNotifyClick}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Get Early Access
          </Button>
        </div>
      </header>

      {/* Hero section with running imagery */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 bg-green-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              Coming Soon
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 leading-tight">
              AI-Powered Running Plans Tailored Just for You
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              YourRunPlan adapts to your pace, goals, and lifestyle — creating the perfect training program that evolves
              as you do.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
            <Button
              onClick={handleNotifyClick}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <p className="text-emerald-600 font-bold text-2xl">5K+</p>
              <p className="text-xs text-gray-500">Runners</p>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <p className="text-emerald-600 font-bold text-2xl">98%</p>
              <p className="text-xs text-gray-500">Completion</p>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <p className="text-emerald-600 font-bold text-2xl">24/7</p>
              <p className="text-xs text-gray-500">Support</p>
            </div>
          </div>
        </div>

        {/* Decorative running path */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-200 opacity-70 z-0"></div>
      </section>

      {/* Features section with sports icons */}
      <section id="features" className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Training Smarter, Not Harder</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI analyzes your performance data to create the perfect balance of challenge and recovery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Adaptive Training</h4>
              <p className="text-gray-600">
                AI adjusts your weekly mileage, rest days, and pacing based on your performance and feedback.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Injury Prevention</h4>
              <p className="text-gray-600">
                We prioritize sustainable progress with smart recovery periods to prevent overtraining and burnout.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Goal-Oriented</h4>
              <p className="text-gray-600">
                Whether it's your first 5K or a full marathon, your plan evolves with your target and timeline.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Holistic Support</h4>
              <p className="text-gray-600">
                Includes guidance on nutrition, mental focus, and recovery techniques — not just miles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">What Our Runners Say</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied runners who've achieved their goals with YourRunPlan.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah J.",
                role: "Marathon Runner",
                quote:
                  "After trying multiple training plans, YourRunPlan was the first one that actually adapted to my busy schedule. I shaved 12 minutes off my marathon PR!",
              },
              {
                name: "Michael T.",
                role: "Beginner Runner",
                quote:
                  "As someone new to running, I was intimidated by generic plans. YourRunPlan eased me in perfectly and I just completed my first 10K!",
              },
              {
                name: "Aisha K.",
                role: "Trail Runner",
                quote:
                  "The terrain-specific training recommendations have been game-changing for my trail races. My endurance on hills has improved dramatically.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col">
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Running?</h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            We're building YourRunPlan for passionate runners like you. Join our waitlist today and be the first to
            experience the future of personalized training.
          </p>
          <Button
            onClick={handleNotifyClick}
            size="lg"
            variant="outline"
            className="bg-white text-emerald-600 hover:bg-gray-100 border-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Get Early Access
          </Button>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about YourRunPlan</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How does YourRunPlan adapt to my fitness level?",
                answer:
                  "Our AI analyzes your running data, perceived effort, and recovery metrics to continuously adjust your training intensity, volume, and recovery periods for optimal progress.",
              },
              {
                question: "Can I use YourRunPlan with my existing fitness tracker?",
                answer:
                  "Yes! YourRunPlan integrates with popular fitness trackers and running apps to automatically import your running data and provide seamless recommendations.",
              },
              {
                question: "What if I miss a scheduled run?",
                answer:
                  "No problem. YourRunPlan automatically adjusts your future workouts based on missed sessions, ensuring your training plan remains effective without overloading you.",
              },
              {
                question: "Is YourRunPlan suitable for beginners?",
                answer:
                  "Whether you're just starting your running journey or training for an ultramarathon, YourRunPlan creates personalized plans appropriate for your experience level.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-8">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mr-3"></div>
              <h3 className="text-xl font-bold text-white">YourRunPlan</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered running plans that adapt to your unique needs and goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} YourRunPlan. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Made with ❤️ for runners everywhere</p>
        </div>
      </footer>
    </main>
  )
}
