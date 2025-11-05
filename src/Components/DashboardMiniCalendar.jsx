import React, { useMemo, useState } from "react";
import { Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faBicycle,
  faRunning,
  faDumbbell,
  faGolfBallTee,
} from "@fortawesome/free-solid-svg-icons";
import WorkoutNoFeedbackCard from "./WorkoutNoFeedbackCard";

const getWorkoutIcon = (type = "") => {
  const lowered = type.toLowerCase();
  if (lowered.includes("swim")) return faWater;
  if (lowered.includes("ride") || lowered.includes("bike")) return faBicycle;
  if (lowered.includes("run")) return faRunning;
  if (
    lowered.includes("strength") ||
    lowered.includes("weight") ||
    lowered.includes("weighttraining")
  )
    return faDumbbell;
  if (lowered.includes("golf")) return faGolfBallTee;
  return null;
};

const formatMovingTime = (seconds) => {
  const totalSeconds = Number(seconds);
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return "00:00";
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const DashboardMiniCalendar = ({
  workouts = [],
  customerAvailabilities = [],
}) => {
  const [centreDate, setCentreDate] = useState(dayjs());
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const workoutMap = useMemo(() => {
    return workouts.reduce((acc, workout) => {
      if (!workout?.WorkoutDateTime) return acc;
      const key = dayjs(workout.WorkoutDateTime).startOf("day").format("YYYY-MM-DD");
      if (!acc[key]) acc[key] = [];
      acc[key].push(workout);
      return acc;
    }, {});
  }, [workouts]);

  const availabilityList = useMemo(
    () => (Array.isArray(customerAvailabilities) ? customerAvailabilities : []),
    [customerAvailabilities]
  );

  const visibleDays = useMemo(
    () => [-1, 0, 1].map((offset) => centreDate.add(offset, "day")),
    [centreDate]
  );

  const handleShift = (direction) => {
    setCentreDate((current) => current.add(direction, "day"));
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <button
          type="button"
          onClick={() => handleShift(-1)}
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            padding: "4px 10px",
            background: "#fafafa",
            cursor: "pointer",
          }}
          aria-label="Previous day"
        >
          ‹
        </button>
        <h4 style={{ margin: 0, textAlign: "center" }}>Workouts</h4>
        <button
          type="button"
          onClick={() => handleShift(1)}
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            padding: "4px 10px",
            background: "#fafafa",
            cursor: "pointer",
          }}
          aria-label="Next day"
        >
          ›
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          justifyContent: "center",
          paddingBottom: 4,
          }}
      >
        {visibleDays.map((date) => {
          const key = date.format("YYYY-MM-DD");
          const workoutsForDay = workoutMap[key] || [];
          const availability = availabilityList.find((entry) =>
            date.isSame(dayjs(entry.UnavailableStartDate), "day") ||
            (date.isAfter(dayjs(entry.UnavailableStartDate), "day") &&
              date.isBefore(dayjs(entry.UnavailableEndDate), "day")) ||
            date.isSame(dayjs(entry.UnavailableEndDate), "day")
          );
          const isToday = date.isSame(dayjs(), "day");

          return (
            <div
              key={key}
              style={{
                minWidth: 220,
                flex: "0 0 220px",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: 12,
                background: isToday ? "#fff7e6" : "#ffffff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{date.format("ddd D MMM")}</div>
              </div>

              {availability && (
                <div
                  style={{
                    marginBottom: 8,
                    backgroundColor: "#ff7875",
                    color: "#fff",
                    padding: "4px 6px",
                    borderRadius: 6,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  {availability.UnavailableReason}
                </div>
              )}

              {workoutsForDay.length === 0 ? (
                <div style={{ fontSize: 12, color: "#999", textAlign: "center" }}>
                  No workouts scheduled
                </div>
              ) : (
                workoutsForDay.map((workout, index) => {
                  const icon = getWorkoutIcon(workout?.WorkoutType);
                  const duration = formatMovingTime(workout?.WorkoutMovingTime);
                  const stressScore = workout?.WorkoutStressScore ?? "0";
                  const description = workout?.WorkoutDescription || "";

                  return (
                    <Tooltip title={description} key={`${key}-${index}`}>
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: 8,
                          padding: "6px 8px",
                          marginBottom: 6,
                          background:
                            workout?.WorkoutState === "Completed" ? "#f6ffed" : "#ffffff",
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                        onClick={() => setSelectedWorkout(workout)}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {icon && <FontAwesomeIcon icon={icon} />}
                            <span style={{ fontSize: 13, fontWeight: 500 }}>
                              {workout?.WorkoutType || "Workout"}
                            </span>
                          </div>
                          {workout?.WorkoutState === "Completed" && (
                            <span style={{ fontSize: 11, color: "darkgreen", fontWeight: 600 }}>
                              Completed
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: "#666" }}>
                          ⏱ {duration} &nbsp; | &nbsp; 🏋️ {stressScore} TSS
                        </div>
                      </div>
                    </Tooltip>
                  );
                })
              )}
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
                  const icon = getWorkoutIcon(selectedWorkout?.WorkoutType);
                  return icon ? <FontAwesomeIcon icon={icon} style={{ marginRight: 8 }} /> : null;
                })()}
                {selectedWorkout?.WorkoutDescription || selectedWorkout?.WorkoutType || "Workout"}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {selectedWorkout?.WorkoutDateTime
                  ? dayjs(selectedWorkout.WorkoutDateTime).format("YYYY-MM-DD")
                  : ""}
              </div>
            </>
          ) : "Workout Details"
        }
        open={!!selectedWorkout}
        onCancel={() => setSelectedWorkout(null)}
        footer={null}
      >
        {selectedWorkout && <WorkoutNoFeedbackCard workout={selectedWorkout} />}
      </Modal>
    </div>
  );
};

export default DashboardMiniCalendar;
