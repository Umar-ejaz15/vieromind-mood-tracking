"use client"

import React, { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Sidebar from "../components/Sidebar"
import UserMood from "./components/UserMood"

export default function Page() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  // Redirect unauthenticated users
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/") // or "/sign-in" if you prefer
    }
  }, [user, isLoaded, router])

  // Avoid rendering before Clerk finishes loading
  if (!isLoaded) return null

  // Render page for logged-in users
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="w-full md:w-[70%]  bg-gray-50 dark:bg-gray-900 p-5">
        <UserMood/>
      </div>
    </div>
  )
}
