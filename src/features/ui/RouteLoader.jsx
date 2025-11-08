import React from "react";
import { Alert, Spin } from "antd";

const containerStyle = {
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
};

const RouteLoader = ({ label, error }) => {
  if (error) {
    return (
      <div style={containerStyle}>
        <Alert
          type="error"
          message={`Unable to load ${label}`}
          description={error.message || String(error)}
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Spin size="large" />
      <span style={{ color: "#888" }}>Loading {label}…</span>
    </div>
  );
};

export default RouteLoader;
