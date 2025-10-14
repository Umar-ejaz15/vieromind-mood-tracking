import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances in dev during HMR
  global.__prisma ||= {};
  prisma = global.__prisma.client ||= new PrismaClient();
}

export { prisma };
