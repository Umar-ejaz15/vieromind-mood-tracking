import { create } from "zustand";

export const useAppStore = create((set) => ({
  darkMode: false,
  lang: "en",

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setLang: (lang) => set({ lang }),
}));
