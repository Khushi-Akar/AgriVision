import { useState, useEffect } from "react";
import { History as HistoryIcon, Search, Calendar, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import axios from "axios";

const API = "http://localhost:8000/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API}/history`);
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-brand-500/10 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <HistoryIcon size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Scan History</h1>
          <p className="text-slate-500 dark:text-slate-400">Review your past crop scans and results</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 animate-pulse">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full text-slate-400 dark:text-slate-500">
            <Search size={48} />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No History Available</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
            You haven't scanned any crops yet. Head over to the scanner to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((record) => (
            <div key={record.id} className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition-shadow">
              
              <div className={`p-4 rounded-full flex-shrink-0 ${record.is_healthy ? "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}>
                {record.is_healthy ? <CheckCircle size={28} /> : <AlertTriangle size={28} />}
              </div>

              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {record.disease_detected.replace(/___/g, " - ").replace(/_/g, " ")}
                </h3>
                <p className="text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-1 text-sm">
                  <Calendar size={14} /> 
                  {new Date(record.scan_date).toLocaleDateString()} at {new Date(record.scan_date).toLocaleTimeString()}
                </p>
              </div>

              <div className="flex items-center gap-4 text-center sm:text-right">
                <div>
                  <p className="text-xs uppercase font-semibold tracking-wider text-slate-500">Confidence</p>
                  <p className="text-lg font-bold">{parseFloat(record.confidence).toFixed(1)}%</p>
                </div>
                {!record.is_healthy && (
                  <div className="hidden sm:block border-l border-slate-200 dark:border-slate-700 pl-4">
                    <p className="text-xs uppercase font-semibold tracking-wider text-slate-500">Severity</p>
                    <p className="text-md font-medium text-red-500 capitalize">{record.severity}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
