"use client";
import { useState } from "react";
import axios from "axios";
import { useApp } from "@/context/AppContext";
import Header from "@/components/layout/Header";
import ResumeUpload from "@/components/upload/ResumeUpload";
import MatchScore from "@/components/analysis/MatchScore";
import SkillsGrid from "@/components/analysis/SkillsGrid";
import CVImprovements from "@/components/analysis/CVImprovements";
import CoverLetter from "@/components/analysis/CoverLetter";

export default function Home() {
  const { state, dispatch } = useApp();
  const [jdText, setJdText] = useState("");
  const [company, setCompany] = useState("");

  async function handleAnalyze() {
    if (!state.isResumeUploaded) return alert("Upload your resume first!");
    if (!jdText) return alert("Paste a job description!");
    if (!company) return alert("Enter company name!");

    dispatch({ type: "SET_LOADING", payload: true });

    const formData = new FormData();
    formData.append("file", state.resumeFile!);
    formData.append("jd_text", jdText);
    formData.append("company_name", company);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze/full-analysis`,
        formData
      );
      dispatch({ type: "SET_RESULT", payload: res.data });
    } catch {
      alert("Something went wrong. Is backend running?");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  const inputStyle = {
    width: "100%",
    background: "#0a0f1a",
    border: "1px solid #1e2d3d",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#070b14" }}>
      <Header />

      {/* Background Glow */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse at 15% 15%, rgba(0,229,255,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 85%, rgba(124,58,237,0.06) 0%, transparent 50%)
        `,
      }} />

      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "48px 24px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Hero */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 800,
            marginBottom: "12px",
            background: "linear-gradient(135deg, #ffffff 0%, #8892a4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.2,
          }}>
            Your AI Job Assistant
          </h1>
          <p style={{ color: "#8892a4", fontSize: "15px", lineHeight: 1.6 }}>
            Upload once. Get match score, skill gaps,
            CV suggestions and cover letter — all at once.
          </p>
        </div>

        {/* Step 1 — Resume */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "#8892a4", fontSize: "12px",
            fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: "10px",
          }}>
            <span style={{
              width: "20px", height: "20px",
              background: state.isResumeUploaded
                ? "rgba(0,255,136,0.2)" : "rgba(0,229,255,0.2)",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "10px", fontWeight: 800,
              color: state.isResumeUploaded ? "#00ff88" : "#00e5ff",
            }}>1</span>
            Your Resume
          </label>
          <ResumeUpload />
        </div>

        {/* Step 2 — JD + Company */}
        {state.isResumeUploaded && (
          <div style={{
            background: "rgba(13,17,23,0.8)",
            border: "1px solid #1e2d3d",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "16px",
            backdropFilter: "blur(20px)",
          }}>
            <label style={{
              display: "flex", alignItems: "center", gap: "8px",
              color: "#8892a4", fontSize: "12px",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: "16px",
            }}>
              <span style={{
                width: "20px", height: "20px",
                background: "rgba(0,229,255,0.2)",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "10px", fontWeight: 800, color: "#00e5ff",
              }}>2</span>
              Job Details
            </label>

            <div style={{ marginBottom: "14px" }}>
              <p style={{ color: "#8892a4", fontSize: "12px", marginBottom: "8px" }}>
                Company Name
              </p>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Durapid, Razorpay..."
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#00e5ff")}
                onBlur={(e) => (e.target.style.borderColor = "#1e2d3d")}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#8892a4", fontSize: "12px", marginBottom: "8px" }}>
                Job Description
              </p>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the full job description here..."
                rows={6}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "#00e5ff")}
                onBlur={(e) => (e.target.style.borderColor = "#1e2d3d")}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={state.loading}
              style={{
                width: "100%",
                background: state.loading
                  ? "rgba(0,229,255,0.3)"
                  : "linear-gradient(135deg, #00e5ff, #0099bb)",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                color: "#000",
                fontWeight: 700,
                fontSize: "14px",
                cursor: state.loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {state.loading ? "Analyzing your profile..." : "Analyze My Profile ✨"}
            </button>
          </div>
        )}

        {/* Results */}
        {state.result && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <MatchScore data={state.result.jd_match} />
            <SkillsGrid data={state.result.jd_match} />
            <CVImprovements data={state.result.resume_analysis} />
            <CoverLetter text={state.result.cover_letter} />
          </div>
        )}
      </div>
    </div>
  );
}
