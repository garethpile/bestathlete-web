import React from "react";
import dayjs from "dayjs";

const CalendarMonthGrid = ({
  isMobile,
  selectedDate,
  onSelectDate,
  dateCellRender,
  activeRace,
  getPhaseForDate,
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
}) => {
  const today = dayjs();
  const currentWeekStart = today.startOf("week").add(1, "day");
  const startOfMonth = currentWeekStart.subtract(7, "day");

  return (
    <div className="month-grid">
      {Array.from({ length: 4 }, (_, weekIndex) => (
        <div
          key={weekIndex}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: "8px",
            gap: "4px",
          }}
        >
          {Array.from({ length: 7 }, (_, dayOffset) => {
            const date = dayjs(startOfMonth).add(weekIndex * 7 + dayOffset, "day");
            const phase = activeRace ? getPhaseForDate(date, activeRace) : null;
            return (
              <div
                key={dayOffset}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "4px",
                  background:
                    selectedDate.isSame(date, "day") ? "#fff9db" : "#ffffff",
                  cursor: "pointer",
                }}
                onClick={() => onSelectDate(date)}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  <span>{date.format("ddd D MMM")}</span>
                  {phase ? (
                    <span
                      style={{
                        fontSize: "11px",
                        background: phase.color,
                        color: "#333",
                        borderRadius: "8px",
                        padding: "2px 6px",
                        marginLeft: "4px",
                        fontWeight: 500,
                        letterSpacing: "0.2px",
                      }}
                    >
                      {phase.name}
                    </span>
                  ) : null}
                </div>
                <div style={{ width: "100%" }}>{dateCellRender(date)}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarMonthGrid;
