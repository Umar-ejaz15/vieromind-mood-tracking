"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Logo + Text */}
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            vieromind
          </Link>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-500">
            Track your mood. Understand yourself better.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          
          <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Dashboard
          </Link>
        </div>

        {/* Right: Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Emoods. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
