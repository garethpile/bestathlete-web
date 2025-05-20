import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../Components/Dashboard"));
const Workouts = lazy(() => import("../Components/Workouts"));
const Profile = lazy(() => import("../ProfilePage/Profile"));
const ThirdParty = lazy(() => import("../ThreeSixtyDSL/ThirdParty"));
const MainLayout = lazy(() => import("../Layout/MainLayout"));
const Calendar = lazy(() => import("../Components/Calendar"));

const RouterConfig = ({
  customer,
  events,
  workouts,
  workoutsNoFeedback,
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
                events={events}
                workouts={workouts}
                workoutsNoFeedback={workoutsNoFeedback}
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
                workoutsNoFeedback={workoutsNoFeedback}
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
          <Route path="/calendar" element={<Calendar customer={customer} workouts={workouts} events = {events}/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;