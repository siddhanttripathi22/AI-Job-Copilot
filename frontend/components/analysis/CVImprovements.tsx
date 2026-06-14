import { ResumeAnalysis } from "@/types";

export default function CVImprovements({ data }: { data: ResumeAnalysis }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div style={{
        background: "rgba(13,17,23,0.8)",
        border: "1px solid #1e2d3d",
        borderRadius: "16px",
        padding: "20px",
      }}>
        <h3 style={{
          color: "#8892a4", fontSize: "11px",
          fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "12px",
        }}>💡 CV Improvements</h3>
        {data.improvements?.map((tip) => (
          <p key={tip} style={{
            color: "#ffcc00", fontSize: "13px",
            marginBottom: "8px", lineHeight: 1.5,
          }}>• {tip}</p>
        ))}
      </div>

      <div style={{
        background: "rgba(13,17,23,0.8)",
        border: "1px solid #1e2d3d",
        borderRadius: "16px",
        padding: "20px",
      }}>
        <h3 style={{
          color: "#8892a4", fontSize: "11px",
          fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "12px",
        }}>💪 Your Strengths</h3>
        {data.strengths?.map((s) => (
          <p key={s} style={{
            color: "#00ff88", fontSize: "13px",
            marginBottom: "8px", lineHeight: 1.5,
          }}>• {s}</p>
        ))}
      </div>
    </div>
  );
}