"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SleepAnalysisChart({ data, tooltipClass }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Sleep Analysis 
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "currentColor" }}
            stroke="currentColor"
          />
          <YAxis
            domain={[0, "dataMax + 2"]}
            label={{
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              fill: "currentColor",
            }}
            tick={{ fill: "currentColor" }}
            stroke="currentColor"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipClass.includes("dark")
                ? "#1f2937"
                : "#fff",
              borderRadius: "8px",
              border: "none",
              color: tooltipClass.includes("dark") ? "#f9fafb" : "#111827",
            }}
          />

          <Line
            type="monotone"
            dataKey="sleep"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#sleepGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
