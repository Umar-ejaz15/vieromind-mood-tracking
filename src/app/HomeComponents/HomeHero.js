"use client";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      
      {/* Subtle floating circles */}
      <motion.div
        className="absolute w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-2xl top-20 left-20"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-pink-200 rounded-full opacity-15 blur-2xl bottom-20 right-20"
        animate={{ scale: [1, 1.05, 1], rotate: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4"
      >
        Track Your <span className="text-indigo-600 dark:text-indigo-400">Moods</span> Effortlessly
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-gray-600 dark:text-gray-300 max-w-xl md:max-w-2xl mb-8 text-lg md:text-xl"
      >
        eMoods helps you monitor your emotional patterns and wellbeing.
        Identify triggers, track trends, and share reports with your therapist — simple, clear, and effective.
      </motion.p>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg shadow transition-all duration-300">
              Get Started
            </Button>
          </SignInButton>
        </SignedOut>
      </motion.div>
    </section>
  );
}
