"use client";

import { motion } from "motion/react";
import { Smile, PenTool, Brain, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Smile,
    title: "Mood Tracking",
    desc: "Log your daily emotions with a single tap and identify patterns over time.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: PenTool,
    title: "Daily Journal",
    desc: "Write morning and evening reflections that sync with your mood data.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Brain,
    title: "AI Insights",
    desc: "Get smart feedback and personalized tips on your emotional trends.",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Mood Analytics",
    desc: "Visualize your emotional journey with beautiful interactive charts.",
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-accent/30 to-background" />

      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">Features</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Everything You Need to
          <br />
          <span className="gradient-text">Understand Yourself</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-muted-foreground mb-16 max-w-2xl mx-auto text-lg"
        >
          Simple, insightful, and designed to help you reflect better every day.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group relative p-8 bg-card rounded-2xl border border-border/50 hover:border-border hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
