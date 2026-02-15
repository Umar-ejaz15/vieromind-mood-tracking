import { TrendingUp, Moon, AlertTriangle, Zap } from "lucide-react";

const iconMap = {
  "Average Mood": { icon: TrendingUp, gradient: "from-violet-500 to-purple-600" },
  "Total Sleep": { icon: Moon, gradient: "from-blue-500 to-cyan-600" },
  "Average Anxiety": { icon: AlertTriangle, gradient: "from-rose-500 to-pink-600" },
  "Average Energy": { icon: Zap, gradient: "from-amber-500 to-orange-600" },
};

export default function StatCard({ title, value }) {
  const config = iconMap[title] || { icon: TrendingUp, gradient: "from-violet-500 to-purple-600" };
  const Icon = config.icon;

  return (
    <div className="bg-card border border-border/50 p-5 rounded-2xl hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon size={18} className="text-white" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
