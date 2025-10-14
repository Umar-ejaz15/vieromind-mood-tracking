// components/StatCard.js
export default function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center hover:scale-105 transition-transform">
      <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
