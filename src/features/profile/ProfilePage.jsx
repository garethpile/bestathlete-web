import React, { useCallback } from "react";
import { useAppData } from "../app-data/AppDataContext";
import RouteLoader from "../ui/RouteLoader";
import ProfileView from "./components/ProfileView";

const REQUIRED_KEYS = ["customer"];

const ProfilePage = () => {
  const { customer, status, error, refreshAll, markProfileComplete } = useAppData();
  const isLoading = REQUIRED_KEYS.some(
    (key) => status[key] === "idle" || status[key] === "loading"
  );
  const hasError = REQUIRED_KEYS.some((key) => status[key] === "error");

  const handleProfileSaved = useCallback(async () => {
    markProfileComplete();
    await refreshAll();
  }, [markProfileComplete, refreshAll]);

  if (isLoading) {
    return <RouteLoader label="Profile" error={hasError ? error : null} />;
  }

  return <ProfileView customer={customer} onProfileSaved={handleProfileSaved} />;
};

export default ProfilePage;
