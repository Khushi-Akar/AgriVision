import { Activity, CheckCircle, AlertTriangle, List, ShieldCheck } from "lucide-react";

function formatSteps(text) {
  if (!text) return [];
  return text
    .split(/\d+\./)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ResultCard({ result }) {
  if (!result || !result.detection) return null;

  const { detection, advice } = result;
  const isHealthy = detection.is_healthy;
  const confidence = parseFloat(detection.confidence).toFixed(1);
  
  const treatmentSteps = formatSteps(advice?.treatment);
  const preventionSteps = formatSteps(advice?.prevention);

  return (
    <div className="glass-card w-full max-w-4xl mx-auto overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 flex items-center justify-between border-b ${
        isHealthy 
          ? "bg-brand-500/10 border-brand-500/20" 
          : "bg-red-500/10 border-red-500/20"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isHealthy ? "bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}>
            {isHealthy ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {detection.class.replace(/_/g, " ")}
            </h2>
            <p className={`font-medium ${isHealthy ? "text-brand-600 dark:text-brand-400" : "text-red-600 dark:text-red-400"}`}>
              {isHealthy ? "Plant is Healthy" : "Disease Detected"}
            </p>
          </div>
        </div>
        
        {/* Confidence Ring */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r="36" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="8" fill="none" />
            <circle 
              cx="40" cy="40" r="36" 
              className={`transition-all duration-1000 ease-out ${isHealthy ? "stroke-brand-500" : "stroke-red-500"}`} 
              strokeWidth="8" fill="none" 
              strokeDasharray={`${(confidence / 100) * 226} 226`} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-lg font-bold">{confidence}%</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Severity & Summary (if diseased) */}
        {!isHealthy && advice && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
                <Activity size={18} />
                <h3 className="font-semibold uppercase tracking-wider text-xs">Severity Level</h3>
              </div>
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200 capitalize">
                {advice.severity}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
                <AlertTriangle size={18} />
                <h3 className="font-semibold uppercase tracking-wider text-xs">Summary</h3>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {advice.summary}
              </p>
            </div>
          </div>
        )}

        {/* Actionable Advice */}
        {advice && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Treatment */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div className="bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 p-2 rounded-lg">
                  <List size={20} />
                </div>
                <h3 className="text-xl font-semibold">Treatment</h3>
              </div>
              
              {treatmentSteps.length > 1 ? (
                <ul className="space-y-3">
                  {treatmentSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 items-start">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  {advice.treatment || "No treatment required."}
                </p>
              )}
            </div>

            {/* Prevention */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 p-2 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-xl font-semibold">Prevention</h3>
              </div>
              
              {preventionSteps.length > 1 ? (
                <ul className="space-y-3">
                  {preventionSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 items-start">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  {advice.prevention || "Keep up the good work."}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
