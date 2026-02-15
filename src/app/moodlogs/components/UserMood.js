"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useMoodStore } from "@/store/useMoodStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

const moodOptions = [
  { label: "Awful", value: "AWFUL", num: 1, emoji: "\u{1F616}", color: "from-red-500 to-rose-600" },
  { label: "Bad", value: "BAD", num: 2, emoji: "\u{1F61E}", color: "from-orange-500 to-amber-600" },
  { label: "Ok", value: "OK", num: 3, emoji: "\u{1F610}", color: "from-yellow-500 to-amber-500" },
  { label: "Good", value: "GOOD", num: 4, emoji: "\u{1F60A}", color: "from-emerald-500 to-teal-600" },
  { label: "Great", value: "GREAT", num: 5, emoji: "\u{1F929}", color: "from-violet-500 to-purple-600" },
];

export default function UserMood() {
  const { user, isSignedIn } = useUser();
  const {
    mood, moodValue, anxietyLevel, energyLevel, sleepHours,
    focusLevel, motivationLevel, productivity, socialInteraction,
    notes, morningJournal, eveningJournal, triggers,
    date, loadMoodLog, setField,
  } = useMoodStore();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !user || !date) return;

    const fetchMoodLog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/moodlogs", {
          params: { date, userId: user.id },
        });
        if (res.data && res.data.id) {
          loadMoodLog({
            ...res.data,
            date: res.data.date ? new Date(res.data.date).toISOString().slice(0, 10) : date,
          });
        } else {
          // No log exists for this date - reset form but keep the date
          loadMoodLog({ date });
        }
      } catch (err) {
        console.error("Failed to fetch mood log:", err?.response?.data || err?.message || err);
        setError("Failed to load mood log");
      } finally {
        setLoading(false);
      }
    };

    fetchMoodLog();
  }, [date, user, isSignedIn, loadMoodLog]);

  const handleMoodSelect = (option) => {
    setField("mood", option.value);
    setField("moodValue", option.num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn || !user) return alert("You must be logged in to submit a mood log");

    setSaving(true);
    setSaved(false);
    try {
      const body = {
        mood, moodValue, anxietyLevel, energyLevel, sleepHours,
        focusLevel, motivationLevel, productivity, socialInteraction,
        notes, morningJournal, eveningJournal, triggers, date,
        userId: user.id,
        userEmail: user.emailAddresses[0]?.emailAddress || "",
      };

      const { data } = await axios.post("/api/moodlogs", body, {
        headers: { "Content-Type": "application/json" },
      });

      loadMoodLog({
        ...data,
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : date,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving mood log:", err?.response?.data || err?.message || err);
      alert("Error saving mood log.");
    } finally {
      setSaving(false);
    }
  };

  const getLevelLabel = (field, value) => {
    if (value == null) return "-";
    switch (field) {
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
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
          {value} <span className="text-xs text-muted-foreground font-normal">({getLevelLabel(field, value)})</span>
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value || min]}
        onValueChange={(val) => setField(field, val[0])}
        className="cursor-pointer"
      />
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Mood Log</h1>
          <p className="text-muted-foreground">Record how you feel today</p>
        </div>

        {/* Date Picker */}
        <div className="bg-card border border-border/50 rounded-2xl p-5">
          <Label className="text-sm font-medium mb-2 block">Select Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setField("date", e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className="rounded-xl"
          />
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 p-4">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading mood log...</span>
          </div>
        )}
        {error && <p className="text-destructive text-sm p-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selector */}
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <Label className="text-sm font-medium mb-4 block">How are you feeling?</Label>
            <div className="grid grid-cols-5 gap-3">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleMoodSelect(option)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    mood === option.value
                      ? `border-violet-500 bg-gradient-to-br ${option.color} text-white shadow-lg scale-105`
                      : "border-border/50 bg-accent/30 hover:border-border hover:bg-accent"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Metric Sliders */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Metrics</h3>
            {renderSliderField("Anxiety Level", anxietyLevel, 1, 5, 1, "anxietyLevel")}
            {renderSliderField("Energy Level", energyLevel, 1, 5, 1, "energyLevel")}
            {renderSliderField("Sleep Hours", sleepHours, 0, 12, 0.5, "sleepHours")}
            {renderSliderField("Focus Level", focusLevel, 1, 10, 1, "focusLevel")}
            {renderSliderField("Motivation Level", motivationLevel, 1, 10, 1, "motivationLevel")}
            {renderSliderField("Productivity", productivity, 1, 10, 1, "productivity")}
            {renderSliderField("Social Interaction", socialInteraction, 1, 10, 1, "socialInteraction")}
          </div>

          {/* Journal & Notes */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Journal & Notes</h3>

            {[
              { field: "notes", label: "Notes", placeholder: "Why did you feel this way?" },
              { field: "morningJournal", label: "Morning Journal", placeholder: "Morning reflection..." },
              { field: "eveningJournal", label: "Evening Journal", placeholder: "Evening reflection..." },
              { field: "triggers", label: "Triggers", placeholder: "e.g., work, exercise, family..." },
            ].map((item) => (
              <div key={item.field}>
                <Label className="text-sm font-medium mb-2 block">{item.label}</Label>
                <Textarea
                  value={{ notes, morningJournal, eveningJournal, triggers }[item.field] || ""}
                  onChange={(e) => setField(item.field, e.target.value)}
                  placeholder={item.placeholder}
                  className="rounded-xl min-h-[80px] resize-none"
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={saving}
            className="w-full py-6 bg-gradient-to-r from-violet-600 to-teal-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all text-base shadow-lg"
          >
            {saving ? (
              <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</>
            ) : saved ? (
              "Saved!"
            ) : (
              <><Save size={18} className="mr-2" /> Save Mood Log</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
