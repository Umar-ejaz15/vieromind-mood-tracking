import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";

export default function TherapySuggestion({ show, link, text }) {
  if (!show) return null;

  return (
    <div className="p-5 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/20 border border-rose-200 dark:border-rose-800/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
        <AlertTriangle size={18} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-rose-900 dark:text-rose-200">{text}</p>
      </div>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0 shadow-sm"
      >
        Find a Therapist <ExternalLink size={14} />
      </Link>
    </div>
  );
}
