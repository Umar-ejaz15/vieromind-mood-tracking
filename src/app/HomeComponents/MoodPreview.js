"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, BarChart2 } from "lucide-react";

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
    <section className="relative py-24 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Background floating circles */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-64 h-64 bg-indigo-300 rounded-full opacity-20 blur-3xl top-10 left-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-pink-300 rounded-full opacity-15 blur-2xl bottom-10 right-20"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            Track Your Moods Effortlessly
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Record how you feel, see your mood trends, and let AI help you
            identify emotional patterns for better mental wellbeing.
          </p>

          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 rounded-2xl">
              <Calendar className="text-indigo-600 dark:text-indigo-400" size={20} />
              <span className="text-sm font-medium">Daily Entries</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 rounded-2xl">
              <BarChart2 className="text-indigo-600 dark:text-indigo-400" size={20} />
              <span className="text-sm font-medium">Mood Graph</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl overflow-hidden"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Weekly Mood Trend
          </h3>

          {/* Inner gradient overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-indigo-100/30 via-pink-100/20 to-indigo-50/0 rounded-3xl" />

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis domain={[0, 10]} stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  color: "#fff",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
