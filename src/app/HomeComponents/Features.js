"use client";

import { motion } from "framer-motion";
import { Smile, PenTool, Brain, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Smile,
    title: "Mood Tracking",
    desc: "Log your daily emotions and identify patterns over time.",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: PenTool,
    title: "Daily Journal",
    desc: "Write short reflections that sync with your mood data automatically.",
    color: "text-pink-500 dark:text-pink-400",
  },
  {
    icon: Brain,
    title: "AI Insights",
    desc: "Get smart feedback and tips on your emotional trends using AI.",
    color: "text-green-500 dark:text-green-400",
  },
  {
    icon: BarChart3,
    title: "Mood Analytics",
    desc: "Visualize your emotional journey with interactive charts.",
    color: "text-yellow-500 dark:text-yellow-400",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 overflow-hidden"
    >
      {/* Background floating circles */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl top-10 left-10"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 h-56 bg-pink-300 rounded-full opacity-15 blur-2xl bottom-20 right-16"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-serif"
        >
          Powerful Features to Boost Your Wellbeing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto text-lg"
        >
          Simple, insightful, and designed to help you reflect better every day.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 120,
                }}
                className="relative p-6 bg-gradient-to-tr from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                {/* Subtle glow behind icon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-300 via-pink-300 to-green-300 opacity-20 blur-2xl" />

                <div className="flex flex-col items-center text-center gap-3 relative z-10">
                  <Icon className={`w-10 h-10 ${feature.color} mb-2`} />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
