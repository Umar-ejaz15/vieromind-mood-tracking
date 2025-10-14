import { prisma } from "@/lib/prisma";

// GET: fetch a mood log for a specific date
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const userId = searchParams.get("userId");

    if (!userId) return new Response("Unauthorized", { status: 401 });
    if (!dateParam) return new Response("Missing date", { status: 400 });

    const date = new Date(dateParam);
    date.setHours(0, 0, 0, 0);

    const log = await prisma.moodLog.findFirst({
      where: { userId, date },
    });

    return new Response(JSON.stringify(log || {}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/moodlogs error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST: create or update a mood log
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, userEmail, date } = body;

    if (!userId || !date)
      return new Response("Missing userId or date", { status: 400 });

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const data = {
      userId,
      userEmail: userEmail || null,

      // Core metrics
      mood: body.mood || null,
      moodValue: body.moodValue ?? null,
      anxietyLevel: body.anxietyLevel ?? null,
      energyLevel: body.energyLevel ?? null,
      sleepHours: body.sleepHours ?? null,

      // Advanced metrics
      focusLevel: body.focusLevel ?? null,
      motivationLevel: body.motivationLevel ?? null,
      productivity: body.productivity ?? null,
      socialInteraction: body.socialInteraction ?? null,

      // Notes & Journals
      notes: body.notes || null,
      morningJournal: body.morningJournal || null,
      eveningJournal: body.eveningJournal || null,
      triggers: body.triggers || null,

      date: logDate,
    };

    const log = await prisma.moodLog.upsert({
      where: { userId_date: { userId, date: logDate } },
      create: data,
      update: data,
    });

    return new Response(JSON.stringify(log), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/moodlogs error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
