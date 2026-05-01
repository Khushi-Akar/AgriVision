import { useState } from "react";
import UploadZone from "../components/UploadZone";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [result, setResult] = useState(null);

  const handleScanResult = (data) => {
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Intelligent <span className="text-gradient">Crop Scanning</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Upload an image of your crop leaf and our AI will instantly identify diseases and provide actionable treatment advice.
        </p>
      </div>

      <div className="w-full">
        <UploadZone onResult={handleScanResult} />
      </div>

      {result && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
}
