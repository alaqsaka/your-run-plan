import { getPlanDetail } from "@/app/submit-form/actions/submitForm"
import { Calendar, Clock, Dumbbell, Footprints, Heart, Home, Info, Leaf, Moon } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Params = Promise<{ docId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { docId } = await params;

  const planDetail = await getPlanDetail(docId)

  // Function to get icon based on activity type
  const getActivityIcon = (activity: string) => {
    switch (activity.toLowerCase()) {
      case "rest":
        return <Moon className="h-5 w-5 mr-2" />
      case "easy run":
        return <Footprints className="h-5 w-5 mr-2" />
      case "long run":
        return <Footprints className="h-5 w-5 mr-2" />
      case "tempo run":
        return <Footprints className="h-5 w-5 mr-2" />
      case "interval":
        return <Footprints className="h-5 w-5 mr-2" />
      case "strength training":
        return <Dumbbell className="h-5 w-5 mr-2" />
      case "cross training":
        return <Heart className="h-5 w-5 mr-2" />
      case "recovery":
        return <Leaf className="h-5 w-5 mr-2" />
      default:
        return <Info className="h-5 w-5 mr-2" />
    }
  }

  // Function to get color based on activity type
  const getActivityColor = (activity: string) => {
    switch (activity.toLowerCase()) {
      case "rest":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "easy run":
        return "bg-green-100 text-green-700 border-green-200"
      case "long run":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "tempo run":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "interval":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "strength training":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "cross training":
        return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "recovery":
        return "bg-teal-100 text-teal-700 border-teal-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
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
            <Home className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Plan Header */}
        <div className="mb-10">
          {/* <div className="flex items-center mb-2">
            <Link href="/" className="text-emerald-600 hover:text-emerald-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 mr-3">
              10K Training
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              8 Weeks
            </Badge>
          </div> */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{planDetail.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Your personalized training plan designed to prepare you for your next race. Follow this schedule to
            build endurance, improve speed, and reach the finish line strong.
          </p>
        </div>

        {/* Week Selector */}
        <Tabs defaultValue={`week-1`} className="mb-10">
          <div className="border-b border-gray-200 mb-6">
            <TabsList className="bg-transparent h-auto p-0 mb-[-1px]">
              {planDetail.weeks.map((week) => (
                <TabsTrigger
                  key={week.week}
                  value={`week-${week.week}`}
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:shadow-none rounded-none px-6 py-3 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Week {week.week}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Week Content */}
          {planDetail.weeks.map((week) => (
            <TabsContent key={week.week} value={`week-${week.week}`} className="mt-0">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Week {week.week} Overview</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  {week.week <= 2
                    ? "Focus on building a base and getting comfortable with consistent running."
                    : week.week <= 4
                    ? "Begin to increase distance and introduce some light speed work."
                    : week.week <= 6
                    ? "Peak training phase with longer runs and more intense workouts."
                    : "Tapering phase to prepare your body for race day."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <Footprints className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Distance</p>
                      <p className="text-lg font-semibold text-emerald-700">
                        {week.week * 3 + 10}km
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Training Hours</p>
                      <p className="text-lg font-semibold text-blue-700">{week.week + 3} hours</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Dumbbell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Strength Sessions</p>
                      <p className="text-lg font-semibold text-purple-700">
                        {week.days.filter((day) => day.activity.toLowerCase().includes("strength")).length}
                      </p>
                    </div>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <Moon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rest Days</p>
                      <p className="text-lg font-semibold text-teal-700">
                        {week.days.filter((day) => day.activity.toLowerCase().includes("rest")).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {week.days.map((day, index) => (
                  <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{day.day}</span>
                        <Badge
                          variant="outline"
                          className={cn("font-normal text-xs", getActivityColor(day.activity))}
                        >
                          {day.activity}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center text-gray-500">
                        {getActivityIcon(day.activity)}
                        <span className="ml-1">
                          {day.activity.toLowerCase().includes("run")
                            ? "Running Workout"
                            : day.activity.toLowerCase().includes("strength")
                            ? "Strength Training"
                            : day.activity.toLowerCase().includes("rest")
                            ? "Recovery Day"
                            : "Training Activity"}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{day.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Weekly Tips */}
              <div className="mt-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-3">Week {week.week} Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">1</span>
                    </div>
                    <p>
                      {week.week <= 2
                        ? "Focus on consistency rather than speed in these early weeks."
                        : week.week <= 4
                        ? "Start paying attention to your running form to prevent injuries as mileage increases."
                        : week.week <= 6
                        ? "Nutrition becomes increasingly important as training intensity increases."
                        : "Less is more during tapering - trust your training and focus on rest."}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">2</span>
                    </div>
                    <p>
                      {week.week <= 2
                        ? "Don't worry about pace yet - just get comfortable with the time on your feet."
                        : week.week <= 4
                        ? "Start incorporating dynamic warm-ups before each run."
                        : week.week <= 6
                        ? "Recovery is just as important as training - don't skip rest days."
                        : "Visualize your race day success during your final training runs."}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">3</span>
                    </div>
                    <p>
                      {week.week <= 2
                        ? "Stay hydrated throughout the day, not just during runs."
                        : week.week <= 4
                        ? "Consider tracking your runs to monitor your progress."
                        : week.week <= 6
                        ? "Practice your race day nutrition strategy during longer runs."
                        : "Plan your race day logistics now - transportation, gear, and nutrition."}
                    </p>
                  </li>
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Download and Share */}
        {/* <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all">
            Download Plan
          </Button>
          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            Share Plan
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Print Schedule
          </Button>
        </div> */}
      </div>
    </div>
  )
}
