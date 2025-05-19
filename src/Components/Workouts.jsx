import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button as AntButton, DatePicker } from "antd";
import WorkoutManagement from "./WorkoutManagement";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function Workouts({ workoutsNoFeedback = [] }) {
  const today = dayjs();
  const [dateRange, setDateRange] = useState([
    today.subtract(2, "day"),
    today,
  ]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [daysOffset, setDaysOffset] = useState({ start: -7, end: 7 });

  const formatDate = (date) => date.format("YYYY-MM-DD");

  useEffect(() => {
    if (dateRange[1]) {
      const targetDate = formatDate(dateRange[1]);
      const workout = workoutsNoFeedback.find(
        (workout) => workout.WorkoutDateTime.slice(0, 10) === targetDate
      );
      setSelectedWorkout(workout || null);
    }
  }, [dateRange, workoutsNoFeedback]);

  const handleSaveWorkout = async (updatedWorkoutData) => {
    setSelectedWorkout((prevWorkout) => ({
      ...prevWorkout,
      ...updatedWorkoutData,
    }));
  };

  useEffect(() => {
    setDaysOffset({ start: -7, end: 7 });
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AntButton onClick={() => setDaysOffset(({ start, end }) => ({ start: start - 7, end }))}>
          Load Previous 7 Days
        </AntButton>
        <RangePicker
          value={dateRange}
          onChange={(dates) => dates && setDateRange(dates)}
          format="DD/MM/YYYY"
          allowClear={false}
        />
        <AntButton onClick={() => setDaysOffset(({ start, end }) => ({ start, end: end + 7 }))}>
          Load Next 7 Days
        </AntButton>
      </div>

      <div style={{ marginTop: "24px", maxHeight: "70vh", overflowY: "auto" }}>
        {Array.from({ length: daysOffset.end - daysOffset.start + 1 }).map((_, index) => {
          const day = today.add(daysOffset.start + index, "day");
          const dateStr = formatDate(day);
          const workouts = workoutsNoFeedback.filter(
            (workout) => workout.WorkoutDateTime.slice(0, 10) === dateStr
          );
          return (
            <div key={index} style={{ marginBottom: "16px" }}>
              <h4>{day.format("dddd, D MMMM")}</h4>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <WorkoutManagement
                    key={workout.id}
                    selectedWorkout={selectedWorkout?.id === workout.id ? selectedWorkout : workout}
                    setSelectedWorkout={setSelectedWorkout}
                    onSave={handleSaveWorkout}
                  />
                ))
              ) : (
                <p>No Workout</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}