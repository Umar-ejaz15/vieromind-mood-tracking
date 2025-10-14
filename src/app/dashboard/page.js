"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const moodMap = { "AWFUL": 1, "BAD": 2, "OK": 3, "GOOD": 4, "GREAT": 5 };
  const moodLabels = {1:"AWFUL",2:"BAD",3:"OK",4:"GOOD",5:"GREAT"};

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
        const res = await axios.get("/api/moodlogs/all", { params: { userId: user.id }});
        const data = res.data
          .sort((a,b) => new Date(a.date) - new Date(b.date))
          .map(log => ({
            date: new Date(log.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }),
            moodValue: moodMap[log.mood] || 0,
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
            evening: log.eveningJournal || ""
          }));
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch mood logs:", err);
      }
    };
    fetchLogs();
  }, [user]);

  if (!isLoaded) return null;

  // Quick stats
  const avgMood = logs.length ? (logs.reduce((a,b)=>a+b.moodValue,0)/logs.length).toFixed(1) : 0;
  const avgAnxiety = logs.length ? (logs.reduce((a,b)=>a+b.anxiety,0)/logs.length).toFixed(1) : 0;
  const avgEnergy = logs.length ? (logs.reduce((a,b)=>a+b.energy,0)/logs.length).toFixed(1) : 0;
  const totalSleep = logs.length ? logs.reduce((a,b)=>a+b.sleep,0) : 0;

  // Tooltip styles
  const tooltipClass = `p-2 border rounded shadow ${isDark ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 w-full mdw-[70%] p-6 space-y-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mood & Health Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-gray-500 dark:text-gray-400">Average Mood</h3>
            <p className="text-2xl font-bold">{avgMood}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-gray-500 dark:text-gray-400">Total Sleep</h3>
            <p className="text-2xl font-bold">{totalSleep} hrs</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-gray-500 dark:text-gray-400">Average Anxiety</h3>
            <p className="text-2xl font-bold">{avgAnxiety}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-gray-500 dark:text-gray-400">Average Energy</h3>
            <p className="text-2xl font-bold">{avgEnergy}</p>
          </div>
        </div>

        {/* Mood & Energy Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Mood & Energy Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={logs}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#60a5fa" : "#3b82f6"} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={isDark ? "#1e3a8a" : "#3b82f6"} stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="anxietyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#f87171" : "#ef4444"} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={isDark ? "#991b1b" : "#ef4444"} stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#34d399" : "#10b981"} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={isDark ? "#065f46" : "#10b981"} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date"/>
              <YAxis domain={[0,5]} ticks={[1,2,3,4,5]} tickFormatter={val => moodLabels[val]}/>
              <Tooltip content={({active,payload})=>{
                if(active && payload && payload.length){
                  const p = payload[0].payload;
                  return (
                    <div className={tooltipClass}>
                      <p><strong>Date:</strong> {p.date}</p>
                      <p><strong>Mood:</strong> {p.moodLabel}</p>
                      <p><strong>Anxiety:</strong> {p.anxiety}</p>
                      <p><strong>Energy:</strong> {p.energy}</p>
                      <p><strong>Notes:</strong> {p.notes}</p>
                    </div>
                  )
                }
                return null;
              }}/>
              <Legend />
              <Line type="monotone" dataKey="moodValue" stroke="#3b82f6" strokeWidth={3} dot={{r:6}} activeDot={{r:8}} fill="url(#moodGradient)"/>
              <Line type="monotone" dataKey="anxiety" stroke="#ef4444" strokeWidth={3} dot={{r:6}} activeDot={{r:8}} fill="url(#anxietyGradient)"/>
              <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} dot={{r:6}} activeDot={{r:8}} fill="url(#energyGradient)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Trend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sleep Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={logs}>
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#fb923c" : "#f97316"} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={isDark ? "#9a3412" : "#f97316"} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date"/>
              <YAxis/>
              <Tooltip content={({active,payload})=>{
                if(active && payload && payload.length){
                  const p = payload[0].payload;
                  return (
                    <div className={tooltipClass}>
                      <p><strong>Date:</strong> {p.date}</p>
                      <p><strong>Sleep:</strong> {p.sleep} hrs</p>
                    </div>
                  )
                }
                return null;
              }}/>
              <Legend />
              <Line type="monotone" dataKey="sleep" stroke="#f97316" strokeWidth={3} dot={{r:6}} activeDot={{r:8}} fill="url(#sleepGradient)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Advanced Metrics Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Advanced Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={logs}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date"/>
              <YAxis/>
              <Tooltip content={({active,payload})=>{
                if(active && payload && payload.length){
                  const p = payload[0].payload;
                  return (
                    <div className={tooltipClass}>
                      <p><strong>Date:</strong> {p.date}</p>
                      <p><strong>Focus:</strong> {p.focus}</p>
                      <p><strong>Motivation:</strong> {p.motivation}</p>
                      <p><strong>Productivity:</strong> {p.productivity}</p>
                      <p><strong>Social:</strong> {p.social}</p>
                    </div>
                  )
                }
                return null;
              }}/>
              <Legend />
              <Bar dataKey="focus" fill="#8b5cf6" radius={[6,6,0,0]}/>
              <Bar dataKey="motivation" fill="#14b8a6" radius={[6,6,0,0]}/>
              <Bar dataKey="productivity" fill="#facc15" radius={[6,6,0,0]}/>
              <Bar dataKey="social" fill="#f43f5e" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
