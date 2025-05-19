import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button as AntButton, DatePicker } from "antd";
import WorkoutManagement from "./WorkoutManagement";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"; // base styles

const { RangePicker } = DatePicker;

export default function Workouts({ workoutsNoFeedback = [] }) {
  const today = dayjs();
  const [dateRange, setDateRange] = useState([
    today.subtract(2, "day"),
    today,
  ]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  const handlePrevDays = () => {
    const newStart = dateRange[0].subtract(3, "day");
    const newEnd = newStart.add(2, "day");
    setDateRange([newStart, newEnd]);
  };

  const handleNextDays = () => {
    const newStart = dateRange[1].add(1, "day");
    const newEnd = newStart.add(2, "day");
    setDateRange([newStart, newEnd]);
  };

  const handleSaveWorkout = async (updatedWorkoutData) => {
    setSelectedWorkout((prevWorkout) => ({
      ...prevWorkout,
      ...updatedWorkoutData,
    }));
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AntButton onClick={handlePrevDays}>Previous</AntButton>
        <RangePicker
          value={dateRange}
          onChange={(dates) => dates && setDateRange(dates)}
          format="DD/MM/YYYY"
          allowClear={false}
        />
        <AntButton onClick={handleNextDays}>Next</AntButton>
      </div>

      {isMobile ? (
        <Swiper spaceBetween={16} slidesPerView={1}>
          {Array.from({ length: 1 }).map((_, index) => {
            const day = dateRange[0].add(index, "day");
            const dateStr = formatDate(day);
            const workouts = workoutsNoFeedback.filter(
              (workout) => workout.WorkoutDateTime.slice(0, 10) === dateStr
            );
            return (
              <SwiperSlide key={index}>
                <div style={{ padding: "8px" }}>
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "24px" }}>
          {Array.from({ length: 3 }).map((_, index) => {
            const day = dateRange[0].add(index, "day");
            const dateStr = formatDate(day);
            const workouts = workoutsNoFeedback.filter(
              (workout) => workout.WorkoutDateTime.slice(0, 10) === dateStr
            );
            return (
              <div key={index} style={{ flex: 1, margin: "0 8px" }}>
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
      )}
    </div>
  );
}