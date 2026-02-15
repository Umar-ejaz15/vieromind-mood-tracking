"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenSquare, FileText, Menu, X, Heart, Activity } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Mood Log", path: "/moodlogs", icon: PenSquare },
    { name: "AI Summary", path: "/summary", icon: FileText },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-[72px] left-3 z-50 p-2.5 bg-gradient-to-br from-violet-600 to-teal-500 text-white rounded-xl shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-card border-r border-border/50 flex flex-col
          transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-72
        `}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border/50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center shadow-md">
              <Activity size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">MoodFlow</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-3">Navigation</p>
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600 to-teal-500 text-white shadow-md"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Help Section */}
        <div className="px-4 py-5 border-t border-border/50">
          <div className="bg-gradient-to-br from-violet-50 to-teal-50 dark:from-violet-950/30 dark:to-teal-950/20 p-4 rounded-xl">
            <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
              <Heart size={16} className="text-rose-500" /> Need Support?
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Feeling low or need to talk to someone?
            </p>
            <Link
              href="https://www.psychologytoday.com/us/therapists"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 px-3 rounded-lg bg-gradient-to-r from-violet-600 to-teal-500 text-white text-center text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Find a Therapist
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
