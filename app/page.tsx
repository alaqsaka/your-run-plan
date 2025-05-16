'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleNotifyClick = () => {
    router.push('/form');
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">YourRunPlan</h1>
        <button
          onClick={handleNotifyClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Get Early Access
        </button>
      </header>

      <section className="flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold mb-4 text-gray-900">
          Personalized AI Running Plans
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          YourRunPlan is your smart running companion — adapting to your pace, goals, and life.
          No more one-size-fits-all training. We build a plan that fits you.
        </p>
        <button
          onClick={handleNotifyClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Join the Waitlist
        </button>
      </section>

      <section className="px-6 py-16 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold mb-2">Smarter Planning</h3>
            <p className="text-gray-600">
              AI adjusts your weekly mileage, rest days, and pacing based on your performance and feedback.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Injury Prevention</h3>
            <p className="text-gray-600">
              We prioritize sustainable progress — no overtraining or burnout.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Goal-Oriented</h3>
            <p className="text-gray-600">
              Whether it's your first 5K or a full marathon, your plan evolves with your target.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Holistic Support</h3>
            <p className="text-gray-600">
              Includes guidance on nutrition, mental focus, and recovery — not just miles.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Be the First to Try It</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          We're building YourRunPlan for runners like you. Join now and get early access as soon as we launch.
        </p>
        <button
          onClick={handleNotifyClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Notify Me
        </button>
      </section>

      <footer className="w-full border-t border-gray-200 py-6 px-8 text-sm text-gray-500 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} YourRunPlan</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </footer>
    </main>
  );
}
