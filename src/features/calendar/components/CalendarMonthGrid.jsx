import React from "react";
import dayjs from "dayjs";

const CalendarMonthGrid = ({
  isMobile,
  selectedDate,
  onSelectDate,
  dateCellRender,
  activeRace,
  getPhaseForDate,
  getWeekSummary,
}) => {
  return isMobile ? (
    <MobileDayDetail
      selectedDate={selectedDate}
      dateCellRender={dateCellRender}
    />
  ) : (
    <DesktopMonthGrid
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      dateCellRender={dateCellRender}
      activeRace={activeRace}
      getPhaseForDate={getPhaseForDate}
      getWeekSummary={getWeekSummary}
    />
  );
};

const MobileDayDetail = ({ selectedDate, dateCellRender }) => (
  <div className="scrollable-detail">
    <div
      key={selectedDate.format("YYYY-MM-DD")}
      style={{
        backgroundColor: "#fff9db",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "8px",
        padding: "8px",
      }}
    >
      <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>
        {selectedDate.format("dddd, MMMM D, YYYY")}
      </div>
      {dateCellRender(selectedDate)}
    </div>
  </div>
);

const DesktopMonthGrid = ({
  selectedDate,
  onSelectDate,
  dateCellRender,
  activeRace,
  getPhaseForDate,
  getWeekSummary,
}) => {
  const today = dayjs();
  const currentWeekStart = today.startOf("week").add(1, "day");
  const startOfMonth = currentWeekStart.subtract(7, "day");
  const disciplines = ["Swim", "Bike", "Run", "Strength"];
  const emptySummary = {
    planned: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
    completed: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
  };

  const formatHours = (hours) => {
    if (!Number.isFinite(hours) || hours <= 0) return "0h";
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div
      className="month-grid"
      style={{
        overflowX: "auto",
        backgroundColor: "#f5f6fb",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div style={{ minWidth: 1320 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(150px, 1fr)) minmax(220px, 1fr)",
            gap: "8px",
            marginBottom: "12px",
            fontWeight: "600",
            textAlign: "center",
            color: "#0f172a",
          }}
        >
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              style={{
                padding: "6px",
                borderRadius: "10px",
                background: "#e3edff",
                border: "1px solid #c7d6ff",
              }}
            >
              {day}
            </div>
          ))}
          <div
            style={{
              padding: "6px",
              borderRadius: "10px",
              background: "#dbeafe",
              border: "1px solid #bfd7ff",
            }}
          >
            Summary
          </div>
        </div>
        {Array.from({ length: 4 }, (_, weekIndex) => {
          const weekDays = Array.from({ length: 7 }, (_, dayOffset) =>
            dayjs(startOfMonth).add(weekIndex * 7 + dayOffset, "day")
          );
          const summaryRaw = getWeekSummary(weekDays[0]);
          const summaryData = summaryRaw || emptySummary;
          const hasSummaryData = Boolean(summaryRaw);

          return (
            <div
              key={weekIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(150px, 1fr)) minmax(220px, 1fr)",
                marginBottom: "8px",
                gap: "4px",
              }}
            >
              {weekDays.map((date, dayOffset) => {
                const phase = activeRace ? getPhaseForDate(date, activeRace) : null;
                return (
                  <div
                    key={dayOffset}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      border: "1px solid #e1e7f5",
                      borderRadius: "14px",
                      padding: "6px",
                      background:
                        selectedDate.isSame(date, "day") ? "#eef4ff" : "#ffffff",
                      cursor: "pointer",
                      minHeight: 180,
                      boxShadow: "0 10px 18px rgba(15, 23, 42, 0.08)",
                    }}
                    onClick={() => onSelectDate(date)}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#111827",
                      }}
                    >
                      <span>{date.format("D MMM")}</span>
                      {phase ? (
                        <div
                          style={{
                            fontSize: "11px",
                            background: phase.color || "#dbeafe",
                            color: "#0f172a",
                            borderRadius: "999px",
                            padding: "2px 10px",
                            fontWeight: 500,
                            letterSpacing: "0.2px",
                          }}
                        >
                          {phase.name}
                        </div>
                      ) : (
                        <span />
                      )}
                    </div>
                    <div style={{ width: "100%" }}>{dateCellRender(date)}</div>
                  </div>
                );
              })}
              <div
                style={{
                  border: "1px solid #e1e7f5",
                  borderRadius: "14px",
                  padding: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 10px 18px rgba(15, 23, 42, 0.08)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                    color: "#111827",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", paddingBottom: 4 }}></th>
                      <th style={{ textAlign: "right", paddingBottom: 4 }}>Planned</th>
                      <th style={{ textAlign: "right", paddingBottom: 4 }}>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Total", ...disciplines].map((discipline) => {
                      const plannedValue =
                        discipline === "Total"
                          ? disciplines.reduce(
                              (sum, d) => sum + (summaryData.planned[d] || 0),
                              0
                            )
                          : summaryData.planned[discipline] || 0;
                      const completedValue =
                        discipline === "Total"
                          ? disciplines.reduce(
                              (sum, d) => sum + (summaryData.completed[d] || 0),
                              0
                            )
                          : summaryData.completed[discipline] || 0;
                      return (
                        <tr key={`summary-${discipline}`}>
                          <td style={{ padding: "2px 0" }}>{discipline}</td>
                          <td style={{ textAlign: "right", padding: "2px 0" }}>
                            {formatHours(plannedValue)}
                          </td>
                          <td style={{ textAlign: "right", padding: "2px 0" }}>
                            {formatHours(completedValue)}
                          </td>
                        </tr>
                      );
                    })}
                    {!hasSummaryData && (
                      <tr>
                        <td colSpan={3} style={{ paddingTop: 6, color: "#94a3b8", fontSize: 11 }}>
                          No workouts logged
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonthGrid;
