import React from "react";
import dayjs from "dayjs";

const CalendarHeaderControls = ({
  selectedDate,
  onChangeDate,
  isMobile,
  activeRace,
  getPhaseForDate,
}) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 56,
        zIndex: 2,
        backgroundColor: "#fff",
        paddingBottom: "8px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 16px 8px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => onChangeDate(selectedDate.subtract(1, "month"))}
            style={{
              fontSize: "16px",
              padding: "2px 6px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }}
            aria-label="Previous month"
          >
            ↑
          </button>
          <button
            onClick={() => onChangeDate(selectedDate.add(1, "month"))}
            style={{
              fontSize: "16px",
              padding: "2px 6px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }}
            aria-label="Next month"
          >
            ↓
          </button>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{selectedDate.format("MMMM YYYY")}</span>
        </div>
      </div>
      {isMobile && (
        <MobileWeekOverview
          selectedDate={selectedDate}
          onChangeDate={onChangeDate}
          activeRace={activeRace}
          getPhaseForDate={getPhaseForDate}
        />
      )}
    </div>
  );
};

const MobileWeekOverview = ({
  selectedDate,
  onChangeDate,
  activeRace,
  getPhaseForDate,
}) => {
  const startOfWeek = selectedDate.startOf("week").add(1, "day");
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  return (
    <div style={{ width: "100%", marginBottom: "8px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "6px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {daysOfWeek.map((day, idx) => {
          const date = weekDays[idx];
          const phase = activeRace ? getPhaseForDate(date, activeRace) : null;
          return (
            <div
              key={day}
              style={{
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{day}</span>
              {phase && (
                <span
                  style={{
                    fontSize: "11px",
                    background: phase.color,
                    color: "#333",
                    borderRadius: "8px",
                    padding: "2px 8px",
                    marginTop: "3px",
                    minWidth: "38px",
                    textAlign: "center",
                    fontWeight: 500,
                    letterSpacing: "0.2px",
                  }}
                >
                  {phase.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {weekDays.map((date, i) => {
          const isSelected = date.isSame(selectedDate, "day");
          const isToday = date.isSame(dayjs(), "day");
          return (
            <div
              key={i}
              onClick={() => onChangeDate(date)}
              style={{
                textAlign: "center",
                fontSize: "17px",
                fontWeight: isToday ? "bold" : "normal",
                borderRadius: "18px",
                backgroundColor: isSelected ? "#e6f7ff" : "transparent",
                border: isSelected ? "2px solid #1890ff" : "none",
                color: "#222",
                padding: "7px",
                margin: "2px",
                cursor: "pointer",
                transition: "background .15s",
              }}
            >
              {date.format("D")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHeaderControls;
