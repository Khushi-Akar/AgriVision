import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import axios from "axios";

const API = import.meta.env.PROD ? 'https://agrivision-j0t2.onrender.com/api' : 'http://127.0.0.1:8000/api';

export default function UploadZone({ onResult }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleScan = async (e) => {
    e.stopPropagation();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/scan`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(res.data);
    } catch (err) {
      console.error("Scan failed:", err);
      alert("Scan failed. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer overflow-hidden rounded-3xl transition-all duration-300
          ${
            isDragActive
              ? "border-brand-500 bg-brand-50/50 dark:bg-brand-500/10 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]"
              : "border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }
          border-2 border-dashed
        `}
      >
        <input {...getInputProps()} />
        
        <div className="p-10 flex flex-col items-center justify-center text-center min-h-[320px]">
          {preview ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 max-w-[280px]">
                <img
                  src={preview}
                  alt="Crop preview"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium flex items-center gap-2">
                    <ImageIcon size={16} /> Change Image
                  </p>
                </div>
              </div>
              <button
                onClick={handleScan}
                disabled={loading}
                className="mt-8 relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 w-48 shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ecfdf5_0%,#10b981_50%,#ecfdf5_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-slate-900 px-6 py-1 text-sm font-bold text-brand-600 dark:text-brand-400 backdrop-blur-3xl gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Scanning...
                    </>
                  ) : (
                    "Scan Crop"
                  )}
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-full bg-brand-100 dark:bg-brand-500/20 p-4 text-brand-600 dark:text-brand-400">
                <UploadCloud size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Drag & drop your image here
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                Support for JPG, PNG, and WebP formats. High-resolution images yield the best results.
              </p>
              <div className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm transition-transform hover:scale-105">
                Browse Files
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}