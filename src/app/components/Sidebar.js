import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List, Calendar, Heart } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Mood Logs', path: '/moodlogs', icon: List },
  ];

  return (
    <div className="w-[30%] min-h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col">
      {/* Scrollable Navigation Links */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Menu</h2>
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
                      ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Help Section (always at bottom) */}
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
        >
          Reach a Therapist
        </Link>
      </div>
    </div>
  );
}
