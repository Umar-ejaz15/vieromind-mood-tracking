"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Coffee, Sun, Moon, Book } from "lucide-react";

export default function AIInsight() {
  const featureList = [
    { icon: <TrendingUp size={20} className="text-indigo-500" />, text: "Emotion trend detection" },
    { icon: <Book size={20} className="text-indigo-500" />, text: "Personalized AI reflections" },
    { icon: <Coffee size={20} className="text-indigo-500" />, text: "Weekly mood summary" },
    { icon: <Sun size={20} className="text-indigo-500" />, text: "Morning & evening insights" },
    { icon: <Moon size={20} className="text-indigo-500" />, text: "Sleep quality suggestions" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Card: AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-indigo-600 dark:text-indigo-400" size={26} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Weekly Mood Reflection
            </h3>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              You felt calmer this week compared to last week.
            </motion.p>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Your top emotion was <span className="font-semibold text-indigo-500">Peaceful</span>.
            </motion.p>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              AI Suggestion: “Try journaling before bed to maintain this mood stability.”
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute -bottom-3 -right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-md"
          >
            <Sparkles size={14} /> AI Powered
          </motion.div>
        </motion.div>

        {/* Right: Features / Explanations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Gain Clarity with AI-Powered Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Our intelligent mood assistant reads your journal entries, detects emotional trends, and offers reflective feedback
            to help you understand yourself better.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureList.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.5 }}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {feature.icon}
                <span className="text-gray-700 dark:text-gray-200 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
