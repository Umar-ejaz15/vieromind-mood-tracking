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
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Track Your Moods Effortlessly
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Record how you feel, see your mood trends, and let AI help you
            identify emotional patterns for better mental wellbeing.
          </p>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 rounded-xl">
              <Calendar className="text-indigo-600 dark:text-indigo-400" size={20} />
              <span className="text-sm font-medium">Daily Entries</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm px-4 py-2 rounded-xl">
              <BarChart2 className="text-indigo-600 dark:text-indigo-400" size={20} />
              <span className="text-sm font-medium">Mood Graph</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Weekly Mood Trend
          </h3>
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
