"use client";
import { useState } from "react";
import axios from "axios";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return alert("Please select a PDF file!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
      "https://3.108.250.109.sslip.io/resume/upload",
        formData
      );
      setResult(res.data.data);
    } catch (err) {
      alert("Error! Check console.");
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        📄 Resume Analysis
      </h1>

      {/* Upload Box */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
        <label className="block text-gray-400 text-sm mb-2">
          Upload Resume (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-gray-300 text-sm mb-4 block"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50
          text-black font-bold px-6 py-2 rounded-lg transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Resume ✨"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          <h2 className="text-white font-bold text-lg mb-4">
            Analysis Result
          </h2>

          {/* Name */}
          <p className="text-cyan-400 text-xl font-bold mb-4">
            {result.name}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm font-bold mb-2">
              SKILLS
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.skills?.map((skill: string) => (
                <span
                  key={skill}
                  className="bg-gray-800 text-cyan-300 text-xs 
                  px-3 py-1 rounded-full border border-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-4">
            <h3 className="text-gray-400 text-sm font-bold mb-2">
              STRENGTHS
            </h3>
            {result.strengths?.map((s: string) => (
              <p key={s} className="text-green-400 text-sm mb-1">
                ✅ {s}
              </p>
            ))}
          </div>

          {/* Improvements */}
          <div>
            <h3 className="text-gray-400 text-sm font-bold mb-2">
              IMPROVEMENTS
            </h3>
            {result.improvements?.map((tip: string) => (
              <p key={tip} className="text-yellow-400 text-sm mb-1">
                💡 {tip}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
