"use client";

import { motion } from "framer-motion";
import { Smile, PenTool, Brain, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Smile className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Mood Tracking",
    desc: "Log your daily emotions and identify patterns over time.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Daily Journal",
    desc: "Write short reflections that sync with your mood data automatically.",
  },
  {
    icon: <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "AI Insights",
    desc: "Get smart feedback and tips on your emotional trends using AI.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Mood Analytics",
    desc: "Visualize your emotional journey with interactive charts.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Powerful Features to Boost Your Wellbeing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Simple, insightful, and designed to help you reflect better every day.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col items-center text-center gap-3">
                {feature.icon}
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
