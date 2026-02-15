"use client";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-teal-50 dark:from-violet-950/30 dark:via-background dark:to-teal-950/20" />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-violet-300/30 dark:bg-violet-600/10 rounded-full blur-3xl top-1/4 -left-20"
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-teal-300/25 dark:bg-teal-600/10 rounded-full blur-3xl bottom-1/4 -right-20"
          animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-pink-200/20 dark:bg-pink-600/5 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/50 mb-8"
      >
        <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
        <span className="text-sm font-medium text-violet-700 dark:text-violet-300">AI-Powered Mood Intelligence</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
      >
        Understand Your{" "}
        <span className="gradient-text">Emotions</span>
        <br />
        Like Never Before
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative text-muted-foreground max-w-xl md:max-w-2xl mb-10 text-lg md:text-xl leading-relaxed"
      >
        Track your emotional patterns, uncover hidden triggers, and get personalized AI insights to improve your mental wellbeing every day.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-gradient-to-r from-violet-600 to-teal-500 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all group">
              Get Started Free
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </SignInButton>
        </SignedOut>
      </motion.div>

      {/* Floating mood emojis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-6"
      >
        {["\u{1F60A}", "\u{1F60C}", "\u{1F3AF}", "\u{1F4AA}", "\u{1F9E0}"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-3xl md:text-4xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
