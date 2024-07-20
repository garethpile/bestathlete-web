import React from "react";

const WorkoutCard = ({ workout, onSelect }) => {
  return (
    <div onClick={() => onSelect(workout)}>
      {/* Render workout details */}
      <p>{workout.WorkoutDescription}</p>
    </div>
  );
};

export default WorkoutCard;