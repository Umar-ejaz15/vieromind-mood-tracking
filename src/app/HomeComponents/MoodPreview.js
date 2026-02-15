"use client";

import { motion } from "motion/react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Calendar, TrendingUp, Zap } from "lucide-react";

const data = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 8 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 7 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 6 },
  { day: "Sun", mood: 8 },
];

export default function MoodPreview() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-violet-50/50 to-background dark:via-violet-950/10" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-4 block">Mood Analytics</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Track Your Moods
            <br />
            <span className="gradient-text">Effortlessly</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Record how you feel, see your mood trends, and let AI help you
            identify emotional patterns for better mental wellbeing.
          </p>

          <div className="flex gap-3 flex-wrap">
            {[
              { icon: Calendar, label: "Daily Entries" },
              { icon: TrendingUp, label: "Trend Analysis" },
              { icon: Zap, label: "Quick Logging" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-card border border-border/50 px-4 py-2.5 rounded-xl">
                <item.icon className="text-violet-600 dark:text-violet-400" size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-card p-8 rounded-2xl border border-border/50 shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Weekly Mood Trend</h3>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">+12% this week</span>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="moodPreviewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} stroke="#94a3b8" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#moodPreviewGrad)"
                dot={{ fill: "#8b5cf6", r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
