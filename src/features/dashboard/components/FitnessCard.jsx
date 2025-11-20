import React from "react";

const formatNumber = (value, decimals = 1, suffix = "") => {
  if (value === null || value === undefined) return "–";
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(decimals)}${suffix}` : "–";
};

const formatMinutes = (seconds) => {
  if (seconds === null || seconds === undefined) return "–";
  const mins = Number(seconds) / 60;
  if (!Number.isFinite(mins)) return "–";
  return mins >= 90 ? `${(mins / 60).toFixed(1)} h` : `${Math.round(mins)} min`;
};

const WindowStat = ({ label, data, accent }) => {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 160,
        background: "#ffffff",
        borderRadius: 14,
        padding: 12,
        boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
        border: `1px solid ${accent}`,
        display: "grid",
        gap: 6,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: 0.3 }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>Sessions</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
          {data?.Sessions || 0}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>Avg distance</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
          {formatNumber(data?.AvgDistance, 1, " km")}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>Avg time</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
          {formatMinutes(data?.AvgMovingTime)}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>Avg HR</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
          {formatNumber(data?.AvgHeartRate, 0, " bpm")}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>Avg RPE</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
          {formatNumber(data?.AvgRPE, 1)}
        </div>
      </div>
    </div>
  );
};

const FitnessCard = ({ rollingAverages }) => {
  const summaryDate = rollingAverages?.LastUpdatedAt
    ? new Date(rollingAverages.LastUpdatedAt).toLocaleString()
    : null;

  const windows = [
    { key: "Window30Days", label: "Last 30 days", accent: "rgba(14,165,233,0.25)" },
    { key: "Window60Days", label: "Last 60 days", accent: "rgba(14,165,233,0.18)" },
    { key: "Window90Days", label: "Last 90 days", accent: "rgba(14,165,233,0.12)" },
  ];

  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        borderRadius: 18,
        border: "1px solid rgba(24,144,255,0.2)",
        background: "linear-gradient(135deg, #e0f2ff 0%, #f5f8ff 100%)",
        padding: 16,
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>
          Fitness
        </div>
        <div style={{ fontSize: 11, color: "#475569" }}>
          {summaryDate ? `Updated ${summaryDate}` : "Awaiting workouts"}
        </div>
      </div>

      {!rollingAverages ? (
        <div
          style={{
            height: 140,
            borderRadius: 14,
            border: "1px dashed rgba(37,99,235,0.5)",
            background: "rgba(255,255,255,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: "#64748b",
          }}
        >
          Rolling averages will appear after your next workout sync.
        </div>
      ) : (
        <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
          {windows.map((window) => (
            <WindowStat
              key={window.key}
              label={window.label}
              data={rollingAverages?.[window.key]}
              accent={window.accent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FitnessCard;
