import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Components/Header";
import Profile from "../ProfilePage/Profile";
import ThirdParty from "../ThreeSixtyDSL/ThirdParty";
import ThreeSixtyDSL from "../ThreeSixtyDSL/ThreeSixtyDSL";
import {
  customerGetByIdCustomer,

} from "../services/customerServices";
import {
 
  workoutsGetIDDateTime,
  workoutsGetIDDateTimeFilterAthleteFeedback
} from "../services//workoutServices";
import {
 

  eventGetIDDateTime
} from "../services/eventServices";
import {
 

  metricsGet3DaysWeight,
  metricsGet3DaysSleep
} from "../services/metricServices";


const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [customer, setCustomer] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [workoutsNoFeedback, setWorkoutsNoFeedback] = useState([]);
  const [events, setEvents] = useState([]);
  const [globalUserId, setGlobalUserId] = useState(null);
  const [metrics3DaysWeight, setMetrics3DaysWeight] = useState([]);
  const [metrics3DaysSleep, setMetrics3DaysSleep] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let authenticatedUser; // Define authenticatedUser variable
  
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        authenticatedUser = user; // Assign the user to authenticatedUser
        setGlobalUserId(authenticatedUser.username);
        return customerGetByIdCustomer(authenticatedUser.username);
      })
  
      .then((returnedCustomer) => {
        if (!returnedCustomer) {
          setUserExists(false);
          setIsLoading(false);
        } else {
          setCustomer(returnedCustomer);
          setUserExists(true);
          const today = new Date();
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const startDate = sevenDaysAgo.toISOString().split('T')[0];
          const endDate = today.toISOString().split('T')[0];

          Promise.all([
            workoutsGetIDDateTime(authenticatedUser.username, startDate, endDate),
            workoutsGetIDDateTimeFilterAthleteFeedback(authenticatedUser.username, startDate, endDate, 0),
            eventGetIDDateTime(authenticatedUser.username),
            metricsGet3DaysWeight(authenticatedUser.username),
            metricsGet3DaysSleep(authenticatedUser.username)
          ]).then(([workoutsRes, workoutsNoFeedbackRes, eventsRes, weightMetricsRes, sleepMetricsRes]) => {
            setWorkouts(workoutsRes.body || []);
            setWorkoutsNoFeedback(workoutsNoFeedbackRes.body || []);
            setEvents(eventsRes.body || []);
            setMetrics3DaysWeight(weightMetricsRes.body || []);
            setMetrics3DaysSleep(sleepMetricsRes.body || []);
            setIsLoading(false);
          }).catch(error => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
          });
        }
      })
      .catch((error) => {
        console.error("Error retrieving user:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header customerId={globalUserId} customer={customer} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/Profile" element={<Profile userExists={userExists} customer={customer} />} />
          <Route path="/ThirdParty" element={<ThirdParty customer={customer} />} />
          <Route path="/" element={<ThreeSixtyDSL customer={customer} workoutsNoFeedback={workoutsNoFeedback} events={events} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default LandingPage;
