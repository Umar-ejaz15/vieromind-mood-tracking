import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId: authUserId } = await auth();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!authUserId || authUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const logs = await prisma.moodLog.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(logs);
  } catch (err) {
    console.error("GET /api/moodlogs/all error:", err);
    return NextResponse.json({ error: "Failed to fetch mood logs" }, { status: 500 });
  }
}
