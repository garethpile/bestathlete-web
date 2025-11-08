import React from "react";
import { useAppData } from "../app-data/AppDataContext";
import RouteLoader from "../ui/RouteLoader";
import ThirdPartyView from "./components/ThirdPartyView";

const REQUIRED_KEYS = ["customer"];

const ThirdPartyPage = () => {
  const { customer, status, error } = useAppData();
  const isLoading = REQUIRED_KEYS.some(
    (key) => status[key] === "idle" || status[key] === "loading"
  );
  const hasError = REQUIRED_KEYS.some((key) => status[key] === "error");

  if (isLoading) {
    return <RouteLoader label="Third Party Connections" error={hasError ? error : null} />;
  }

  return <ThirdPartyView customer={customer} />;
};

export default ThirdPartyPage;
