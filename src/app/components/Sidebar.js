"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, Heart, Menu, X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Mood Logs", path: "/moodlogs", icon: List },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-15 left-2 z-50 p-2 bg-red-500 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col
          transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-[30%]
        `}
      >
        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Menu
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)} // close sidebar on mobile after click
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Help Section */}
        <div className="px-6 py-8 border-t border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
            <Heart size={20} /> Need Help?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Feeling low or need to talk to someone?
          </p>
          <Link
            href="/reach-therapist"
            className="block py-2 px-4 rounded-lg bg-red-500 text-white text-center font-semibold hover:bg-red-600 transition-colors"
            onClick={() => setIsOpen(false)} // close on mobile
          >
            Reach a Therapist
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
