import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
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
  
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    console.log("Processing workouts:", workouts);
    if (!workouts || workouts.length === 0) return;

    const sevenDaysAgo = dayjs().subtract(30, "day").startOf("day");
    const disciplineHours = { Swim: 0, Bike: 0, Run: 0, Strength: 0 };
    const disciplineDistance = { Swim: 0, Bike: 0, Run: 0 };
    const sessionCounts = { Swim: 0, Bike: 0, Run: 0, Strength: 0 };

    workouts.forEach((workout) => {
      if (!workout.WorkoutType || !workout.WorkoutDateTime) return;

      const workoutDate = dayjs(workout.WorkoutDateTime);
      if (!workoutDate.isValid()) return;
      if (!workoutDate.isSameOrAfter(sevenDaysAgo, "day")) return;

      let discipline = "";
      const typeLower = workout.WorkoutType.toLowerCase();

      if (/swim/i.test(typeLower)) discipline = "Swim";
      else if (/bike|ride|virtualride/i.test(typeLower)) discipline = "Bike";
      else if (/run/i.test(typeLower)) discipline = "Run";
      else if (/strength|gym|weights/i.test(typeLower)) discipline = "Strength";
      else return;

      const duration = Number(workout.WorkoutMovingTime || 0) / 3600;
      const distance = Number(workout.WorkoutDistance || 0) / 1000;

      if (!Number.isFinite(duration) || !Number.isFinite(distance)) return;

      if (disciplineHours.hasOwnProperty(discipline)) {
        disciplineHours[discipline] += duration;
        sessionCounts[discipline] += 1;
      }
      if (disciplineDistance.hasOwnProperty(discipline)) {
        disciplineDistance[discipline] += distance;
      }
    });

    setSummary({ disciplineHours, disciplineDistance, sessionCounts });
  }, [workouts]);

  const sessionData = summary
    ? {
        labels: ['Swim', 'Bike', 'Run', 'Strength'],
        datasets: [
          {
            label: '# of Sessions',
            data: [
              summary.sessionCounts.Swim,
              summary.sessionCounts.Bike,
              summary.sessionCounts.Run,
              summary.sessionCounts.Strength,
            ],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const timeData = summary
    ? {
        labels: ['Swim', 'Bike', 'Run', 'Strength'],
        datasets: [
          {
            label: '% of Time',
            data: (() => {
              const total =
                summary.disciplineHours.Swim +
                summary.disciplineHours.Bike +
                summary.disciplineHours.Run +
                summary.disciplineHours.Strength;
              return total > 0
                ? [
                    (summary.disciplineHours.Swim / total) * 100,
                    (summary.disciplineHours.Bike / total) * 100,
                    (summary.disciplineHours.Run / total) * 100,
                    (summary.disciplineHours.Strength / total) * 100,
                  ]
                : [0, 0, 0, 0];
            })(),
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const isLoading = workouts.length > 0 && !summary;

    return (
      <Spin spinning={isLoading}>
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
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '16px' }}>
          <h3 style={{ margin: 0, whiteSpace: 'nowrap' }}>Last 7 Days Summary</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
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
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineHours.Swim.toFixed(1) || "0.0"} hrs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineHours.Bike.toFixed(1) || "0.0"} hrs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineHours.Run.toFixed(1) || "0.0"} hrs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineHours.Strength.toFixed(1) || "0.0"} hrs</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.sessionCounts.Swim || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.sessionCounts.Bike || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.sessionCounts.Run || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.sessionCounts.Strength || 0}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineDistance.Swim.toFixed(1) || "0.0"} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineDistance.Bike.toFixed(1) || "0.0"} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{summary?.disciplineDistance.Run.toFixed(1) || "0.0"} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>–</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
            <h4 style={{ textAlign: 'center' }}>Session Count</h4>
            {sessionData?.datasets?.[0]?.data?.some(val => val > 0) && (
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
            )}
          </div>
          <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
            <h4 style={{ textAlign: 'center' }}>Time Distribution</h4>
            {timeData?.datasets?.[0]?.data?.some(val => val > 0) && (
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
            )}
          </div>
        </div>
      </Card>
      </Spin>
    );
  
}
