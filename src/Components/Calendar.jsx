import React, { useState, useEffect } from "react";
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

  return (
    <Card className="maincardDiv">
      <h2 style={{ color: "crimson", textAlign: "center", marginBottom: 20 }}>Workout Calendar</h2>
      {/* Horizontal scrollable date selector */}
      <div style={{ display: "flex", overflowX: "auto", paddingBottom: "10px", marginBottom: "10px" }}>
        {Array.from({ length: 28 }, (_, i) => {
          const date = dayjs().startOf("week").subtract(7, "day").add(i, "day");
          const isSelected = date.isSame(selectedDate, "day");
          return (
            <div
              key={i}
              onClick={() => setSelectedDate(date)}
              style={{
                minWidth: "60px",
                textAlign: "center",
                padding: "8px",
                marginRight: "6px",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: isSelected ? "#ffec99" : "#f0f0f0",
                border: isSelected ? "2px solid #ffa500" : "1px solid #ccc"
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>{date.format("ddd")}</div>
              <div style={{ fontSize: "14px" }}>{date.format("D")}</div>
            </div>
          );
        })}
      </div>
      {/* Scrollable multi-day detail */}
      <div style={{ height: "60vh", overflowY: "auto", paddingBottom: "12px" }}>
        {Array.from({ length: 28 }, (_, i) => {
          const date = dayjs().startOf("week").subtract(7, "day").add(i, "day");
          return (
            <div
              key={date.format("YYYY-MM-DD")}
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