"use client";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      
      {/* Fading gradient circles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-indigo-300 rounded-full opacity-30 blur-3xl top-1/4 left-1/4 animate-float-slow"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-pink-300 rounded-full opacity-20 blur-2xl bottom-1/4 right-1/3 animate-float-slow"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4"
      >
        Track Your{" "}
        <span className="text-indigo-600 dark:text-indigo-400">Moods Effortlessly</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10"
      >
        Trusted by Psychologists, Therapists, and Social Workers, eMoods helps you monitor symptoms for Bipolar I & II, Depression, PTSD, and Anxiety Disorders.
        Identify triggers, spot patterns, and prevent relapses. Enhance your doctor visits with detailed, shareable reports.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10"
      >
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300">
              Start Tracking
            </Button>
          </SignInButton>
        </SignedOut>
      </motion.div>
    </section>
  );
}
