"use client"

import React, { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Sidebar from "../components/Sidebar"
import UserMood from "./components/UserMood"

export default function Page() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/")
    }
  }, [user, isLoaded, router])

  if (!isLoaded) return null

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <UserMood />
      </div>
    </div>
  )
}
