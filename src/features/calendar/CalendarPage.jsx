import React from "react";
import { useAppData } from "../app-data/AppDataContext";
import RouteLoader from "../ui/RouteLoader";
import FullCalendarView from "./components/FullCalendarView";

const REQUIRED_KEYS = ["customer", "workouts", "events", "customerAvailabilities"];

const CalendarPage = () => {
  const {
    customer,
    workouts,
    events,
    customerAvailabilities,
    status,
    error,
  } = useAppData();

  const isLoading = REQUIRED_KEYS.some(
    (key) => status[key] === "idle" || status[key] === "loading"
  );
  const hasError = REQUIRED_KEYS.some((key) => status[key] === "error");

  if (isLoading) {
    return <RouteLoader label="Calendar" error={hasError ? error : null} />;
  }

  return (
    <FullCalendarView
      customer={customer}
      workouts={workouts}
      events={events}
      customerAvailabilities={customerAvailabilities}
    />
  );
};

export default CalendarPage;
