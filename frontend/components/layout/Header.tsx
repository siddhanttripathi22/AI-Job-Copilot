"use client";
import { useApp } from "@/context/AppContext";

export default function Header() {
  const { state } = useApp();

  return (
    <header style={{
      background: "rgba(7, 11, 20, 0.9)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid #1e2d3d",
      padding: "0 32px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px",
          background: "linear-gradient(135deg, #00e5ff, #0099bb)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#000", fontWeight: 800, fontSize: "12px",
        }}>AI</div>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#fff" }}>
          Job Copilot
        </span>
      </div>

      {/* Status */}
      {state.isResumeUploaded ? (
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(0, 255, 136, 0.1)",
          border: "1px solid rgba(0, 255, 136, 0.2)",
          borderRadius: "20px", padding: "6px 14px",
        }}>
          <div style={{
            width: "6px", height: "6px",
            borderRadius: "50%", background: "#00ff88",
          }} />
          <span style={{ color: "#00ff88", fontSize: "12px", fontWeight: 500 }}>
            {state.resumeFile?.name.slice(0, 20)}...
          </span>
        </div>
      ) : (
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid #1e2d3d",
          borderRadius: "20px", padding: "6px 14px",
        }}>
          <div style={{
            width: "6px", height: "6px",
            borderRadius: "50%", background: "#4a5568",
          }} />
          <span style={{ color: "#4a5568", fontSize: "12px" }}>
            No resume uploaded
          </span>
        </div>
      )}
    </header>
  );
}