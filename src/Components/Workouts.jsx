import React, { useState, useEffect } from "react";
import { Button as AntButton } from "antd";
import WorkoutManagement from "./WorkoutManagement";

export default function Workouts({ workoutsNoFeedback }) {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date()
  });

  useEffect(() => {
    // This could be improved to fetch data based on the new date range if needed
  }, [dateRange]);

  const formatDate = (date) => date.toISOString().slice(0, 10);

  const handlePrevDays = () => {
    setDateRange((prevRange) => ({
      start: new Date(prevRange.start.setDate(prevRange.start.getDate() - 3)),
      end: new Date(prevRange.start.setDate(prevRange.start.getDate() + 2))
    }));
  };

  const handleNextDays = () => {
    setDateRange((prevRange) => ({
      start: new Date(prevRange.end.setDate(prevRange.end.getDate() + 1)),
      end: new Date(prevRange.start.setDate(prevRange.start.getDate() + 2))
    }));
  };

  const displayDateRange = `${dateRange.start.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} - ${dateRange.end.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`;

  const getWorkoutsForDay = (day) => {
    const dateStr = formatDate(day);
    return workoutsNoFeedback.filter(
      (workout) => workout.WorkoutDateTime.slice(0, 10) === dateStr
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AntButton onClick={handlePrevDays}>Previous</AntButton>
        <h3>{displayDateRange}</h3>
        <AntButton onClick={handleNextDays}>Next</AntButton>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        {Array.from({ length: 3 }).map((_, index) => {
          const day = new Date(dateRange.start.getTime() + (index * 86400000));
          const workouts = getWorkoutsForDay(day);
          return (
            <div key={index} style={{ flex: 1 }}>
              <h4>{day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <WorkoutManagement key={workout.id} selectedWorkout={workout} />
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