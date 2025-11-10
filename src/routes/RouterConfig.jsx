import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppData } from "../features/app-data/AppDataContext";

const Dashboard = lazy(() => import("../features/dashboard/DashboardPage"));
const Workouts = lazy(() => import("../features/workouts/WorkoutsPage"));
const Profile = lazy(() => import("../features/profile/ProfilePage"));
const ThirdParty = lazy(() => import("../features/third-party/ThirdPartyPage"));
const MainLayout = lazy(() => import("../Layout/MainLayout"));
const Calendar = lazy(() => import("../features/calendar/CalendarPage"));
const Administration = lazy(() => import("../features/administration/AdministrationPage"));
const PrivacyPage = lazy(() => import("../features/privacy/PrivacyPage"));

const RouterConfig = () => {
  const { customer, workouts, status, requiresProfileSetup } = useAppData();
  const assistantReady =
    status?.customer === "loaded" && status?.workouts === "loaded";
  const guard = (element) =>
    requiresProfileSetup ? <Navigate to="/profile" replace /> : element;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          element={
            <MainLayout
              customer={customer}
              workouts={workouts}
              assistantReady={assistantReady}
            />
          }
        >
          <Route path="/" element={guard(<Dashboard />)} />
          <Route path="/workouts" element={guard(<Workouts />)} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/thirdparty" element={guard(<ThirdParty />)} />
          <Route path="/administration" element={guard(<Administration />)} />
          <Route path="/calendar" element={guard(<Calendar />)} />
          <Route path="/privacy" element={guard(<PrivacyPage />)} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
