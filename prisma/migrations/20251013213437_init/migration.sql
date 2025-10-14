-- CreateTable
CREATE TABLE "MoodLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userEmail" TEXT,
    "mood" TEXT,
    "moodValue" INTEGER,
    "anxietyLevel" INTEGER,
    "energyLevel" INTEGER,
    "sleepHours" DOUBLE PRECISION,
    "focusLevel" INTEGER,
    "motivationLevel" INTEGER,
    "productivity" INTEGER,
    "socialInteraction" INTEGER,
    "notes" TEXT,
    "morningJournal" TEXT,
    "eveningJournal" TEXT,
    "triggers" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoodLog_userId_date_key" ON "MoodLog"("userId", "date");
