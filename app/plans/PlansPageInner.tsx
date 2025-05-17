/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Medal, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getGeneratedPlansList } from "../submit-form/actions/submitForm"

const PLANS_PER_PAGE = 8

export default function PlansPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page") || "1")
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]) // Holds startAfter IDs
  const [lastVisibleId, setLastVisibleId] = useState<string | null>(null)
  

  const fetchPlans = async () => {
    setLoading(true)
    try {
      const cursor = pageCursors[currentPage - 1] ?? null
      const result = await getGeneratedPlansList(PLANS_PER_PAGE, cursor)
      if (result.success) {
        setPlans(result.plans as any)
        setLastVisibleId(result.lastVisible as any)

        setHasNextPage((result.plans ?? []).length === PLANS_PER_PAGE)
  
        // If navigating forward, store next cursor
        if (currentPage === pageCursors.length && result.lastVisible) {
          setPageCursors((prev) => [...prev, result.lastVisible])
        }
      }
    } catch (err) {
      console.error("Failed to load plans:", err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchPlans()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    router.push(`/plans?page=${page}`)
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const handleNotifyClick = () => {
    router.push("/form")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
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
              href="/"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Plans
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              href="/"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
            Browse Running Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of AI-generated running plans created by our community. Find the perfect training
            program for your goals.
          </p>
        </motion.div>

        {/* Filter options - could be expanded in a real implementation */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8 justify-center"
        >
          <Button variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
            All Plans
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            5K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            10K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Half Marathon
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Marathon
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Beginner
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Advanced
          </Button>
        </motion.div> */}

        {/* Plans Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 mt-2">
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence>
              {plans.map((plan, index) => (
                <motion.div key={plan.id} variants={fadeIn} transition={{ delay: index * 0.05 }} className="h-full">
                  <Link href={`/plan/${plan.id}`} className="block group h-full">
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
                        {plan.createdAt && (
                          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                            Created {new Date(plan.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-4">
        <Button
  variant="outline"
  className="flex items-center gap-2"
  onClick={() => handlePageChange(currentPage - 1)}
  disabled={currentPage === 1}
>
  <ChevronLeft className="w-4 h-4" />
  Previous
</Button>

  <span className="text-gray-700 font-semibold self-center">Page {currentPage}</span>

  <Button
  variant="outline"
  className="flex items-center gap-2"
  onClick={() => handlePageChange(currentPage + 1)}
  disabled={!hasNextPage}
>
  Next
  <ChevronRight className="w-4 h-4" />
</Button>
</div>
      </div>
    </div>
  )
}
