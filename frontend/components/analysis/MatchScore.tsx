import { JDMatch } from "@/types";

export default function MatchScore({ data }: { data: JDMatch }) {
  const score = data.match_score;
  const color = score >= 75 ? "#00ff88" : score >= 50 ? "#ffcc00" : "#ff4466";

  return (
    <div style={{
      background: "rgba(13,17,23,0.8)",
      border: "1px solid #1e2d3d",
      borderRadius: "20px",
      padding: "24px",
      display: "flex",
      alignItems: "center",
      gap: "24px",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{
        width: "80px", height: "80px",
        borderRadius: "50%",
        border: `3px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 0 20px ${color}33`,
        background: `${color}11`,
      }}>
        <span style={{ fontSize: "22px", fontWeight: 800, color }}>
          {score}%
        </span>
      </div>
      <div>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "20px" }}>
          {data.verdict}
        </p>
        <p style={{ color: "#8892a4", fontSize: "13px", marginTop: "4px" }}>
          Based on your resume vs this job description
        </p>
      </div>
    </div>
  );
}