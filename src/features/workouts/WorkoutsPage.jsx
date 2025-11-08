import React from "react";
import { useAppData } from "../app-data/AppDataContext";
import RouteLoader from "../ui/RouteLoader";
import WorkoutsView from "./components/WorkoutsView";

const REQUIRED_KEYS = ["workouts", "customer"];

const WorkoutsPage = () => {
  const { workouts, status, error } = useAppData();

  const isLoading = REQUIRED_KEYS.some(
    (key) => status[key] === "idle" || status[key] === "loading"
  );
  const hasError = REQUIRED_KEYS.some((key) => status[key] === "error");

  if (isLoading) {
    return <RouteLoader label="Workouts" error={hasError ? error : null} />;
  }

  return <WorkoutsView workouts={workouts} />;
};

export default WorkoutsPage;
