import React from "react";

const FitnessCard = () => (
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
    <div style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", marginBottom: 8 }}>
      Fitness
    </div>
    <div
      style={{
        height: 120,
        borderRadius: 14,
        border: "1px dashed rgba(37,99,235,0.5)",
        background: "rgba(255,255,255,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        color: "#64748b",
      }}
    >
      Metrics coming soon
    </div>
  </div>
);

export default FitnessCard;
