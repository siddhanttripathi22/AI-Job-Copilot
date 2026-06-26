"use client";
import { useState } from "react";
import axios from "axios";

export default function JDAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!file) return alert("Please select a PDF file!");
    if (!jdText) return alert("Please paste a Job Description!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd_text", jdText);

    try {
      const res = await axios.post(
     "https://3.108.250.109.sslip.io/jd/analyze",
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
        🎯 JD Match Analysis
      </h1>

      {/* Input Section */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
        
        {/* Resume Upload */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-gray-300 text-sm block"
          />
        </div>

        {/* JD Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Paste Job Description
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={6}
            className="w-full bg-gray-800 text-gray-300 text-sm 
            rounded-lg p-3 border border-gray-600 
            focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50
          text-white font-bold px-6 py-2 rounded-lg transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Match 🎯"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          
          {/* Match Score */}
          <div className="text-center mb-6">
            <div
              className={`inline-block rounded-full w-28 h-28 flex items-center 
              justify-center border-4 mb-2
              ${result.match_score >= 75
                ? "border-green-500"
                : result.match_score >= 50
                ? "border-yellow-500"
                : "border-red-500"
              }`}
            >
              <span className="text-3xl font-bold text-white">
                {result.match_score}%
              </span>
            </div>
            <p
              className={`font-bold text-lg
              ${result.match_score >= 75
                ? "text-green-400"
                : result.match_score >= 50
                ? "text-yellow-400"
                : "text-red-400"
              }`}
            >
              {result.verdict}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matching Skills */}
            <div>
              <h3 className="text-gray-400 text-sm font-bold mb-3">
                ✅ MATCHING SKILLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.matching_skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-green-900 text-green-300 text-xs
                    px-3 py-1 rounded-full border border-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <h3 className="text-gray-400 text-sm font-bold mb-3">
                ❌ MISSING SKILLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-red-900 text-red-300 text-xs
                    px-3 py-1 rounded-full border border-red-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h3 className="text-gray-400 text-sm font-bold mb-3">
                💪 STRENGTHS
              </h3>
              {result.strengths?.map((s: string) => (
                <p key={s} className="text-green-400 text-sm mb-1">
                  • {s}
                </p>
              ))}
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-gray-400 text-sm font-bold mb-3">
                💡 SUGGESTIONS
              </h3>
              {result.suggestions?.map((tip: string) => (
                <p key={tip} className="text-yellow-400 text-sm mb-1">
                  • {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
