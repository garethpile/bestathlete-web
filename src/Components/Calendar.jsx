import React, { useState, useEffect, useRef } from "react";
import { Badge, Card, Tooltip, Modal } from "antd";
import dayjs from "dayjs";
import { EnvironmentOutlined, FireOutlined, ThunderboltOutlined, HeartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faBicycle, faRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import WorkoutNoFeedbackCard from "./WorkoutNoFeedbackCard.jsx";

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

const Calendar = ({ workouts = [], customer, events = [], customerAvailabilities }) => {
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
    const isMobile = window.innerWidth <= 768;
    const listData =
      isMobile && !value.isSame(selectedDate, "day")
        ? []
        : workoutMap[dateKey] || [];

    // Removed phase rendering from here as per instructions

    const availability = availabilities.find((entry) =>
      dayjs(value).isSameOrAfter(dayjs(entry.UnavailableStartDate), "day") &&
      dayjs(value).isSameOrBefore(dayjs(entry.UnavailableEndDate), "day")
    );
    const isToday = dayjs().isSame(value, "day");

    // Only render content for the selected day on mobile (narrow) screens
    if (isMobile && !value.isSame(selectedDate, "day")) {
      return null;
    }

    return (
      <div style={isToday ? { backgroundColor: "#fff9db", padding: "4px", borderRadius: "4px" } : {}}>
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
                      <span
                        onClick={() => setSelectedWorkout(item)}
                        className="workout-content"
                        style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {renderIcon()}
                          <span
                            className="workout-hide-on-narrow"
                            style={{ fontSize: "11px", fontWeight: "bold" }}
                          >
                            {(item.WorkoutType === "WeightTraining") ? "Strength" : (item.WorkoutType || "")}
                          </span>
                        </div>
                        <span className="workout-hide-on-narrow">
                          {item.WorkoutDistance ? (item.WorkoutDistance / 1000).toFixed(2) : "0.00"} km
                        </span>
                        <span className="workout-hide-on-narrow">
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

  // Move startOfWeek and weekDays calculation outside JSX for reuse
  const startOfWeek = selectedDate.startOf("week").add(1, "day");
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 16px 8px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => setSelectedDate(selectedDate.subtract(7, "day"))}
              style={{
                fontSize: "16px",
                padding: "2px 6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                cursor: "pointer"
              }}
              aria-label="Previous week"
            >
              &#8592;
            </button>
            <button
              onClick={() => setSelectedDate(selectedDate.add(7, "day"))}
              style={{
                fontSize: "16px",
                padding: "2px 6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                cursor: "pointer"
              }}
              aria-label="Next week"
            >
              &#8594;
            </button>
          </div>
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
        {/* Always show week grid */}
        {(() => {
          return (
            <div style={{ width: "100%", marginBottom: "8px" }}>
              {/* Headings */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                marginBottom: "6px",
                textAlign: "center",
                fontWeight: "bold"
              }}>
                {daysOfWeek.map((day, idx) => {
                  const date = weekDays[idx];
                  const phase = aRace ? getPhaseForDate(date, aRace) : null;
                  return (
                    <div
                      key={day}
                      style={{
                        fontSize: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxSizing: "border-box"
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
                            letterSpacing: "0.2px"
                          }}
                        >
                          {phase.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Dates */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minWidth: 0 }}>
                {weekDays.map((date, i) => {
                  const isSelected = date.isSame(selectedDate, "day");
                  const isToday = date.isSame(dayjs(), "day");
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedDate(date)}
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
                        borderRight: i < 6 ? "1px solid #f0f0f0" : "none",
                        width: "100%",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        minWidth: 0
                      }}
                    >
                      <div>{date.format("D")}</div>
                      {window.innerWidth > 768 && (
                        <div style={{ marginTop: "6px", width: "100%" }}>
                          {dateCellRender(date)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
        {/* Render selected day's workouts below the grid on small screens */}
        {window.innerWidth <= 768 && (
          <div style={{ padding: "8px", marginTop: "8px", overflowY: "auto" }}>
            {dateCellRender(selectedDate)}
          </div>
        )}
      </div>
      <style>{`
        .scrollable-detail {
          height: 60vh;
          overflow-y: auto;
          padding-bottom: 12px;
          width: 33%;
          margin: 0 auto;
        }
        @media (max-width: 600px) {
          .scrollable-detail {
            width: 100%;
          }
        }
        @media (max-width: 400px) {
          .workout-type-label {
            display: none;
          }
        }
        /* Responsive workout-content styles */
        @media (max-width: 600px) {
          .workout-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .workout-content:has(.workout-hide-on-narrow) {
            overflow: hidden;
          }
        }

        @media (max-width: 360px) {
          .workout-hide-on-narrow {
            display: none;
          }
        }
      `}</style>
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
          <WorkoutNoFeedbackCard workout={{ ...selectedWorkout, closeComponent: () => setSelectedWorkout(null) }} />
        )}
      </Modal>
    </Card>
  );
};

export default Calendar;