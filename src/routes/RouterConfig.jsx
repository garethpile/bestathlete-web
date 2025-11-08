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

const RouterConfig = () => {
  const { customer } = useAppData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout customer={customer} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/thirdparty" element={<ThirdParty />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
