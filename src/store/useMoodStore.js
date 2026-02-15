import { create } from "zustand";

export const useMoodStore = create((set, get) => ({
  // Core Metrics
  mood: "",
  moodValue: 1,
  anxietyLevel: 1,
  energyLevel: 1,
  sleepHours: 1,

  // Advanced Metrics
  focusLevel: 1,
  motivationLevel: 1,
  productivity: 1,
  socialInteraction: 1,

  // Notes & Journals
  notes: "",
  morningJournal: "",
  eveningJournal: "",
  triggers: "",

  // Date & User Info
  date: new Date().toISOString().slice(0, 10),
  userId: "",
  userEmail: "",

  // Load mood log from API - preserves the current date if not provided
  loadMoodLog: (log) => {
    const currentDate = get().date;
    set({
      mood: log?.mood || "",
      moodValue: log?.moodValue ?? 1,
      anxietyLevel: log?.anxietyLevel ?? 1,
      energyLevel: log?.energyLevel ?? 1,
      sleepHours: log?.sleepHours ?? 1,
      focusLevel: log?.focusLevel ?? 1,
      motivationLevel: log?.motivationLevel ?? 1,
      productivity: log?.productivity ?? 1,
      socialInteraction: log?.socialInteraction ?? 1,
      notes: log?.notes || "",
      morningJournal: log?.morningJournal || "",
      eveningJournal: log?.eveningJournal || "",
      triggers: log?.triggers || "",
      userId: log?.userId || "",
      userEmail: log?.userEmail || "",
      // Preserve date: use provided date, or keep current
      date: log?.date || currentDate,
    });
  },

  // Generic setter for individual fields
  setField: (field, value) => set({ [field]: value }),
}));
