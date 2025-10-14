"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const moodMap = {
  Happy: 5,
  Good: 4,
  Neutral: 3,
  Sad: 2,
  Angry: 1,
};

export default function SummaryPage() {
  const { user, isLoaded } = useUser();
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch mood logs on mount
  useEffect(() => {
    if (!user) return;
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/moodlogs/all", {
          params: { userId: user.id },
        });
        console.log(res);

        const data = res.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((log) => ({
            date: new Date(log.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
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
            evening: log.eveningJournal || "",
          }));

        console.log(data);
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch mood logs:", err);
      }
    };
    fetchLogs();
  }, [user]);

  // ✅ Generate AI Summary from existing logs
  const handleGenerateSummary = async () => {
    if (!isLoaded) return;
    if (!user) {
      alert("Please log in first 😢");
      return;
    }

    if (!logs.length) {
      alert("No mood logs found 😔");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const res = await axios.post("/api/moodlogs/generate-summary", {
        moodData: logs,
        userEmail: user.emailAddresses[0]?.emailAddress,
      });

      setSummary(res.data.summary || "No summary generated 😢");
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Failed to generate summary 😞");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MoodSummary.txt";
    link.click();
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          🌤️ Mood Summary Report
        </h1>

        <button
          onClick={handleGenerateSummary}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate AI Summary"}
        </button>

{summary && (
  <div className="mt-6 bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
      ✨ Your Emotional Insight
    </h2>

    {/* Wrap ReactMarkdown in a div for styling */}
    <div className="prose dark:prose-invert text-gray-700 dark:text-gray-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {summary}
      </ReactMarkdown>
    </div>

    <button
      onClick={handleDownload}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
    >
      ⬇️ Download Summary
    </button>
  </div>
)}
      </div>
    </div>
  );
}
