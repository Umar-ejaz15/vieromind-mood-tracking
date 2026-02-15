"use client";

import { motion } from "motion/react";
import { Brain, Sparkles, TrendingUp, Coffee, Sun, Moon, Book } from "lucide-react";

export default function AIInsight() {
  const featureList = [
    { icon: <TrendingUp size={18} className="text-violet-500" />, text: "Emotion trend detection" },
    { icon: <Book size={18} className="text-violet-500" />, text: "Personalized AI reflections" },
    { icon: <Coffee size={18} className="text-violet-500" />, text: "Weekly mood summary" },
    { icon: <Sun size={18} className="text-violet-500" />, text: "Morning & evening insights" },
    { icon: <Moon size={18} className="text-violet-500" />, text: "Sleep quality suggestions" },
  ];

  return (
    <section className="py-28 overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-teal-50/30 to-background dark:via-teal-950/10" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Card: AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-card p-8 rounded-2xl border border-border/50 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-teal-500 flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold">Weekly Mood Reflection</h3>
          </div>

          <div className="space-y-3 text-muted-foreground">
            {[
              { emoji: "\u{1F331}", text: "You felt calmer this week compared to last week." },
              { emoji: "\u{2728}", text: <>Your top emotion was <span className="font-semibold text-violet-600 dark:text-violet-400">Peaceful</span>.</> },
              { emoji: "\u{1F4A1}", text: "Try journaling before bed to maintain this mood stability." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-accent/50"
              >
                <span className="text-lg mt-0.5">{item.emoji}</span>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute -bottom-3 -right-3 bg-gradient-to-r from-violet-600 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-lg"
          >
            <Sparkles size={14} /> AI Powered
          </motion.div>
        </motion.div>

        {/* Right: Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-4 block">AI Intelligence</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Gain Clarity with
            <br />
            <span className="gradient-text">AI-Powered Insights</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Our intelligent mood assistant reads your journal entries, detects emotional trends, and offers reflective feedback
            to help you understand yourself better.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featureList.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-card border border-border/50 p-3.5 rounded-xl hover:border-border hover:shadow-md transition-all duration-300"
              >
                {feature.icon}
                <span className="font-medium text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
