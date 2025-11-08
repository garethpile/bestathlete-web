import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, Tooltip, Modal } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faBicycle,
  faRunning,
  faDumbbell,
  faGolfBallTee,
} from "@fortawesome/free-solid-svg-icons";
import WorkoutNoFeedbackCard from "../../shared/components/WorkoutNoFeedbackCard";
import UnavailabilityModal from "../../shared/components/UnavailabilityModal";
import { customerAvailabilityDelete } from "../../../services/customerAvailabilityServices";
import CalendarHeaderControls from "./CalendarHeaderControls";
import CalendarMonthGrid from "./CalendarMonthGrid";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getPhaseForDate = (date, aRace) => {
  if (!aRace) return null;
  const phases = [
    { name: "Prep", start: aRace.EventPrepStart, end: aRace.EventPrepEnd, color: "#d0ebff" },
    { name: "Base", start: aRace.EventBaseStart, end: aRace.EventBaseEnd, color: "#b2f2bb" },
    { name: "Build", start: aRace.EventBuildStart, end: aRace.EventBuildEnd, color: "#ffe066" },
    { name: "Peak", start: aRace.EventPeakStart, end: aRace.EventPeakEnd, color: "#ffa94d" },
    { name: "Taper", start: aRace.EventTaperStart, end: aRace.EventTaperEnd, color: "#f783ac" },
  ];
  return phases.find(
    (phase) =>
      dayjs(date).isSameOrAfter(dayjs(phase.start), "day") &&
      dayjs(date).isSameOrBefore(dayjs(phase.end), "day")
  );
};

const FullCalendarView = ({
  workouts = [],
  events = [],
  customerAvailabilities,
}) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [availabilities, setAvailabilities] = useState(
    Array.isArray(customerAvailabilities) ? customerAvailabilities : []
  );
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 600 : false);

  useEffect(() => {
    setAvailabilities(
      Array.isArray(customerAvailabilities) ? customerAvailabilities : []
    );
  }, [customerAvailabilities]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const workoutMap = useMemo(() => {
    return workouts.reduce((acc, workout) => {
      if (!workout.WorkoutDateTime) return acc;
      const date = dayjs(workout.WorkoutDateTime).startOf("day").format("YYYY-MM-DD");
      acc[date] = acc[date] || [];
      acc[date].push(workout);
      return acc;
    }, {});
  }, [workouts]);

  const dateCellRender = useCallback(
    (value) => {
      const dateKey = dayjs(value).format("YYYY-MM-DD");
      const listData = workoutMap[dateKey] || [];
      const availability = availabilities.find(
        (entry) =>
          dayjs(value).isSameOrAfter(dayjs(entry.UnavailableStartDate), "day") &&
          dayjs(value).isSameOrBefore(dayjs(entry.UnavailableEndDate), "day")
      );
      const isToday = dayjs().isSame(value, "day");

      return (
        <div
          style={
            isToday
              ? { backgroundColor: "#fff9db", padding: "4px", borderRadius: "4px" }
              : {}
          }
        >
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
                cursor: "pointer",
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
                ? `${String(Math.floor(item.WorkoutMovingTime / 3600)).padStart(1, "0")}:${String(
                    Math.floor((item.WorkoutMovingTime % 3600) / 60)
                  ).padStart(2, "0")}:00`
                : "00:00:00";

              const renderIcon = () => {
                const type = (item.WorkoutType || "").toLowerCase();
                if (type.includes("swim")) return faWater;
                if (type.includes("ride") || type.includes("bike")) return faBicycle;
                if (
                  type.includes("strength") ||
                  type.includes("weight") ||
                  type.includes("weighttraining")
                )
                  return faDumbbell;
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
                      backgroundColor:
                        item.WorkoutState === "Completed" ? "#e6ffe6" : "transparent",
                      border: "1px solid #cce0cc",
                      borderRadius: "6px",
                      padding: "6px",
                      marginBottom: "6px",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {renderIcon() && (
                          <FontAwesomeIcon icon={renderIcon()} style={{ marginRight: 6 }} />
                        )}
                      </div>
                      {item.WorkoutState === "Completed" && (
                        <span style={{ fontSize: "11px", color: "darkgreen", fontWeight: "bold" }}>
                          Completed
                        </span>
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
    },
    [availabilities, workoutMap]
  );

  const aRace = events.find((e) => e.EventPriority === "A");

  return (
    <Card className="maincardDiv">
      <CalendarHeaderControls
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
        isMobile={isMobile}
        activeRace={aRace}
        getPhaseForDate={getPhaseForDate}
      />
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
      <CalendarMonthGrid
        isMobile={isMobile}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        dateCellRender={dateCellRender}
        activeRace={aRace}
        getPhaseForDate={getPhaseForDate}
      />
      <Modal
        title={
          selectedWorkout ? (
            <>
              <div>
                {(() => {
                  const type = (selectedWorkout.WorkoutType || "").toLowerCase();
                  if (type.includes("swim"))
                    return <FontAwesomeIcon icon={faWater} style={{ marginRight: 8 }} />;
                  if (type.includes("ride") || type.includes("bike"))
                    return <FontAwesomeIcon icon={faBicycle} style={{ marginRight: 8 }} />;
                  if (type.includes("strength") || type.includes("weight"))
                    return <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: 8 }} />;
                  if (type.includes("run"))
                    return <FontAwesomeIcon icon={faRunning} style={{ marginRight: 8 }} />;
                  return null;
                })()}
                {selectedWorkout.WorkoutDescription || ""}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {dayjs(selectedWorkout.WorkoutDateTime).format("YYYY-MM-DD")}
              </div>
            </>
          ) : (
            "Workout Details"
          )
        }
        open={!!selectedWorkout}
        onCancel={() => setSelectedWorkout(null)}
        footer={null}
      >
        {selectedWorkout && <WorkoutNoFeedbackCard workout={selectedWorkout} />}
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
            setAvailabilities((prev) => prev.filter((a) => a.id !== data.id));
          } else if (data?.refresh && data.id) {
            setAvailabilities((prev) =>
              prev.map((a) => (a.id === data.id ? { ...a, ...data } : a))
            );
          }
          setIsAvailabilityModalOpen(false);
          setSelectedAvailability(null);
        }}
      />
    </Card>
  );
};

export default FullCalendarView;
