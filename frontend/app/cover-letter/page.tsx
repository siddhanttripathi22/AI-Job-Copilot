"use client";
import { useState } from "react";
import axios from "axios";

export default function CoverLetterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [company, setCompany] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!file) return alert("Please select a PDF file!");
    if (!jdText) return alert("Please paste a Job Description!");
    if (!company) return alert("Please enter company name!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd_text", jdText);
    formData.append("company_name", company);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/cover-letter/generate",
        formData
      );
      setLetter(res.data.cover_letter);
    } catch (err) {
      alert("Error! Check console.");
      console.error(err);
    }
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        ✉️ Cover Letter Generator
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

        {/* Company Name */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Google, Microsoft, Durapid..."
            className="w-full bg-gray-800 text-gray-300 text-sm
            rounded-lg p-3 border border-gray-600
            focus:outline-none focus:border-green-500"
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
            rows={5}
            className="w-full bg-gray-800 text-gray-300 text-sm
            rounded-lg p-3 border border-gray-600
            focus:outline-none focus:border-green-500 resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50
          text-black font-bold px-6 py-2 rounded-lg transition-colors"
        >
          {loading ? "Generating..." : "Generate Cover Letter ✨"}
        </button>
      </div>

      {/* Result */}
      {letter && (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">
              Your Cover Letter
            </h2>
            <button
              onClick={handleCopy}
              className="bg-gray-700 hover:bg-gray-600 text-white
              text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>

          {/* Letter Text */}
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {letter}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}