import React from "react";
import DashboardView from "./components/DashboardView";
import { useAppData } from "../app-data/AppDataContext";
import RouteLoader from "../ui/RouteLoader";

const REQUIRED_KEYS = [
  "customer",
  "workouts",
  "events",
  "customerAvailabilities",
];

const DashboardPage = () => {
  const {
    customer,
    workouts,
    events,
    customerAvailabilities,
    metrics3DaysSleep,
    metrics3DaysWeight,
    status,
    error,
    setCustomerAvailabilities,
    refreshCustomerAvailabilities,
    setEvents,
  } = useAppData();

  const isLoading = REQUIRED_KEYS.some(
    (key) => status[key] === "idle" || status[key] === "loading"
  );
  const hasError = REQUIRED_KEYS.some((key) => status[key] === "error");

  if (isLoading) {
    return <RouteLoader label="Dashboard" error={hasError ? error : null} />;
  }

  return (
    <DashboardView
      customer={customer}
      workouts={workouts}
      events={events}
      customerAvailabilities={customerAvailabilities}
      metrics3DaysSleep={metrics3DaysSleep}
      metrics3DaysWeight={metrics3DaysWeight}
      setCustomerAvailabilities={setCustomerAvailabilities}
      refreshCustomerAvailabilities={refreshCustomerAvailabilities}
      setEvents={setEvents}
      workoutsNoFeedback={[]}
    />
  );
};

export default DashboardPage;
