"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SleepAnalysisChart({ data, tooltipClass }) {
  return (
    <div className="bg-card border border-border/50 p-6 rounded-2xl">
      <h2 className="text-lg font-semibold mb-1">Sleep Analysis</h2>
      <p className="text-sm text-muted-foreground mb-5">Track your sleep patterns and quality</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, "dataMax + 2"]}
            label={{
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              fill: "#94a3b8",
              fontSize: 12,
            }}
            stroke="#94a3b8"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              fontSize: "13px",
            }}
          />

          <Area
            type="monotone"
            dataKey="sleep"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#sleepGradient)"
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "var(--card)" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
