import React, { useMemo, useState, useRef, useEffect } from "react";
import { Modal, Tooltip, Switch } from "antd";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faBicycle,
  faRunning,
  faDumbbell,
  faGolfBallTee,
} from "@fortawesome/free-solid-svg-icons";
import WorkoutNoFeedbackCard from "../../shared/components/WorkoutNoFeedbackCard";

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
  const dragState = useRef({ startX: null });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const handler = (event) => setIsMobile(event.matches);
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq?.addEventListener) {
      mq.addEventListener("change", handler);
    } else if (mq?.addListener) {
      mq.addListener(handler);
    }
    return () => {
      if (mq?.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else if (mq?.removeListener) {
        mq.removeListener(handler);
      }
    };
  }, []);

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

  const handleDragStart = (event) => {
    const point = event.touches ? event.touches[0] : event;
    dragState.current.startX = point.clientX;
  };

  const handleDragMove = (event) => {
    if (dragState.current.startX === null) return;
    const point = event.touches ? event.touches[0] : event;
    const delta = point.clientX - dragState.current.startX;
    if (Math.abs(delta) > 60) {
      handleShift(delta > 0 ? -1 : 1);
      dragState.current.startX = null;
    }
  };

  const handleDragEnd = () => {
    dragState.current.startX = null;
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {!isMobile && (
          <button
            type="button"
            onClick={() => handleShift(-1)}
            style={{
              border: "1px solid #cbd5f5",
              borderRadius: 999,
              width: 36,
              height: 36,
              background: "#fff",
              boxShadow: "0 6px 14px rgba(15,23,42,0.07)",
              cursor: "pointer",
            }}
          >
            ‹
          </button>
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 14,
            overflowX: "auto",
            paddingBottom: 6,
            cursor: "grab",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
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
          const phaseName = workoutsForDay[0]?.WorkoutPhase || "Build";
          const phaseLetter = (phaseName?.[0] || "•").toUpperCase();
          const phaseColors = {
            B: "#fde047",
            P: "#fb7185",
            T: "#34d399",
            A: "#60a5fa",
          };
          const phaseColor = phaseColors[phaseLetter] || "#c4b5fd";

          return (
            <div
              key={key}
              style={{
                minWidth: 240,
                flex: "0 0 240px",
                borderRadius: 18,
                padding: 14,
                background: isToday
                  ? "linear-gradient(135deg,#fdf4ff 0%,#eef2ff 100%)"
                  : "linear-gradient(135deg,#ffffff 0%,#f8fafc 100%)",
                boxShadow: "0 18px 32px rgba(15,23,42,0.12)",
                border: "1px solid rgba(148,163,184,0.35)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: 600 }}>{date.format("ddd D MMM")}</div>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "999px",
                    background: phaseColor,
                    color: "#0f172a",
                    fontWeight: 700,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {phaseLetter}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>Train</span>
                  <Switch size="small" defaultChecked />
                </div>
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
                <div
                  style={{
                    fontSize: 12,
                    color: "#9ca3af",
                    textAlign: "center",
                    padding: "18px 0",
                  }}
                >
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
                          borderRadius: 12,
                          border: "1px solid rgba(148,163,184,0.35)",
                          padding: "8px 10px",
                          marginBottom: 8,
                          background:
                            workout?.WorkoutState === "Completed"
                              ? "linear-gradient(135deg,#ecfccb 0%,#dcfce7 100%)"
                              : "#ffffff",
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          boxShadow: "0 10px 18px rgba(15,23,42,0.08)",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedWorkout(workout)}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {icon && <FontAwesomeIcon icon={icon} />}
                            <span style={{ fontSize: 13, fontWeight: 500 }}>
                              {workout?.WorkoutType || "Workout"}
                            </span>
                          </div>
                          {workout?.WorkoutState === "Completed" && (
                            <span style={{ fontSize: 11, color: "#15803d", fontWeight: 600 }}>
                              Completed
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: "#475569" }}>
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
        {!isMobile && (
          <button
            type="button"
            onClick={() => handleShift(1)}
            style={{
              border: "1px solid #cbd5f5",
              borderRadius: 999,
              width: 36,
              height: 36,
              background: "#fff",
              boxShadow: "0 6px 14px rgba(15,23,42,0.07)",
              cursor: "pointer",
            }}
          >
            ›
          </button>
        )}
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
