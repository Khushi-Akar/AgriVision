import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart2, Activity } from "lucide-react";

const API = "https://agrivision-j0t2.onrender.com/api";
const COLORS = ["#10b981", "#ef4444"]; // Brand Green, Red

export default function Dashboards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 animate-pulse">Loading stats...</div>;
  if (!stats) return <div className="text-center py-20 text-red-500">Failed to load stats.</div>;

  const data = [
    { name: "Healthy", value: stats.healthy },
    { name: "Diseased", value: stats.diseased },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-brand-500/10 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <BarChart2 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Overview of all scanned crops</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col justify-center items-center text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Total Scans</p>
          <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-teal-400">
            {stats.total_scans}
          </p>
        </div>
        
        <div className="glass-card p-6 md:col-span-2 flex flex-col sm:flex-row items-center gap-8">
          <div className="w-full sm:w-1/2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                <p className="font-semibold">Healthy Crops</p>
              </div>
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{stats.healthy}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                <p className="font-semibold">Diseased Crops</p>
              </div>
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{stats.diseased}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
