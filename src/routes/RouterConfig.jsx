import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../Components/Dashboard"));
const Workouts = lazy(() => import("../Components/Workouts"));
const Profile = lazy(() => import("../ProfilePage/Profile"));
const ThirdParty = lazy(() => import("../ThreeSixtyDSL/ThirdParty"));
const MainLayout = lazy(() => import("../Layout/MainLayout"));
const Calendar = lazy(() => import("../Components/Calendar"));
const Administration = lazy(() => import("../Administration/Administration"));

const RouterConfig = ({
  customer,
  customerAvailabilities,
  setCustomerAvailabilities,
  refreshCustomerAvailabilities,
  events,
  workouts,
  metrics3DaysWeight,
  metrics3DaysSleep,
  userExists,
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Dashboard
                customer={customer}
                customerAvailabilities={customerAvailabilities}
                setCustomerAvailabilities={setCustomerAvailabilities}
                refreshCustomerAvailabilities={refreshCustomerAvailabilities}
                events={events}
                workouts={workouts}
                metrics3DaysWeight={metrics3DaysWeight}
                metrics3DaysSleep={metrics3DaysSleep}
              />
            }
          />
          <Route
            path="/workouts"
            element={
              <Workouts
                workouts={workouts}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile userExists={userExists} customer={customer} />}
          />
          <Route
            path="/thirdparty"
            element={<ThirdParty customer={customer} />}
          />
          <Route
            path="/administration"
            element={<Administration customer={customer} />}
          />
          <Route
            path="/calendar"
            element={
              <Calendar
                customer={customer}
                workouts={workouts}
                events={events}
                customerAvailabilities={customerAvailabilities}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;