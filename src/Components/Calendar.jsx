import React, { useState, useEffect, useRef } from "react";
import { customerAvailabilityDelete } from "../services/customerAvailabilityServices";
import { Badge, Card, Tooltip, Modal } from "antd";
import dayjs from "dayjs";
import { EnvironmentOutlined, FireOutlined, ThunderboltOutlined, HeartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faBicycle, faRunning, faDumbbell, faGolfBallTee } from '@fortawesome/free-solid-svg-icons';
import WorkoutNoFeedbackCard from "./WorkoutNoFeedbackCard";
import UnavailabilityModal from "./UnavailabilityModal";

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

const Calendar = ({ workouts = [], customer , events = [], customerAvailabilities, onAvailabilityClick }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [availabilities, setAvailabilities] = useState(Array.isArray(customerAvailabilities) ? customerAvailabilities : []);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
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
    // Ensure value is wrapped in dayjs for correct key format
    const dateKey = dayjs(value).format("YYYY-MM-DD");
    const listData = workoutMap[dateKey] || [];

    // Removed phase rendering from here as per instructions

    const availability = availabilities.find((entry) =>
      dayjs(value).isSameOrAfter(dayjs(entry.UnavailableStartDate), "day") &&
      dayjs(value).isSameOrBefore(dayjs(entry.UnavailableEndDate), "day")
    );
    const isToday = dayjs().isSame(value, "day");

    return (
      <div style={isToday ? { backgroundColor: "#fff9db", padding: "4px", borderRadius: "4px" } : {}}>
        {availability && (
          <div
            onClick={() => {
              setSelectedAvailability(availability);
              setIsAvailabilityModalOpen(true);
            }}
            style={{
              backgroundColor: "#ff6b6b",
              color: "#fff",
              padding: "2px 4px",
              fontSize: "10px",
              textAlign: "center",
              borderRadius: "2px",
              marginBottom: "4px",
              cursor: "pointer"
            }}
          >
            {availability.UnavailableReason}
          </div>
        )}
        {listData.length === 0 ? (
          <div style={{ fontSize: 12, color: "#999" }}>No Workouts</div>
        ) : (
          listData.map((item, index) => {
            const timeStr = item.WorkoutMovingTime
              ? `${String(Math.floor(item.WorkoutMovingTime / 3600)).padStart(1, "0")}:${String(Math.floor((item.WorkoutMovingTime % 3600) / 60)).padStart(2, "0")}:00`
              : "00:00:00";

            const renderIcon = () => {
              const type = (item.WorkoutType || "").toLowerCase();
              if (type.includes("swim")) return faWater;
              if (type.includes("ride") || type.includes("bike")) return faBicycle;
              if (type.includes("strength") || type.includes("weight")) return faDumbbell;
              if (type.includes("run")) return faRunning;
              if (type.includes("golf")) return faGolfBallTee;
              return null;
            };

            return (
              <Tooltip title={item.WorkoutDescription || ""} key={index}>
                <div
                  onClick={() => setSelectedWorkout(item)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "1px solid #cce0cc",
                    borderRadius: "6px",
                    padding: "6px",
                    marginBottom: "6px",
                    fontSize: "12px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {renderIcon() && (
                        <FontAwesomeIcon icon={renderIcon()} style={{ marginRight: 6 }} />
                      )}
                      <></>
                    </div>
                    {item.WorkoutState === "Completed" && (
                      <span style={{ fontSize: "11px", color: "darkgreen", fontWeight: "bold" }}>Completed</span>
                    )}
                  </div>
                  <div>⏱ {timeStr}</div>
                  <div>🏋️ {item.WorkoutStressScore || "0"} TSS</div>
                </div>
              </Tooltip>
            );
          })
        )}
      </div>
    );
  };

  // Selected date state for horizontal date selector
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Responsive: track if mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
        {/* Show week grid only on mobile */}
        {isMobile && (() => {
          // Get start of the current week (Monday) based on selectedDate
          const startOfWeek = selectedDate.startOf("week").add(1, "day");
          const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          // Build array for each day in current week
          const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

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
                        alignItems: "center"
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
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
                        transition: "background .15s"
                      }}
                    >
                      {date.format("D")}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
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
        .month-grid {
          padding: 8px;
        }
      `}</style>
      {/* Responsive detail: mobile or web */}
      {isMobile ? (
        <div className="scrollable-detail">
          <div
            key={selectedDate.format("YYYY-MM-DD")}
            ref={(el) => (dayRefs.current[0] = el)}
            style={{
              backgroundColor: selectedDate.isSame(selectedDate, "day") ? "#fff9db" : "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "8px",
              padding: "8px"
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>
              {selectedDate.format("dddd, MMMM D, YYYY")}
            </div>
            {dateCellRender(selectedDate)}
          </div>
        </div>
      ) : (
        <div className="month-grid">
          {(() => {
            // Only calculate startOfMonth once for the entire grid, starting on Monday
            const startOfMonth = selectedDate.startOf("month").startOf("week").add(1, "day");
            return Array.from({ length: 4 }, (_, weekIndex) => (
              <div key={weekIndex} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "8px", gap: "4px" }}>
                {Array.from({ length: 7 }, (_, dayOffset) => {
                  const date = dayjs(startOfMonth).add(weekIndex * 7 + dayOffset, "day");
                  return (
                    <div
                      key={dayOffset}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "4px"
                      }}
                    >
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "bold" }}>
                        <span>{date.format("ddd D MMM")}</span>
                        {(() => {
                          const phase = aRace ? getPhaseForDate(date, aRace) : null;
                          return phase ? (
                            <span style={{
                              fontSize: "11px",
                              background: phase.color,
                              color: "#333",
                              borderRadius: "8px",
                              padding: "2px 6px",
                              marginLeft: "4px",
                              fontWeight: 500,
                              letterSpacing: "0.2px"
                            }}>
                              {phase.name}
                            </span>
                          ) : null;
                        })()}
                      </div>
                      <div style={{ width: "100%" }}>
                        {dateCellRender(date)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ));
          })()}
        </div>
      )}
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
          <WorkoutNoFeedbackCard workout={selectedWorkout} />
        )}
      </Modal>
      <UnavailabilityModal
        open={isAvailabilityModalOpen}
        onClose={() => {
          setIsAvailabilityModalOpen(false);
          setSelectedAvailability(null);
        }}
        event={selectedAvailability}
        onSave={async (data) => {
          if (data?.delete && data.id) {
            await customerAvailabilityDelete(data.id);
            const updated = availabilities.filter(a => a.id !== data.id);
            setAvailabilities(updated);
          } else if (data?.refresh && data.id) {
            // Update availability item in state
            const updated = availabilities.map(a => a.id === data.id ? { ...a, ...data } : a);
            setAvailabilities(updated);
          }
          setIsAvailabilityModalOpen(false);
          setSelectedAvailability(null);
        }}
      />
    </Card>
  );
};

export default Calendar;