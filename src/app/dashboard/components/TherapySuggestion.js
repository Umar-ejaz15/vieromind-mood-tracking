// components/TherapySuggestion.js
import Link from "next/link";

export default function TherapySuggestion({ show, link, text }) {
  if (!show) return null;

  return (
    <div className="p-4 bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-200 rounded-lg shadow mb-4">
      {text}
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-2 px-4 rounded-lg bg-red-500 text-white text-center font-semibold hover:bg-red-600 transition-colors mt-2"
      >
        Reach a Therapist
      </Link>
    </div>
  );
}
