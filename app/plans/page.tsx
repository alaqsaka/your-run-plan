// PlansPageWrapper.tsx
"use client"

import { Suspense } from "react"
import PlansPage from "./PlansPageInner"

export default function PlansPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlansPage />
    </Suspense>
  )
}
