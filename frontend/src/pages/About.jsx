import { Info, Code, Heart, Link as LinkIcon } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-brand-500/10 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <Info size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">About AgriVision</h1>
          <p className="text-slate-500 dark:text-slate-400">Learn more about the project and its mission</p>
        </div>
      </div>

      <div className="glass-card p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="text-brand-500" size={24} /> Our Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            AgriVision aims to empower farmers and agricultural enthusiasts by providing accessible, state-of-the-art AI technology to instantly identify crop diseases and offer actionable treatment advice, ultimately improving yield and promoting sustainable farming practices.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Code className="text-slate-500" size={20} /> Technology Stack
          </h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {["React 19", "Tailwind CSS v4", "Vite", "Lucide Icons", "Recharts", "Python Backend", "Deep Learning"].map(tech => (
              <span key={tech} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm border border-slate-200 dark:border-slate-700 shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <a href="#" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium">
            <LinkIcon size={20} /> View Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
