import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Utility function to convert decimal hours to "HH:MM" format
function formatHoursMinutes(decimalHours) {
  if (!Number.isFinite(decimalHours) || decimalHours <= 0) return "0:00";
  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export default function AthleteCard({ customer, workouts = [] }) {

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    console.log("Processing workouts (from AthleteCard):", workouts);

    // Always handle the empty array case and reset summary
    if (!workouts || workouts.length === 0) {
      setSummary({
        disciplineHours: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
        disciplineDistance: { Swim: 0, Bike: 0, Run: 0 },
        sessionCounts: { Swim: 0, Bike: 0, Run: 0, Strength: 0 }
      });
      return;
    }

    const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day");
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

      // Distance might be null for Strength, but don't skip duration and sessionCounts for that
      if (!Number.isFinite(duration)) return;

      if (disciplineHours.hasOwnProperty(discipline)) {
        disciplineHours[discipline] += duration;
        sessionCounts[discipline] += 1;
      }
      if (disciplineDistance.hasOwnProperty(discipline) && Number.isFinite(distance)) {
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
          backgroundColor: ['#36A2EB', '#4BC04B', '#FF6384', '#222222'],
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
          backgroundColor: ['#36A2EB', '#4BC04B', '#FF6384', '#222222'],
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
            {customer?.FirstName} {customer?.LastName}
          </p>
        </div>
        <Divider light />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h3 style={{ marginTop: 16, marginBottom: 8, textAlign: 'center' }}>Last 7 Days Summary</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '650px', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none', fontWeight: "bold", textAlign: "right", padding: '8px', minWidth: 40 }}></th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Swim</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Bike</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Run</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Strength</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#d0e8ff' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none', fontWeight: "bold", textAlign: "right", padding: '8px', minWidth: 40 }}>Time Spent</th>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{formatHoursMinutes(summary?.disciplineHours.Swim) || "0:00"}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{formatHoursMinutes(summary?.disciplineHours.Bike) || "0:00"}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{formatHoursMinutes(summary?.disciplineHours.Run) || "0:00"}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{formatHoursMinutes(summary?.disciplineHours.Strength) || "0:00"}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {formatHoursMinutes(
                    (summary?.disciplineHours.Swim || 0) +
                    (summary?.disciplineHours.Bike || 0) +
                    (summary?.disciplineHours.Run || 0) +
                    (summary?.disciplineHours.Strength || 0)
                  )}
                </td>
              </tr>
              <tr>
                <th style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none', fontWeight: "bold", textAlign: "right", padding: '8px', minWidth: 40 }}># Sessions</th>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.sessionCounts.Swim || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.sessionCounts.Bike || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.sessionCounts.Run || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.sessionCounts.Strength || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {(summary?.sessionCounts.Swim || 0) +
                    (summary?.sessionCounts.Bike || 0) +
                    (summary?.sessionCounts.Run || 0) +
                    (summary?.sessionCounts.Strength || 0)}
                </td>
              </tr>
              <tr>
                <th style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none', fontWeight: "bold", textAlign: "right", padding: '8px', minWidth: 40 }}>Distance</th>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.disciplineDistance.Swim.toFixed(1) || "0.0"} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.disciplineDistance.Bike.toFixed(1) || "0.0"} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{summary?.disciplineDistance.Run.toFixed(1) || "0.0"} km</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>–</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {(
                    (summary?.disciplineDistance.Swim || 0) +
                    (summary?.disciplineDistance.Bike || 0) +
                    (summary?.disciplineDistance.Run || 0)
                  ).toFixed(1)} km
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
            <h4 style={{ textAlign: 'center' }}>Time Distribution</h4>
            {timeData?.datasets?.[0]?.data?.some(val => val > 0) && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pie
                  data={timeData}
                  width={125}
                  height={125}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: true },
                      tooltip: { enabled: true },
                      datalabels: {
                        display: true,
                        color: '#fff',
                        font: { weight: 'bold' },
                        formatter: (value, context) => {
                          const total = context.chart.data.datasets[0].data.reduce((sum, v) => sum + v, 0);
                          if (total === 0) return "0%";
                          const percent = value;
                          return percent === 0 ? "" : `${percent.toFixed(1)}%`;
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </Spin>
  );

}
