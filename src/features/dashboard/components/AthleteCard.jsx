import React, { useEffect, useState } from "react";
import { Card, Spin, Avatar } from "antd";
import Divider from "@mui/material/Divider";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import DashboardMiniCalendar from "./DashboardMiniCalendar";
import AthleteSummary from "./AthleteSummary";

dayjs.extend(isSameOrAfter);

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RANGE_OPTIONS = [
  { key: "Last7Days", label: "7d", heading: "Last 7 Days", days: 7 },
  { key: "Last30Days", label: "30d", heading: "Last 30 Days", days: 30 },
  { key: "Last90Days", label: "90d", heading: "Last 90 Days", days: 90 },
  { key: "Last180Days", label: "6 mo", heading: "Last 180 Days", days: 180 },
  { key: "Last365Days", label: "1 yr", heading: "Last 365 Days", days: 365 },
];

const RANGE_OPTION_MAP = RANGE_OPTIONS.reduce((acc, option) => {
  acc[option.key] = option;
  return acc;
}, {});

const rangeButtonStyle = (active) => ({
  padding: "4px 12px",
  borderRadius: "14px",
  border: `1px solid ${active ? "#1890ff" : "#d9d9d9"}`,
  backgroundColor: active ? "#1890ff" : "#ffffff",
  color: active ? "#ffffff" : "#1890ff",
  cursor: "pointer",
  fontWeight: 600,
  transition: "all 0.2s ease",
});

const createEmptySummary = () => ({
  disciplineHours: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
  disciplineDistance: { Swim: 0, Bike: 0, Run: 0 },
  sessionCounts: { Swim: 0, Bike: 0, Run: 0, Strength: 0 },
});

const emptyLongest = { Swim: 0, Bike: 0, Run: 0 };

const getDisciplineFromType = (type = "") => {
  const normalized = type.toLowerCase();
  if (/swim/.test(normalized)) return "Swim";
  if (/bike|ride/.test(normalized)) return "Bike";
  if (/run/.test(normalized)) return "Run";
  if (/strength|gym|weight/.test(normalized)) return "Strength";
  return null;
};

// Utility function to convert decimal hours to "<hours> hrs : <minutes> mins" format
function formatHoursMinutes(decimalHours) {
  if (!Number.isFinite(decimalHours) || decimalHours <= 0) return "0 hrs : 00 mins";
  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hrs : ${minutes.toString().padStart(2, '0')} mins`;
}

const convertWindowToSummary = (windowData = {}) => {
  const toHours = (minutes) => (Number(minutes) || 0) / 60;
  const summary = {
    disciplineHours: {
      Swim: toHours(windowData.SwimDuration),
      Bike: toHours(windowData.BikeDuration),
      Run: toHours(windowData.RunDuration),
      Strength: toHours(windowData.StrengthDuration),
    },
    disciplineDistance: {
      Swim: windowData.SwimDistance || 0,
      Bike: windowData.BikeDistance || 0,
      Run: windowData.RunDistance || 0,
    },
    sessionCounts: {
      Swim: windowData.SwimSessions || 0,
      Bike: windowData.BikeSessions || 0,
      Run: windowData.RunSessions || 0,
      Strength: windowData.StrengthSessions || 0,
    },
  };

  return {
    summary,
    totalTss: windowData.TotalTSS || 0,
    longest: {
      Swim: windowData.SwimLongestDistance || 0,
      Bike: windowData.BikeLongestDistance || 0,
      Run: windowData.RunLongestDistance || 0,
    },
  };
};

const deriveSummaryFromWorkouts = (workouts = [], rangeDays = 7) => {
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return { summary: createEmptySummary(), totalTss: 0, longest: { ...emptyLongest } };
  }

  const since = dayjs().subtract(rangeDays, "day").startOf("day");
  const disciplineHours = { Swim: 0, Bike: 0, Run: 0, Strength: 0 };
  const disciplineDistance = { Swim: 0, Bike: 0, Run: 0 };
  const sessionCounts = { Swim: 0, Bike: 0, Run: 0, Strength: 0 };
  const longest = { ...emptyLongest };
  let totalTss = 0;

  workouts.forEach((workout) => {
    if (!workout?.WorkoutType || !workout?.WorkoutDateTime) return;
    const workoutDate = dayjs(workout.WorkoutDateTime);
    if (!workoutDate.isValid() || workoutDate.isBefore(since, "day")) return;

    const discipline = getDisciplineFromType(workout.WorkoutType);
    if (!discipline) return;

    const durationHours = Math.max(0, Number(workout.WorkoutMovingTime || 0) / 3600);
    const distanceKm = Math.max(0, Number(workout.WorkoutDistance || 0) / 1000);
    const tss = Number(workout.WorkoutStressScore) || 0;

    disciplineHours[discipline] += durationHours;
    sessionCounts[discipline] += 1;
    if (discipline !== "Strength" && Number.isFinite(distanceKm)) {
      disciplineDistance[discipline] += distanceKm;
      longest[discipline] = Math.max(longest[discipline], distanceKm);
    }
    totalTss += tss;
  });

  return {
    summary: { disciplineHours, disciplineDistance, sessionCounts },
    totalTss,
    longest,
  };
};

export default function AthleteCard({ customer, workouts = [], customerAvailabilities = [] }) {
  const [summary, setSummary] = useState(null);
  const [windowStats, setWindowStats] = useState(null);
  const [selectedRange, setSelectedRange] = useState(RANGE_OPTIONS[0].key);

  useEffect(() => {
    console.log("Processing workouts (from AthleteCard):", workouts);

    const rangeMeta = RANGE_OPTION_MAP[selectedRange] || RANGE_OPTIONS[0];
    const benchmarkWindow = customer?.CustomerTrainingBenchmarks?.[selectedRange];

    if (benchmarkWindow) {
      const converted = convertWindowToSummary(benchmarkWindow);
      setSummary(converted.summary);
      setWindowStats({
        label: rangeMeta.heading,
        totalTss: converted.totalTss,
        longest: converted.longest,
      });
      return;
    }

    const fallback = deriveSummaryFromWorkouts(workouts, rangeMeta.days);
    setSummary(fallback.summary);
    setWindowStats({
      label: rangeMeta.heading,
      totalTss: fallback.totalTss,
      longest: fallback.longest,
    });
  }, [customer, workouts, selectedRange]);

  const timeData = summary
    ? {
        labels: ["Swim", "Bike", "Run", "Strength"],
        datasets: [
          {
            label: "% of Time",
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
            backgroundColor: ["#36A2EB", "#4BC04B", "#FF6384", "#222222"],
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
          <Avatar
            shape="circle"
            size={60}
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${customer?.FirstName || "random"}`}
          />
          <p className="nameDiv" style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            {customer?.FirstName} {customer?.LastName}
          </p>
        </div>
        <Divider light />
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              style={rangeButtonStyle(option.key === selectedRange)}
              onClick={() => setSelectedRange(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <AthleteSummary
          summary={summary}
          formatHoursMinutes={formatHoursMinutes}
          rangeLabel={windowStats?.label}
          windowStats={windowStats}
        />

        <DashboardMiniCalendar workouts={workouts} customerAvailabilities={customerAvailabilities} />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div style={{ flex: "1 1 250px", minWidth: "250px" }}>
            <h4 style={{ textAlign: "center" }}>Time Distribution</h4>
            {timeData?.datasets?.[0]?.data?.some((val) => val > 0) && (
              <div style={{ display: "flex", justifyContent: "center" }}>
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
                        color: "#fff",
                        font: { weight: "bold" },
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
