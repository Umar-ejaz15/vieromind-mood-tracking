"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Loader2, AlertCircle } from "lucide-react";

import TherapySuggestion from "./components/TherapySuggestion";
import BarChartCard from "./components/BarChartCard";
import LineChartCard from "./components/LineChartCard";
import StatCard from "./components/StatCard";
import SleepAnalysisChart from "./components/SleepAnalysisChart";

const MOOD_MAP = { AWFUL: 1, BAD: 2, OK: 3, GOOD: 4, GREAT: 5 };
const MOOD_LABELS = { 1: "AWFUL", 2: "BAD", 3: "OK", 4: "GOOD", 5: "GREAT" };

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (isLoaded && !user) router.push("/");
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      setLoadingLogs(true);
      setFetchError(null);
      try {
        const res = await axios.get("/api/moodlogs/all", {
          params: { userId: user.id },
        });
        const data = (Array.isArray(res.data) ? res.data : [])
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((log) => {
            const moodKey = (log.mood || "").toUpperCase();
            return {
              date: new Date(log.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              moodValue: MOOD_MAP[moodKey] || log.moodValue || 0,
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
        setFetchError("Failed to load your mood data. Please try refreshing.");
      } finally {
        setLoadingLogs(false);
      }
    };

    fetchLogs();
  }, [user]);

  if (!isLoaded) return null;

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

  const recentLogs = logs.slice(-7);
  const lowMoodDays = recentLogs.filter((log) => log.moodValue <= 2).length;
  const highAnxietyDays = recentLogs.filter((log) => log.anxiety >= 4).length;
  const suggestTherapy = lowMoodDays >= 3 || highAnxietyDays >= 3;

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 w-full p-6 md:p-8 space-y-6 overflow-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Your mood & health overview at a glance</p>
        </div>

        {/* Loading State */}
        {loadingLogs && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-violet-600 mr-3" />
            <span className="text-muted-foreground">Loading your mood data...</span>
          </div>
        )}

        {/* Error State */}
        {fetchError && (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
            <AlertCircle size={20} className="text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{fetchError}</p>
          </div>
        )}

        {/* Data Content - only show when not loading */}
        {!loadingLogs && !fetchError && (
          <>
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

            {/* Charts */}
            <LineChartCard
              title="Mood & Energy Trends"
              data={logs}
              lines={[
                { dataKey: "moodValue", stroke: "#8b5cf6", gradientId: "moodGradient" },
                { dataKey: "anxiety", stroke: "#f43f5e", gradientId: "anxietyGradient" },
                { dataKey: "energy", stroke: "#14b8a6", gradientId: "energyGradient" },
              ]}
              yAxisConfig={{
                domain: [0, 5],
                ticks: [1, 2, 3, 4, 5],
                tickFormatter: (val) => MOOD_LABELS[val],
              }}
            />

            <SleepAnalysisChart data={logs} />

            <BarChartCard
              title="Advanced Metrics"
              data={logs}
              bars={[
                { dataKey: "focus", fill: "#8b5cf6", radius: [6, 6, 0, 0] },
                { dataKey: "motivation", fill: "#14b8a6", radius: [6, 6, 0, 0] },
                { dataKey: "productivity", fill: "#f59e0b", radius: [6, 6, 0, 0] },
                { dataKey: "social", fill: "#f43f5e", radius: [6, 6, 0, 0] },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
