// src/app/api/moodlogs/generate-summary/route.js
export const runtime = "nodejs"; // important to avoid bundler issues

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { moodData, userEmail } = await req.json();

    if (!moodData || !moodData.length) {
      return NextResponse.json({ error: "No mood data provided" }, { status: 400 });
    }

    // Format mood logs
    const moodText = moodData
      .map(
        (log) => `
Date: ${log.date}
Mood: ${log.moodLabel} (${log.moodValue})
Sleep: ${log.sleep}h, Anxiety: ${log.anxiety}, Energy: ${log.energy}
Focus: ${log.focus}, Motivation: ${log.motivation}, Productivity: ${log.productivity}
Social: ${log.social}, Notes: ${log.notes}
Morning: ${log.morning}
Evening: ${log.evening}`
      )
      .join("\n");

    const prompt = `You are a friendly AI journal assistant. Summarize the following user's mood data into a concise report highlighting trends, notable changes, and emotional insights. User email: ${userEmail}\n\n${moodText}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // your Gemini model
      contents: prompt,
    });

    const summary = response.text || "No summary generated";

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Failed to generate summary:", err);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
