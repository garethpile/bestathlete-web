import React from "react";
import { Card } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AthleteCard ({customer , workouts = []} ) {
  
  const sessionData = {
    labels: ['Swim', 'Bike', 'Run', 'Strength'],
    datasets: [
      {
        label: '# of Sessions',
        data: [2, 3, 1, 1],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  const timeData = {
    labels: ['Swim', 'Bike', 'Run', 'Strength'],
    datasets: [
      {
        label: '% of Time',
        data: [20, 40, 15, 25],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day");

  const disciplineHours = { Swim: 0, Bike: 0, Run: 0, Strength: 0 };

  workouts.forEach((workout) => {
    const workoutDate = dayjs(workout.WorkoutDateTime);
    if (workoutDate.isSameOrAfter(sevenDaysAgo, "day")) {
      let discipline = "";
      if (workout.WorkoutType?.toLowerCase().includes("swim")) discipline = "Swim";
      else if (workout.WorkoutType?.toLowerCase().includes("bike") || workout.WorkoutType?.toLowerCase().includes("ride")) discipline = "Bike";
      else if (workout.WorkoutType?.toLowerCase().includes("run")) discipline = "Run";
      else if (workout.WorkoutType?.toLowerCase().includes("strength")) discipline = "Strength";

      const duration = (workout.WorkoutMovingTime || 0) / 3600; // seconds to hours
      if (disciplineHours.hasOwnProperty(discipline)) {
        disciplineHours[discipline] += duration;
      }
    }
  });

  const disciplineDistance = { Swim: 0, Bike: 0, Run: 0 };

  workouts.forEach((workout) => {
    const workoutDate = dayjs(workout.WorkoutDateTime);
    if (workoutDate.isSameOrAfter(sevenDaysAgo, "day")) {
      let discipline = "";
      if (workout.WorkoutType?.toLowerCase().includes("swim")) discipline = "Swim";
      else if (workout.WorkoutType?.toLowerCase().includes("bike") || workout.WorkoutType?.toLowerCase().includes("ride")) discipline = "Bike";
      else if (workout.WorkoutType?.toLowerCase().includes("run")) discipline = "Run";

      const distance = (workout.WorkoutDistance || 0) / 1000; // meters to km
      if (disciplineDistance.hasOwnProperty(discipline)) {
        disciplineDistance[discipline] += distance;
      }
    }
  });

    return (
      <Card className="maincardDiv">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton className="mainavatarIcon">
            <Avatar
              shape="circle"
              size={60}
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${customer?.FirstName || "random"}`}
            />
          </IconButton>
          <p className="nameDiv" style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            {customer?.FirstName } {customer?.LastName}
          </p>
        </div>
        <Divider light />
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h3 style={{ margin: 0, whiteSpace: 'nowrap' }}>Last 7 Days Summary</h3>
          <table style={{ borderCollapse: 'collapse', minWidth: '400px', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Swim</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Bike</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Run</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Strength</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineHours.Swim.toFixed(1)} hrs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineHours.Bike.toFixed(1)} hrs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineHours.Run.toFixed(1)} hrs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineHours.Strength.toFixed(1)} hrs</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineDistance.Swim.toFixed(1)} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineDistance.Bike.toFixed(1)} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{disciplineDistance.Run.toFixed(1)} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>–</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '20%' }}>
            <h4 style={{ textAlign: 'center' }}>Session Count</h4>
            <Pie
              data={sessionData}
              options={{
                plugins: {
                  legend: { display: true },
                  tooltip: { enabled: true },
                  datalabels: { display: true }
                },
              }}
            />
          </div>
          <div style={{ width: '20%' }}>
            <h4 style={{ textAlign: 'center' }}>Time Distribution</h4>
            <Pie
              data={timeData}
              options={{
                plugins: {
                  legend: { display: true },
                  tooltip: { enabled: true },
                  datalabels: { display: true }
                },
              }}
            />
          </div>
        </div>
      </Card>
    );
  
}
