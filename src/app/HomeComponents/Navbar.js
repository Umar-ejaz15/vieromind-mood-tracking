"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for hydration to avoid flicker
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-primary">
          vieromind
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Auth Logic */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Start Tracking
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </motion.nav>
  )
}
