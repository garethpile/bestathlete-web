import React, { useState, useEffect } from "react";
import { Button as AntButton } from "antd";
import WorkoutManagement from "./WorkoutManagement";

export default function Workouts({ workoutsNoFeedback }) {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date()
  });
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    // Update the selected workout based on the date range
    const workout = workoutsNoFeedback.find(
      workout => workout.WorkoutDateTime.slice(0, 10) === dateRange.end.toISOString().slice(0, 10)
    );
    setSelectedWorkout(workout || null);
  }, [dateRange, workoutsNoFeedback]);

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

  const handleSaveWorkout = async (updatedWorkoutData) => {
    // This function is called after saving the workout in the WorkoutManagement component
    setSelectedWorkout((prevWorkout) => ({
      ...prevWorkout,
      ...updatedWorkoutData,
    }));
  };

  const displayDateRange = `${dateRange.start.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} - ${dateRange.end.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`;

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
          const dateStr = formatDate(day);
          const workouts = workoutsNoFeedback.filter(
            (workout) => workout.WorkoutDateTime.slice(0, 10) === dateStr
          );
          return (
            <div key={index} style={{ flex: 1 }}>
              <h4>{day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</h4>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <WorkoutManagement
                    key={workout.id}
                    selectedWorkout={selectedWorkout?.id === workout.id ? selectedWorkout : workout}
                    setSelectedWorkout={setSelectedWorkout}
                    onSave={handleSaveWorkout} // Pass handleSaveWorkout to update the state
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