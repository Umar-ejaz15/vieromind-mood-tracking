"use client";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
      >
        Track Your <span className="text-indigo-600 dark:text-indigo-400">Moods Effortlessly</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
      >
        Trusted by Psychologists, Therapists, and Social Workers, eMoods helps you monitor symptoms for Bipolar I & II, Depression, PTSD, and Anxiety Disorders.
        Identify triggers, spot patterns, and prevent relapses. Enhance your doctor visits with detailed, shareable reports.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Start Tracking
            </Button>
          </SignInButton>
        </SignedOut>
      </motion.div>
    </section>
  );
}
