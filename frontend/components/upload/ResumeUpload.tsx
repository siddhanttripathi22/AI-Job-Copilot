"use client";
import { useApp } from "@/context/AppContext";
import axios from "axios";

export default function ResumeUpload() {
  const { state, dispatch } = useApp();

  async function handleFile(file: File) {
    if (file.type !== "application/pdf") {
      return alert("Please upload a PDF file!");
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/resume/upload",
        formData
      );
      dispatch({
        type: "SET_RESUME",
        payload: { file, text: res.data.raw_text || "" },
      });
    } catch {
      alert("Error uploading. Is backend running?");
    }
  }

  if (state.isResumeUploaded) {
    return (
      <div style={{
        background: "rgba(0, 255, 136, 0.05)",
        border: "1px solid rgba(0, 255, 136, 0.2)",
        borderRadius: "16px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px",
            background: "rgba(0, 255, 136, 0.1)",
            borderRadius: "10px",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "18px",
          }}>📄</div>
          <div>
            <p style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>
              {state.resumeFile?.name}
            </p>
            <p style={{ color: "#00ff88", fontSize: "12px", marginTop: "2px" }}>
              ✅ Resume uploaded & ready
            </p>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: "REMOVE_RESUME" })}
          style={{
            background: "transparent",
            border: "1px solid #1e2d3d",
            color: "#8892a4",
            padding: "6px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Replace
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => document.getElementById("resumeInput")?.click()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: "2px dashed #1e2d3d",
        borderRadius: "16px",
        padding: "48px 24px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        background: "rgba(255,255,255,0.01)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#00e5ff";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(0,229,255,0.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#1e2d3d";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.01)";
      }}
    >
      <input
        id="resumeInput"
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>📄</div>
      <p style={{ color: "#fff", fontSize: "15px", fontWeight: 500, marginBottom: "6px" }}>
        Drop your resume here
      </p>
      <p style={{ color: "#4a5568", fontSize: "13px" }}>
        or click to browse — PDF only
      </p>
    </div>
  );
}