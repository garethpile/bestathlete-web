import React, { useState, useEffect, useRef } from "react";
import { Badge, Card, Tooltip, Modal } from "antd";
import dayjs from "dayjs";
import { EnvironmentOutlined, FireOutlined, ThunderboltOutlined, HeartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faBicycle, faRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const getColorByWorkoutType = (type) => {
  const typeLower = (type || "").toLowerCase();
  if (typeLower.includes("run")) return "#8B0000"; // Dark red
  if (typeLower.includes("swim")) return "#00008B"; // Dark blue
  if (typeLower.includes("ride") || typeLower.includes("bike")) return "#006400"; // Dark green
  if (typeLower.includes("strength") || typeLower.includes("weight")) return "#000000"; // Black
  return "gray";
};

const getPhaseForDate = (date, aRace) => {
  const phases = [
    { name: "Prep", start: aRace.EventPrepStart, end: aRace.EventPrepEnd, color: "#d0ebff" },
    { name: "Base", start: aRace.EventBaseStart, end: aRace.EventBaseEnd, color: "#b2f2bb" },
    { name: "Build", start: aRace.EventBuildStart, end: aRace.EventBuildEnd, color: "#ffe066" },
    { name: "Peak", start: aRace.EventPeakStart, end: aRace.EventPeakEnd, color: "#ffa94d" },
    { name: "Taper", start: aRace.EventTaperStart, end: aRace.EventTaperEnd, color: "#f783ac" },
  ];
  for (const phase of phases) {
    if (
      dayjs(date).isSameOrAfter(dayjs(phase.start), "day") &&
      dayjs(date).isSameOrBefore(dayjs(phase.end), "day")
    ) {
      return phase;
    }
  }
  return null;
};

const Calendar = ({ workouts = [], customer , events = [], customerAvailabilities }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [availabilities, setAvailabilities] = useState(Array.isArray(customerAvailabilities) ? customerAvailabilities : []);
  const dayRefs = useRef([]);

  useEffect(() => {
    setAvailabilities(Array.isArray(customerAvailabilities) ? customerAvailabilities : []);
  }, [customerAvailabilities]);

  // Log workouts after component starts
  console.log("Workouts:", workouts);

  // Create a lookup of dates to workouts
  const workoutMap = workouts.reduce((acc, workout) => {
    if (!workout.WorkoutDateTime) return acc;
    const date = dayjs(workout.WorkoutDateTime).startOf("day").format("YYYY-MM-DD");
    acc[date] = acc[date] || [];
    acc[date].push(workout);
    return acc;
  }, {});

  const aRace = events.find((e) => e.EventPriority === "A");

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const listData = workoutMap[dateKey] || [];

    const phase = aRace ? getPhaseForDate(value, aRace) : null;
    const availability = availabilities.find((entry) =>
      dayjs(value).isSameOrAfter(dayjs(entry.UnavailableStartDate), "day") &&
      dayjs(value).isSameOrBefore(dayjs(entry.UnavailableEndDate), "day")
    );
    const isToday = dayjs().isSame(value, "day");

    return (
      <div style={isToday ? { backgroundColor: "#fff9db", padding: "4px", borderRadius: "4px" } : {}}>
        {phase && (
          <div
            style={{
              backgroundColor: phase.color,
              color: "#000",
              padding: "2px 4px",
              fontSize: "10px",
              textAlign: "center",
              borderRadius: "2px",
              marginBottom: "4px"
            }}
          >
            {phase.name}
          </div>
        )}
        {availability && (
          <div
            style={{
              backgroundColor: "#ff6b6b",
              color: "#fff",
              padding: "2px 4px",
              fontSize: "10px",
              textAlign: "center",
              borderRadius: "2px",
              marginBottom: "4px"
            }}
          >
            {availability.UnavailableReason}
          </div>
        )}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {listData.length === 0 ? (
            <li style={{ fontSize: 12, color: "#999" }}>No Workouts</li>
          ) : (
            listData.map((item, index) => {
              const timeStr = item.WorkoutDateTime ? dayjs(item.WorkoutDateTime).format("HH:mm") : "N/A";
              const durationStr = item.WorkoutMovingTime ? `${Math.round(item.WorkoutMovingTime / 60)} min` : "N/A";

              const renderIcon = () => {
                const type = (item.WorkoutType || "").toLowerCase();
                if (type.includes("swim")) return <FontAwesomeIcon icon={faWater} style={{ marginRight: 4 }} />;
                if (type.includes("ride") || type.includes("bike")) return <FontAwesomeIcon icon={faBicycle} style={{ marginRight: 4 }} />;
                if (type.includes("strength") || type.includes("weight")) return <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: 4 }} />;
                if (type.includes("run")) return <FontAwesomeIcon icon={faRunning} style={{ marginRight: 4 }} />;
                return null;
              };

              return (
                <li key={index}>
                  <div style={{ backgroundColor: "#e6f4ea", border: "1px solid #e0e0e0", padding: "4px", borderRadius: "4px", marginBottom: "4px" }}>
                    <Tooltip title={item.WorkoutDescription || "No description"}>
                      <span onClick={() => setSelectedWorkout(item)} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {renderIcon()}
                          <strong>{item.WorkoutType || "Workout"}</strong>
                        </div>
                        <span>{item.WorkoutDistance ? (item.WorkoutDistance / 1000).toFixed(2) : "0.00"} km</span>
                        <span>
                          {item.WorkoutMovingTime
                            ? `${String(Math.floor(item.WorkoutMovingTime / 3600)).padStart(2, "0")}:${String(Math.floor((item.WorkoutMovingTime % 3600) / 60)).padStart(2, "0")}`
                            : "00:00"}
                        </span>
                      </span>
                    </Tooltip>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  };

  // Selected date state for horizontal date selector
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Toggle state for month grid
  const [showMonthGrid, setShowMonthGrid] = useState(true);

  return (
    <Card className="maincardDiv">
      {/* Sticky header with title, controls, and calendar grid */}
      <div
        style={{
          position: "sticky",
          top: 56,
          zIndex: 2,
          backgroundColor: "#fff",
          paddingBottom: "8px",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        <h2 style={{ color: "crimson", textAlign: "center", margin: "12px 0" }}>Workout Calendar</h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 16px 8px 16px" }}>
          <button
            onClick={() => setShowMonthGrid(!showMonthGrid)}
            style={{
              fontSize: "16px",
              padding: "2px 6px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
              cursor: "pointer"
            }}
          >
            {showMonthGrid ? "▲" : "▼"}
          </button>
          <input
            type="month"
            value={selectedDate.format("YYYY-MM")}
            onChange={(e) => {
              const newDate = dayjs(e.target.value);
              setSelectedDate(newDate);
            }}
            style={{
              fontSize: "14px",
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        {showMonthGrid && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "0", marginBottom: "8px" }}>
            {Array.from({ length: 35 }, (_, i) => {
              const startOfCalendar = dayjs().startOf("month").startOf("week");
              const date = startOfCalendar.add(i, "day");
              const isSelected = date.isSame(selectedDate, "day");
              const isToday = date.isSame(dayjs(), "day");
              const isCurrentMonth = date.month() === dayjs().month();

              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedDate(date);
                    const scrollIndex = i;
                    setTimeout(() => {
                      if (dayRefs.current[scrollIndex]) {
                        dayRefs.current[scrollIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 0);
                  }}
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    height: "34px",
                    lineHeight: "34px",
                    borderRadius: "18px",
                    fontWeight: isToday ? "bold" : "normal",
                    backgroundColor: isSelected ? "#e6f7ff" : "transparent",
                    color: isCurrentMonth ? "#000" : "#ccc",
                    border: isSelected ? "2px solid #1890ff" : "none",
                    cursor: "pointer"
                  }}
                >
                  {date.format("D")}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Scrollable multi-day detail */}
      <div style={{ height: "60vh", overflowY: "auto", paddingBottom: "12px" }}>
        {Array.from({ length: 28 }, (_, i) => {
          const date = dayjs().startOf("week").subtract(7, "day").add(i, "day");
          return (
            <div
              key={date.format("YYYY-MM-DD")}
              ref={(el) => (dayRefs.current[i] = el)}
              style={{
                backgroundColor: date.isSame(selectedDate, "day") ? "#fff9db" : "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "8px",
                padding: "8px"
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>
                {date.format("dddd, MMMM D, YYYY")}
              </div>
              {dateCellRender(date)}
            </div>
          );
        })}
      </div>
      <Modal
        title={
          selectedWorkout ? (
            <>
              <div>
                {(() => {
                  const type = (selectedWorkout.WorkoutType || "").toLowerCase();
                  if (type.includes("swim")) return <FontAwesomeIcon icon={faWater} style={{ marginRight: 8 }} />;
                  if (type.includes("ride") || type.includes("bike")) return <FontAwesomeIcon icon={faBicycle} style={{ marginRight: 8 }} />;
                  if (type.includes("strength") || type.includes("weight")) return <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: 8 }} />;
                  if (type.includes("run")) return <FontAwesomeIcon icon={faRunning} style={{ marginRight: 8 }} />;
                  return null;
                })()}
                {selectedWorkout.WorkoutDescription || ""}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {dayjs(selectedWorkout.WorkoutDateTime).format("YYYY-MM-DD")}
              </div>
            </>
          ) : "Workout Details"
        }
        open={!!selectedWorkout}
        onCancel={() => setSelectedWorkout(null)}
        footer={null}
      >
        {selectedWorkout && (
          <div>
            <p><strong>Distance:</strong> {selectedWorkout.WorkoutDistance ? `${(selectedWorkout.WorkoutDistance / 1000).toFixed(2)} km` : "N/A"}</p>
            <p><strong>Duration:</strong> {selectedWorkout.WorkoutMovingTime ? `${Math.round(selectedWorkout.WorkoutMovingTime / 60)} min` : "N/A"}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default Calendar;