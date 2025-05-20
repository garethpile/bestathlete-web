import React, { useEffect, useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Auth } from "aws-amplify";
import RouterConfig from "../routes/RouterConfig";
import {
  customerGetByIdCustomer,
} from "../services/customerServices";
import {
  workoutsGetIDDateTime,
  workoutsGetIDDateTimeFilterAthleteFeedback,
} from "../services/workoutServices";
import { eventGetIDDateTime } from "../services/eventServices";
import {
  metricsGet3DaysWeight,
  metricsGet3DaysSleep,
} from "../services/metricServices";
import {
  customerAvailabilitiesGetByIdCustomer
} from "../services/customerAvailabilityServices";
import dayjs from "dayjs";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [customer, setCustomer] = useState({});
  const [customerAvailabilities, setCustomerAvailabilities] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsNoFeedback, setWorkoutsNoFeedback] = useState([]);
  const [events, setEvents] = useState([]);
  const [metrics3DaysWeight, setMetrics3DaysWeight] = useState([]);
  const [metrics3DaysSleep, setMetrics3DaysSleep] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
        const customerData = await customerGetByIdCustomer(authenticatedUser.username);

        if (!customerData) {
          setUserExists(false);
          return;
        }

        setCustomer(customerData);
        setUserExists(true);

        const today = new Date();
        const tomorrow = new Date();
        const eightDaysAgo = new Date(today);

        tomorrow.setDate(today.getDate() + 1);
        eightDaysAgo.setDate(tomorrow.getDate() - 8);
        const startDate = eightDaysAgo.toISOString().split("T")[0];
        const endDate = tomorrow.toISOString().split("T")[0];

        const [
          workoutsRes,
          workoutsNoFeedbackRes,
          eventsRes,
          weightMetricsRes,
          sleepMetricsRes,
          customerAvailabilitiesRes,
        ] = await Promise.all([
          workoutsGetIDDateTime(authenticatedUser.username, startDate, endDate),
          workoutsGetIDDateTimeFilterAthleteFeedback(authenticatedUser.username, startDate, endDate, 0),
          eventGetIDDateTime(authenticatedUser.username),
          metricsGet3DaysWeight(authenticatedUser.username),
          metricsGet3DaysSleep(authenticatedUser.username),
          customerAvailabilitiesGetByIdCustomer(authenticatedUser.username),
        ]);

        setWorkouts(workoutsRes.body || []);
        setWorkoutsNoFeedback(workoutsNoFeedbackRes.body || []);
        setEvents(Array.isArray(eventsRes.body) ? eventsRes.body : []);
        setMetrics3DaysWeight(weightMetricsRes.body || []);
        setMetrics3DaysSleep(sleepMetricsRes.body || []);
        setCustomerAvailabilities(customerAvailabilitiesRes.body || []);

        const refreshCustomerAvailabilities = async (idCustomer) => {
          const result = await customerAvailabilitiesGetByIdCustomer(idCustomer);
          if (result.statusCode === 200) {
            setCustomerAvailabilities(result.body);
          }
        };

        // Assign refreshCustomerAvailabilities to state or ref if needed
        // Here, we define it inside useEffect but need to make it accessible outside
        // So move it outside or define it here and pass it down differently
        // For now, we will move it outside useEffect to be able to pass it to RouterConfig

      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshCustomerAvailabilities = async (idCustomer) => {
    const result = await customerAvailabilitiesGetByIdCustomer(idCustomer);
    if (result.statusCode === 200) {
      setCustomerAvailabilities(result.body);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <RouterConfig
      customer={customer}
      customerAvailabilities={customerAvailabilities}
      setCustomerAvailabilities={setCustomerAvailabilities}
      events={events}
      workouts={workouts}
      workoutsNoFeedback={workoutsNoFeedback}
      metrics3DaysWeight={metrics3DaysWeight}
      metrics3DaysSleep={metrics3DaysSleep}
      userExists={userExists}
      refreshCustomerAvailabilities={refreshCustomerAvailabilities}
    />
  );
};

export default LandingPage;