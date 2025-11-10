import React from "react";

const tableCellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

const headerCellStyle = {
  ...tableCellStyle,
  backgroundColor: "#d0e8ff",
};

const formatDistance = (value) =>
  Number.isFinite(value) ? value.toFixed(1) : "0.0";

const AthleteSummary = ({ summary, formatHoursMinutes, rangeLabel = "Last 7 Days", windowStats }) => {
  const sessionCounts = summary?.sessionCounts || {};
  const disciplineHours = summary?.disciplineHours || {};
  const disciplineDistance = summary?.disciplineDistance || {};
  const heading = `${rangeLabel} Summary`;

  const totalSessions =
    (sessionCounts.Swim || 0) +
    (sessionCounts.Bike || 0) +
    (sessionCounts.Run || 0) +
    (sessionCounts.Strength || 0);

  const totalHours =
    (disciplineHours.Swim || 0) +
    (disciplineHours.Bike || 0) +
    (disciplineHours.Run || 0) +
    (disciplineHours.Strength || 0);

  const totalDistance =
    (disciplineDistance.Swim || 0) +
    (disciplineDistance.Bike || 0) +
    (disciplineDistance.Run || 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <h3 style={{ marginTop: 16, marginBottom: 8, textAlign: "center" }}>{heading}</h3>
      <div style={{ overflowX: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "650px", textAlign: "center" }}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Swim</th>
              <th style={headerCellStyle}>Bike</th>
              <th style={headerCellStyle}>Run</th>
              <th style={headerCellStyle}>Strength</th>
              <th style={headerCellStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}>{(sessionCounts.Swim || 0)} sessions</td>
              <td style={tableCellStyle}>{(sessionCounts.Bike || 0)} sessions</td>
              <td style={tableCellStyle}>{(sessionCounts.Run || 0)} sessions</td>
              <td style={tableCellStyle}>{(sessionCounts.Strength || 0)} sessions</td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>{totalSessions} sessions</td>
            </tr>
            <tr>
              <td style={tableCellStyle}>{formatHoursMinutes(disciplineHours.Swim)}</td>
              <td style={tableCellStyle}>{formatHoursMinutes(disciplineHours.Bike)}</td>
              <td style={tableCellStyle}>{formatHoursMinutes(disciplineHours.Run)}</td>
              <td style={tableCellStyle}>{formatHoursMinutes(disciplineHours.Strength)}</td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>{formatHoursMinutes(totalHours)}</td>
            </tr>
            <tr>
              <td style={tableCellStyle}>{formatDistance(disciplineDistance.Swim)} km</td>
              <td style={tableCellStyle}>{formatDistance(disciplineDistance.Bike)} km</td>
              <td style={tableCellStyle}>{formatDistance(disciplineDistance.Run)} km</td>
              <td style={tableCellStyle}>–</td>
              <td style={{ ...tableCellStyle, fontWeight: "bold" }}>{formatDistance(totalDistance)} km</td>
            </tr>
          </tbody>
        </table>
      </div>
      {windowStats && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "12px" }}>
          <span><strong>Total TSS:</strong> {windowStats.totalTss || 0}</span>
          <span><strong>Longest Swim:</strong> {formatDistance(windowStats.longest?.Swim)} km</span>
          <span><strong>Longest Bike:</strong> {formatDistance(windowStats.longest?.Bike)} km</span>
          <span><strong>Longest Run:</strong> {formatDistance(windowStats.longest?.Run)} km</span>
        </div>
      )}
    </div>
  );
};

export default AthleteSummary;
