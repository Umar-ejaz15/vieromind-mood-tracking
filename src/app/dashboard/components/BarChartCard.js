// components/BarChartCard.js
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartCard({ title, data, bars, tooltipClass }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={({active, payload}) => {
            if(active && payload && payload.length){
              const p = payload[0].payload;
              return <div className={tooltipClass}>
                {Object.entries(p).map(([k,v]) => <p key={k}><strong>{k}:</strong> {v}</p>)}
              </div>
            }
            return null;
          }} />
          <Legend />
          {bars.map(bar => <Bar key={bar.dataKey} {...bar} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
