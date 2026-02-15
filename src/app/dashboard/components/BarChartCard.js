import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartCard({ title, data, bars, tooltipClass }) {
  return (
    <div className="bg-card border border-border/50 p-6 rounded-2xl">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground mb-5">Focus, motivation, productivity & social metrics</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              fontSize: "13px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "8px" }} />
          {bars.map(bar => <Bar key={bar.dataKey} {...bar} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
