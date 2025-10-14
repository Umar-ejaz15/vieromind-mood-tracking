"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useMoodStore } from "@/store/useMoodStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserMood() {
  const { user, isSignedIn } = useUser();
  const {
    mood,
    moodValue,
    anxietyLevel,
    energyLevel,
    sleepHours,
    focusLevel,
    motivationLevel,
    productivity,
    socialInteraction,
    notes,
    morningJournal,
    eveningJournal,
    triggers,
    date,
    loadMoodLog,
    setField,
  } = useMoodStore();

  useEffect(() => {
    if (!isSignedIn || !user || !date) return;

    const fetchMoodLog = async () => {
      try {
        const res = await axios.get("/api/moodlogs", {
          params: { date, userId: user.id },
        });

        if (res.data) {
          loadMoodLog({
            ...res.data,
            date: res.data.date ? new Date(res.data.date).toISOString().slice(0, 10) : date,
          });
        }
      } catch (err) {
        console.error("Failed to fetch mood log:", err.response?.data || err.message);
        setField("date", date);
      }
    };

    fetchMoodLog();
  }, [date, user, isSignedIn, loadMoodLog, setField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn || !user) return alert("You must be logged in to submit a mood log");

    try {
      const body = {
        mood,
        moodValue,
        anxietyLevel,
        energyLevel,
        sleepHours,
        focusLevel,
        motivationLevel,
        productivity,
        socialInteraction,
        notes,
        morningJournal,
        eveningJournal,
        triggers,
        date,
        userId: user.id,
        userEmail: user.emailAddresses[0]?.emailAddress || "",
      };

      const { data } = await axios.post("/api/moodlogs", body);
      loadMoodLog({
        ...data,
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : date,
      });
      alert("Mood log saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving mood log.");
    }
  };

  // Helper to show descriptive tags for each metric
  const getLevelLabel = (field, value) => {
    if (value == null) return "-";
    switch (field) {
      case "moodValue":
        return ["Awful", "Bad", "Ok", "Good", "Great"][value - 1];
      case "anxietyLevel":
        return ["Low", "Low-Med", "Medium", "Med-High", "High"][value - 1];
      case "energyLevel":
      case "focusLevel":
      case "motivationLevel":
      case "productivity":
      case "socialInteraction":
        if (value <= 2) return "Low";
        if (value <= 4) return "Medium";
        if (value <= 7) return "High";
        return "Very High";
      case "sleepHours":
        if (value < 4) return "Very Low";
        if (value < 6) return "Low";
        if (value < 8) return "Normal";
        if (value < 10) return "Good";
        return "Excellent";
      default:
        return value;
    }
  };

  const renderSliderField = (label, value, min, max, step, field) => (
    <div className="space-y-2">
      <Label>{label}: {value} ({getLevelLabel(field, value)})</Label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value || min]}
        onValueChange={(val) => setField(field, val[0])}
      />
    </div>
  );

  return (
   <div className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
  <div className="mx-auto space-y-4">
    {/* Date Selector */}
    <div>
      <Label className="text-gray-700 dark:text-gray-200 font-medium">Select Date</Label>
      <Input
        type="date"
        value={date}
        onChange={(e) => setField("date", e.target.value)}
        max={new Date().toISOString().slice(0, 10)}
        className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
      />
    </div>

    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      Mood Tracker for {date}
    </h2>

    {/* Form */}
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      {/* Overall Mood */}
      <div>
        <Label className="text-gray-700 dark:text-gray-200 font-medium">Overall Mood</Label>
        <Input
          value={mood || ""}
          onChange={(e) => setField("mood", e.target.value)}
          placeholder="AWFUL, BAD, OK, GOOD, GREAT"
          className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        />
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {renderSliderField("Mood Value", moodValue, 1, 5, 1, "moodValue")}
        {renderSliderField("Anxiety Level", anxietyLevel, 1, 5, 1, "anxietyLevel")}
        {renderSliderField("Energy Level", energyLevel, 1, 5, 1, "energyLevel")}
        {renderSliderField("Sleep Hours", sleepHours, 0, 12, 0.5, "sleepHours")}
        {renderSliderField("Focus Level", focusLevel, 1, 10, 1, "focusLevel")}
        {renderSliderField("Motivation Level", motivationLevel, 1, 10, 1, "motivationLevel")}
        {renderSliderField("Productivity", productivity, 1, 10, 1, "productivity")}
        {renderSliderField("Social Interaction", socialInteraction, 1, 10, 1, "socialInteraction")}
      </div>

      {/* Text Areas */}
      <div className="space-y-4">
        <div>
          <Label className="text-gray-700 dark:text-gray-200 font-medium">Notes</Label>
          <Textarea
            value={notes || ""}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Why did you feel this way?"
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-200 font-medium">Morning Journal</Label>
          <Textarea
            value={morningJournal || ""}
            onChange={(e) => setField("morningJournal", e.target.value)}
            placeholder="Morning reflection..."
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-200 font-medium">Evening Journal</Label>
          <Textarea
            value={eveningJournal || ""}
            onChange={(e) => setField("eveningJournal", e.target.value)}
            placeholder="Evening reflection..."
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-200 font-medium">Triggers (comma separated)</Label>
          <Textarea
            value={triggers || ""}
            onChange={(e) => setField("triggers", e.target.value)}
            placeholder="e.g., work, exercise, family..."
            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      >
        Save Mood
      </Button>
    </form>
  </div>
</div>

  );
}
