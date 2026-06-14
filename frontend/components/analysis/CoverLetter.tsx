"use client";
import { useState } from "react";

export default function CoverLetter({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{
      background: "rgba(13,17,23,0.8)",
      border: "1px solid #1e2d3d",
      borderRadius: "16px",
      padding: "20px",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}>
        <h3 style={{
          color: "#8892a4", fontSize: "11px",
          fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>✉️ Cover Letter</h3>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.05)",
            border: copied ? "1px solid rgba(0,255,136,0.3)" : "1px solid #1e2d3d",
            color: copied ? "#00ff88" : "#8892a4",
            padding: "6px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "12px",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
      <p style={{
        color: "#c9d1d9",
        fontSize: "13px",
        lineHeight: 1.8,
        whiteSpace: "pre-wrap",
      }}>{text}</p>
    </div>
  );
}