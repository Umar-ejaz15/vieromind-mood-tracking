"use client";

import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center">
              <Activity size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">MoodFlow</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Track your mood. Understand yourself better.
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MoodFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
