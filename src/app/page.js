"use client"

import React, { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import HomeHero from "./HomeComponents/HomeHero"
import Features from "./HomeComponents/Features"
import MoodPreview from "./HomeComponents/MoodPreview"
import AIInsight from "./HomeComponents/AIInsight"
import Footer from "./HomeComponents/Footer"

export default function Page() {
  const { user, isLoaded } = useUser()
  
  const router = useRouter()

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard")
    }
  }, [user, isLoaded, router])

  // Prevent flicker during user check
  if (!isLoaded) return null

  // If not logged in, show landing page
  return (
    <div className="overflow-hidden">
      <HomeHero />
      <Features />
      <MoodPreview />
      <AIInsight />
      <Footer />
    </div>
  )
}
