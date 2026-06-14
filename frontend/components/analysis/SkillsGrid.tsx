import { JDMatch } from "@/types";

export default function SkillsGrid({ data }: { data: JDMatch }) {
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
        }}>✅ You Have</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {data.matching_skills?.map((s) => (
            <span key={s} style={{
              background: "rgba(0,255,136,0.1)",
              color: "#00ff88",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "12px",
            }}>{s}</span>
          ))}
        </div>
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
        }}>❌ You Need</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {data.missing_skills?.map((s) => (
            <span key={s} style={{
              background: "rgba(255,68,102,0.1)",
              color: "#ff4466",
              border: "1px solid rgba(255,68,102,0.2)",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "12px",
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}