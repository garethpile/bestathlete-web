import React from "react";

const formatNumber = (value, decimals = 1) => {
  if (value === null || value === undefined) return "–";
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(decimals) : "–";
};

const formatTime = (seconds) => {
  if (seconds === null || seconds === undefined) return "–";
  const minutes = Number(seconds) / 60;
  if (!Number.isFinite(minutes)) return "–";
  return minutes >= 90
    ? `${(minutes / 60).toFixed(1)} h`
    : `${Math.round(minutes)} min`;
};

const MetricChip = ({ label, value, accent = "#0f172a" }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(255,255,255,0.76)",
      borderRadius: 12,
      padding: "8px 12px",
      border: "1px solid rgba(15,23,42,0.08)",
      boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
    }}
  >
    <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 700, color: accent }}>{value}</span>
  </div>
);

const WindowCard = ({ label, data, accent }) => {
  const metrics = [
    { key: "Sessions", label: "Sessions", formatter: (v) => (v ? `${v}` : "0") },
    { key: "AvgDistance", label: "Avg distance", formatter: (v) => formatNumber(v) },
    { key: "AvgMovingTime", label: "Avg moving time", formatter: formatTime },
    { key: "AvgHeartRate", label: "Avg HR", formatter: (v) => `${formatNumber(v)} bpm` },
    { key: "AvgStressScore", label: "Avg stress", formatter: formatNumber },
    { key: "AvgCalories", label: "Avg calories", formatter: (v) => formatNumber(v, 0) },
    { key: "AvgRPE", label: "Avg RPE", formatter: formatNumber },
  ];

  return (
    <div
      style={{
        flex: 1,
        minWidth: 220,
        background: `linear-gradient(135deg, ${accent} 0%, rgba(15,23,42,0.9) 100%)`,
        color: "#0f172a",
        borderRadius: 18,
        padding: 16,
        boxShadow: "0 20px 45px rgba(15,23,42,0.18)",
      }}
    >
      <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 700, letterSpacing: 0.4 }}>
        {label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginTop: 10 }}>
        {metrics.map((metric) => (
          <MetricChip
            key={metric.key}
            label={metric.label}
            value={metric.formatter(data?.[metric.key])}
            accent="#0f172a"
          />
        ))}
      </div>
    </div>
  );
};

const RollingAverageSummary = ({ rollingAverages }) => {
  const windows = [
    { key: "Window30Days", label: "Last 30 days", accent: "#67e8f9" },
    { key: "Window60Days", label: "Last 60 days", accent: "#a5b4fc" },
    { key: "Window90Days", label: "Last 90 days", accent: "#c7d2fe" },
  ];

  const summaryDate = rollingAverages?.LastUpdatedAt
    ? new Date(rollingAverages.LastUpdatedAt).toLocaleString()
    : null;

  return (
    <div
      style={{
        borderRadius: 24,
        background: "linear-gradient(120deg, #0ea5e9 0%, #22d3ee 40%, #0f172a 100%)",
        padding: 20,
        boxShadow: "0 28px 80px rgba(14,165,233,0.25)",
        color: "#0f172a",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.6, color: "#0f172a" }}>
            Rolling training averages
          </div>
          <div style={{ fontSize: 12, color: "#0f172a" }}>
            Live view of the past 30/60/90 days for the coach agent
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#0f172a", fontWeight: 700 }}>
          {summaryDate ? `Updated ${summaryDate}` : "Awaiting workout data"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {windows.map((window) => (
          <WindowCard
            key={window.key}
            label={window.label}
            data={rollingAverages?.[window.key]}
            accent={window.accent}
          />
        ))}
      </div>
    </div>
  );
};

export default RollingAverageSummary;
