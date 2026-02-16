export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });

    const { moodData, userEmail } = await req.json();

    if (!moodData || !Array.isArray(moodData) || !moodData.length) {
      return NextResponse.json({ error: "No mood data provided" }, { status: 400 });
    }

    const moodText = moodData
      .map(
        (log) => `
Date: ${log.date}
Mood: ${log.moodLabel} (${log.moodValue}/5)
Sleep: ${log.sleep}h, Anxiety: ${log.anxiety}/5, Energy: ${log.energy}/5
Focus: ${log.focus}/10, Motivation: ${log.motivation}/10, Productivity: ${log.productivity}/10
Social: ${log.social}/10
Notes: ${log.notes || "none"}
Morning Journal: ${log.morning || "none"}
Evening Journal: ${log.evening || "none"}`
      )
      .join("\n");

    const prompt = `You are a professional AI wellness assistant. Analyze the following user's mood tracking data and provide a comprehensive yet concise report. Include:
1. Overall mood trends and patterns
2. Notable changes or concerning patterns
3. Sleep quality analysis
4. Correlations between metrics (e.g., sleep vs mood, anxiety vs productivity)
5. Personalized actionable recommendations

User: ${userEmail || "Anonymous"}

Mood Data:
${moodText}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const summary = response.text || "No summary could be generated. Please try again.";

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Failed to generate summary:", err);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
