import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function toUTCMidnight(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

// GET: fetch a mood log for a specific date
export async function GET(req) {
  try {
    const { userId: authUserId } = await auth();
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const userId = searchParams.get("userId");

    if (!authUserId || authUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!dateParam) {
      return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
    }

    const date = toUTCMidnight(dateParam);

    const log = await prisma.moodLog.findFirst({
      where: { userId, date },
    });

    return NextResponse.json(log);
  } catch (err) {
    console.error("GET /api/moodlogs error:", err);
    return NextResponse.json({ error: "Failed to fetch mood log" }, { status: 500 });
  }
}

// POST: create or update a mood log
export async function POST(req) {
  try {
    const { userId: authUserId } = await auth();
    const body = await req.json();
    const { userId, userEmail, date } = body;

    if (!authUserId || authUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!date) {
      return NextResponse.json({ error: "Missing date" }, { status: 400 });
    }

    const logDate = toUTCMidnight(date);

    // Sanitize and clamp numeric values
    const clamp = (val, min, max) => {
      if (val == null) return null;
      const num = Number(val);
      if (isNaN(num)) return null;
      return Math.min(Math.max(num, min), max);
    };

    const data = {
      userId,
      userEmail: userEmail || null,
      mood: typeof body.mood === "string" ? body.mood.toUpperCase() : null,
      moodValue: clamp(body.moodValue, 1, 5),
      anxietyLevel: clamp(body.anxietyLevel, 1, 5),
      energyLevel: clamp(body.energyLevel, 1, 5),
      sleepHours: clamp(body.sleepHours, 0, 24),
      focusLevel: clamp(body.focusLevel, 1, 10),
      motivationLevel: clamp(body.motivationLevel, 1, 10),
      productivity: clamp(body.productivity, 1, 10),
      socialInteraction: clamp(body.socialInteraction, 1, 10),
      notes: typeof body.notes === "string" ? body.notes.slice(0, 5000) : null,
      morningJournal: typeof body.morningJournal === "string" ? body.morningJournal.slice(0, 5000) : null,
      eveningJournal: typeof body.eveningJournal === "string" ? body.eveningJournal.slice(0, 5000) : null,
      triggers: typeof body.triggers === "string" ? body.triggers.slice(0, 2000) : null,
      date: logDate,
    };

    const log = await prisma.moodLog.upsert({
      where: { userId_date: { userId, date: logDate } },
      create: data,
      update: data,
    });

    return NextResponse.json(log);
  } catch (err) {
    console.error("POST /api/moodlogs error:", err);
    return NextResponse.json({ error: "Failed to save mood log" }, { status: 500 });
  }
}
