import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, Tooltip, Modal, Switch } from "antd";
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
import TrainToggleModal from "../../shared/components/TrainToggleModal";
import {
  customerAvailabilityDelete,
  customerAvailabilitiesGetByIdCustomer,
} from "../../../services/customerAvailabilityServices";
import { workoutsGetIDDateTime } from "../../../services/workoutServices";
import { Spin } from "antd";
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

const TRAIN_STORAGE_KEY = "trainStates";

const parseApiArray = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  const body = response.body;
  if (Array.isArray(body)) return body;
  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  if (body && typeof body === "object") return body;
  return [];
};

const FullCalendarView = ({
  customer,
  workouts = [],
  events = [],
  customerAvailabilities,
}) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [availabilities, setAvailabilities] = useState(
    Array.isArray(customerAvailabilities) ? customerAvailabilities : []
  );
  const [workoutEntries, setWorkoutEntries] = useState(workouts);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 600 : false);
  const [trainStates, setTrainStates] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = window.localStorage.getItem(TRAIN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Unable to load train states", error);
      return {};
    }
  });
  const [trainModalInfo, setTrainModalInfo] = useState({ open: false, date: null, key: null });
  const [isMonthLoading, setIsMonthLoading] = useState(false);

  useEffect(() => {
    setAvailabilities(
      Array.isArray(customerAvailabilities) ? customerAvailabilities : []
    );
  }, [customerAvailabilities]);

  useEffect(() => {
    setWorkoutEntries(workouts);
  }, [workouts]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const persistTrainStates = useCallback((next) => {
    setTrainStates(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TRAIN_STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const isTrainOn = useCallback(
    (key) => trainStates[key]?.on ?? trainStates[key] ?? true,
    [trainStates]
  );

  const openTrainModal = useCallback((dateObj, key) => {
    setTrainModalInfo({ open: true, date: dayjs(dateObj), key });
  }, []);

  const closeTrainModal = useCallback(() => {
    if (trainModalInfo.key) {
      persistTrainStates({ ...trainStates, [trainModalInfo.key]: { on: true } });
    }
    setTrainModalInfo({ open: false, date: null, key: null });
  }, [persistTrainStates, trainModalInfo.key, trainStates]);

  const handleTrainModalConfirm = useCallback(
    ({ start, end, reason }) => {
      const next = { ...trainStates };
      let cursor = dayjs(start);
      const last = dayjs(end);
      while (cursor.isSameOrBefore(last, "day")) {
        next[cursor.format("YYYY-MM-DD")] = {
          on: false,
          reason: reason || "Unavailable",
        };
        cursor = cursor.add(1, "day");
      }
      persistTrainStates(next);
      setTrainModalInfo({ open: false, date: null, key: null });
    },
    [persistTrainStates, trainStates]
  );

  const handleTrainToggle = useCallback(
    (dateObj, checked) => {
      const key = dayjs(dateObj).format("YYYY-MM-DD");
      if (checked) {
        persistTrainStates({ ...trainStates, [key]: { on: true } });
        return;
      }
      persistTrainStates({ ...trainStates, [key]: { on: false } });
      openTrainModal(dateObj, key);
    },
    [openTrainModal, persistTrainStates, trainStates]
  );

  const fetchMonthData = useCallback(
    async (targetDate) => {
      if (!customer?.idCustomer) return;
      setIsMonthLoading(true);
      try {
        const start = targetDate.startOf("month").format("YYYY-MM-DD");
        const end = targetDate.endOf("month").format("YYYY-MM-DD");
        const workoutsResp = await workoutsGetIDDateTime(customer.idCustomer, start, end);
        setWorkoutEntries(parseApiArray(workoutsResp));
        const availabilityResp = await customerAvailabilitiesGetByIdCustomer(customer.idCustomer);
        setAvailabilities(parseApiArray(availabilityResp));
      } catch (error) {
        console.error("Failed to load calendar month data", error);
      } finally {
        setIsMonthLoading(false);
      }
    },
    [customer?.idCustomer]
  );

  const monthKey = selectedDate.format("YYYY-MM");

  useEffect(() => {
    fetchMonthData(selectedDate);
  }, [fetchMonthData, monthKey]);

  const getDisciplineFromType = useCallback((type = "") => {
    const lowered = type.toLowerCase();
    if (lowered.includes("swim")) return "Swim";
    if (lowered.includes("bike") || lowered.includes("ride")) return "Bike";
    if (lowered.includes("run")) return "Run";
    if (
      lowered.includes("strength") ||
      lowered.includes("weight") ||
      lowered.includes("weighttraining")
    )
      return "Strength";
    return null;
  }, []);

  const getIsoWeekKey = useCallback((dateValue) => {
    const value = dayjs(dateValue);
    const base = value.startOf("week").add(1, "day");
    const isoAligned = value.day() === 0 ? base.subtract(7, "day") : base;
    return isoAligned.format("YYYY-MM-DD");
  }, []);

  const workoutMap = useMemo(() => {
    return workoutEntries.reduce((acc, workout) => {
      if (!workout.WorkoutDateTime) return acc;
      const date = dayjs(workout.WorkoutDateTime).startOf("day").format("YYYY-MM-DD");
      acc[date] = acc[date] || [];
      acc[date].push(workout);
      return acc;
    }, {});
  }, [workoutEntries]);

  const weekSummaries = useMemo(() => {
    const emptyBucket = () => ({
      planned: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
      completed: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
    });

    return workoutEntries.reduce((acc, workout) => {
      if (!workout.WorkoutDateTime) return acc;
      const discipline = getDisciplineFromType(workout.WorkoutType || "");
      if (!discipline) return acc;

      const weekKey = getIsoWeekKey(workout.WorkoutDateTime);

      const summary = acc[weekKey] || emptyBucket();
      const hours = Math.max(Number(workout.WorkoutMovingTime || 0) / 3600, 0);
      const state = (workout.WorkoutState || "").toLowerCase();

      if (state === "completed") {
        summary.completed[discipline] += hours;
      } else {
        summary.planned[discipline] += hours;
      }

      acc[weekKey] = summary;
      return acc;
    }, {});
  }, [workoutEntries, getDisciplineFromType, getIsoWeekKey]);

  const aRace = events.find((e) => e.EventPriority === "A");

  const dateCellRender = useCallback(
    (value) => {
      const dateKey = dayjs(value).format("YYYY-MM-DD");
      const listData = workoutMap[dateKey] || [];
      const availability = availabilities.find(
        (entry) =>
          dayjs(value).isSameOrAfter(dayjs(entry.UnavailableStartDate), "day") &&
          dayjs(value).isSameOrBefore(dayjs(entry.UnavailableEndDate), "day")
      );
      const train = trainStates[dateKey];
      return (
        <div>
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
            train?.reason ? (
              <div
                style={{
                  fontSize: 12,
                  color: "#fff",
                  textAlign: "center",
                  padding: "8px 6px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#fee2e2 0%,#f87171 100%)",
                  border: "1px solid rgba(248,113,113,0.45)",
                }}
              >
                {train.reason}
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "#999" }}>No Workouts</div>
            )
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
    [availabilities, workoutMap, trainStates]
  );

  const getWeekSummary = useCallback(
    (weekStart) => weekSummaries[getIsoWeekKey(weekStart)] || null,
    [weekSummaries, getIsoWeekKey]
  );

  return (
    <Card className="maincardDiv">
      <Spin spinning={isMonthLoading}>
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
          getWeekSummary={getWeekSummary}
          getTrainState={(date) => isTrainOn(dayjs(date).format("YYYY-MM-DD"))}
          onTrainToggle={(dateObj, checked) => handleTrainToggle(dateObj, checked)}
        />
      </Spin>
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
      <TrainToggleModal
        open={trainModalInfo.open}
        initialDate={trainModalInfo.date}
        onCancel={closeTrainModal}
        onConfirm={handleTrainModalConfirm}
      />
    </Card>
  );
};

export default FullCalendarView;
