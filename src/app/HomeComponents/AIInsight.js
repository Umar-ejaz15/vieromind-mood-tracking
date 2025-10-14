"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

export default function AIInsight() {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: AI Illustration / Mock UI */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-indigo-600 dark:text-indigo-400" size={22} />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Your Weekly Mood Reflection
            </h3>
          </div>

          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p> You felt calmer this week compared to last week.</p>
            <p> Your top emotion was <span className="font-semibold text-indigo-500">Peaceful</span>.</p>
            <p> AI Suggestion: “Try journaling before bed to maintain this mood stability.”</p>
          </div>

          <div className="absolute -bottom-3 -right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-md">
            <Sparkles size={14} /> AI Powered
          </div>
        </motion.div>

        {/* Right: Text Explanation */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Gain Clarity with AI-Powered Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our smart mood assistant reads your journal entries, detects emotional trends, and offers reflective feedback
            to help you understand yourself better.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li> Emotion trend detection</li>
            <li>Personalized AI reflections</li>
            <li>Weekly mood summary</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
