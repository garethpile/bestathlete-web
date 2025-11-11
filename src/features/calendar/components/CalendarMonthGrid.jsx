import React, { useRef } from "react";
import dayjs from "dayjs";
import { Switch, Tooltip } from "antd";

const CalendarMonthGrid = ({
  isMobile,
  selectedDate,
  onSelectDate,
  dateCellRender,
  activeRace,
  getPhaseForDate,
  getWeekSummary,
  getTrainState,
  onTrainToggle,
}) => {
  return isMobile ? (
    <MobileDayDetail
      selectedDate={selectedDate}
      dateCellRender={dateCellRender}
      onSelectDate={onSelectDate}
      getTrainState={getTrainState}
      onTrainToggle={onTrainToggle}
      activeRace={activeRace}
      getPhaseForDate={getPhaseForDate}
    />
  ) : (
    <DesktopMonthGrid
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      dateCellRender={dateCellRender}
      activeRace={activeRace}
      getPhaseForDate={getPhaseForDate}
      getWeekSummary={getWeekSummary}
      getTrainState={getTrainState}
      onTrainToggle={onTrainToggle}
    />
  );
};

const SWIPE_THRESHOLD = 40;

const MobileDayDetail = ({ selectedDate, dateCellRender, onSelectDate, getTrainState, onTrainToggle, activeRace, getPhaseForDate }) => {
  const touchRef = useRef({ x: 0, y: 0, active: false });

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY, active: true };
  };

  const handleTouchEnd = (event) => {
    if (!touchRef.current.active || typeof onSelectDate !== "function") {
      touchRef.current.active = false;
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.x;
    const deltaY = touch.clientY - touchRef.current.y;
    touchRef.current.active = false;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    const nextDate = deltaX < 0 ? selectedDate.add(1, "day") : selectedDate.subtract(1, "day");
    onSelectDate(nextDate);
  };

  const phase = activeRace ? getPhaseForDate(selectedDate, activeRace) : null;
  const phaseLetter = phase?.name?.[0]?.toUpperCase() || "•";

  return (
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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchRef.current.active = false;
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
            gap: 6,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 13 }}>{selectedDate.format("ddd D MMM")}</span>
          <Tooltip title={phase?.name || "Training phase"}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "999px",
                background: phase?.color || "#c7d2fe",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {phaseLetter}
            </div>
          </Tooltip>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Train</span>
            <Switch
              size="small"
              checked={getTrainState(selectedDate)}
              onChange={(checked) => onTrainToggle(selectedDate, checked)}
            />
          </div>
        </div>
        {dateCellRender(selectedDate)}
        <div style={{ fontSize: "11px", textAlign: "center", marginTop: "6px", color: "#666" }}>
          Swipe to move between days
        </div>
      </div>
    </div>
  );
};

const DesktopMonthGrid = ({
  selectedDate,
  onSelectDate,
  dateCellRender,
  activeRace,
  getPhaseForDate,
  getWeekSummary,
  getTrainState,
  onTrainToggle,
}) => {
  const today = dayjs();
  const baseDate = dayjs(selectedDate);
  const monthStart = baseDate.startOf("month");
  const startOfGrid = monthStart.startOf("week").add(1, "day");
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
            dayjs(startOfGrid).add(weekIndex * 7 + dayOffset, "day")
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
                const phaseLetter = phase?.name?.[0]?.toUpperCase() || "•";
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
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 11,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {date.format("ddd D MMM")}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Tooltip title={phase?.name || "Training phase"}>
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: "999px",
                              background: phase?.color || "#c7d2fe",
                              color: "#0f172a",
                              fontWeight: 700,
                              fontSize: 9,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {phaseLetter}
                          </div>
                        </Tooltip>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>Train</span>
                        <Switch
                          size="small"
                          checked={getTrainState(date)}
                          onChange={(checked) => onTrainToggle(date, checked)}
                        />
                      </div>
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
