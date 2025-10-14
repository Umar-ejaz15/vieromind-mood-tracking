"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import axios from "axios";

import TherapySuggestion from "./components/TherapySuggestion";
import BarChartCard from "./components/BarChartCard";
import LineChartCard from "./components/LineChartCard";
import StatCard from "./components/StatCard";
import SleepAnalysisChart from "./components/SleepAnalysisChart";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const moodMap = { AWFUL: 1, BAD: 2, OK: 3, GOOD: 4, GREAT: 5 };
  const moodLabels = { 1: "AWFUL", 2: "BAD", 3: "OK", 4: "GOOD", 5: "GREAT" };

  // Detect dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Redirect unauthenticated users
  useEffect(() => {
    if (isLoaded && !user) router.push("/");
  }, [isLoaded, user, router]);

  // Fetch mood logs
  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/moodlogs/all", {
          params: { userId: user.id },
        });
        const data = res.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((log) => {
            const moodKey = (log.mood || "N/A").toUpperCase(); // Normalize string
            return {
              date: new Date(log.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              moodValue: moodMap[moodKey] || 0,
              moodLabel: log.mood || "N/A",
              sleep: log.sleepHours || 0,
              anxiety: log.anxietyLevel || 0,
              energy: log.energyLevel || 0,
              focus: log.focusLevel || 0,
              motivation: log.motivationLevel || 0,
              productivity: log.productivity || 0,
              social: log.socialInteraction || 0,
              notes: log.notes || "",
              morning: log.morningJournal || "",
              evening: log.eveningJournal || "",
            };
          });
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch mood logs:", err);
      }
    };

    fetchLogs();
  }, [user]);

  if (!isLoaded) return null;

  // Quick stats
  const avgMood = logs.length
    ? (logs.reduce((a, b) => a + b.moodValue, 0) / logs.length).toFixed(1)
    : 0;
  const avgAnxiety = logs.length
    ? (logs.reduce((a, b) => a + b.anxiety, 0) / logs.length).toFixed(1)
    : 0;
  const avgEnergy = logs.length
    ? (logs.reduce((a, b) => a + b.energy, 0) / logs.length).toFixed(1)
    : 0;
  const totalSleep = logs.length ? logs.reduce((a, b) => a + b.sleep, 0) : 0;

  // Therapy suggestion (last 7 days)
  const recentLogs = logs.slice(-7);
  const lowMoodDays = recentLogs.filter((log) => log.moodValue <= 2).length;
  const highAnxietyDays = recentLogs.filter((log) => log.anxiety >= 4).length;
  const suggestTherapy = lowMoodDays >= 3 || highAnxietyDays >= 3;

  const tooltipClass = `p-2 border rounded shadow ${
    isDark
      ? "bg-gray-800 text-gray-100 border-gray-700"
      : "bg-white text-gray-900 border-gray-200"
  }`;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 w-full md:w-[70%] p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Mood & Health Dashboard
        </h1>

        {/* Therapy Suggestion */}
        <TherapySuggestion
          show={suggestTherapy}
          link="https://www.psychologytoday.com/us/therapists"
          text="Based on your recent mood and anxiety patterns, it might help to reach out to a therapist."
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Average Mood" value={avgMood} />
          <StatCard title="Total Sleep" value={`${totalSleep} hrs`} />
          <StatCard title="Average Anxiety" value={avgAnxiety} />
          <StatCard title="Average Energy" value={avgEnergy} />
        </div>

        {/* Mood & Energy Trends */}
        <LineChartCard
          title="Mood & Energy Trends"
          data={logs}
          lines={[
            {
              dataKey: "moodValue",
              stroke: "#3b82f6",
              gradientId: "moodGradient",
            },
            {
              dataKey: "anxiety",
              stroke: "#ef4444",
              gradientId: "anxietyGradient",
            },
            {
              dataKey: "energy",
              stroke: "#10b981",
              gradientId: "energyGradient",
            },
          ]}
          yAxisConfig={{
            domain: [0, 5],
            ticks: [1, 2, 3, 4, 5],
            tickFormatter: (val) => moodLabels[val],
          }}
          tooltipClass={tooltipClass}
        />
        <SleepAnalysisChart data={logs} tooltipClass={tooltipClass} />

        {/* Sleep Trend */}
        <BarChartCard
          title="Advanced Metrics"
          data={logs}
          bars={[
            { dataKey: "focus", fill: "#8b5cf6", radius: [6, 6, 0, 0] },
            { dataKey: "motivation", fill: "#14b8a6", radius: [6, 6, 0, 0] },
            { dataKey: "productivity", fill: "#facc15", radius: [6, 6, 0, 0] },
            { dataKey: "social", fill: "#f43f5e", radius: [6, 6, 0, 0] },
          ]}
          tooltipClass={tooltipClass}
        />

        {/* Advanced Metrics */}
      </div>
    </div>
  );
}
