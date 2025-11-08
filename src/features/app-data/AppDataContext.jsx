import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Auth } from "aws-amplify";
import { customerGetByIdCustomer } from "../../services/customerServices";
import { workoutsGetIDDateTime } from "../../services/workoutServices";
import { eventGetIDDateTime } from "../../services/eventServices";
import {
  customerAvailabilitiesGetByIdCustomer,
} from "../../services/customerAvailabilityServices";
import {
  metricsGet3DaysSleep,
  metricsGet3DaysWeight,
} from "../../services/metricServices";

const AppDataContext = createContext(null);

const initialData = {
  customer: null,
  workouts: [],
  events: [],
  customerAvailabilities: [],
  metrics3DaysWeight: [],
  metrics3DaysSleep: [],
};

const initialStatus = {
  customer: "idle",
  workouts: "idle",
  events: "idle",
  customerAvailabilities: "idle",
  metrics3DaysWeight: "idle",
  metrics3DaysSleep: "idle",
};

const parseBody = (response) =>
  Array.isArray(response?.body) ? response.body : [];

const getDefaultDateWindow = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const lastWeekMonday = new Date(today);
  lastWeekMonday.setDate(today.getDate() - dayOfWeek - 6);
  const nextWeekSunday = new Date(today);
  nextWeekSunday.setDate(today.getDate() + (7 - dayOfWeek) + 7);

  return {
    startDate: lastWeekMonday.toISOString().split("T")[0],
    endDate: nextWeekSunday.toISOString().split("T")[0],
  };
};

export const AppDataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const updateSegment = useCallback(async (key, fn, parser = (x) => x) => {
    setStatus((prev) => ({ ...prev, [key]: "loading" }));
    try {
      const result = await fn();
      const parsed = parser(result);
      setData((prev) => ({ ...prev, [key]: parsed }));
      setStatus((prev) => ({ ...prev, [key]: "loaded" }));
      return parsed;
    } catch (segmentError) {
      console.error(`Failed to load ${key}`, segmentError);
      setStatus((prev) => ({ ...prev, [key]: "error" }));
      setError(segmentError);
      return null;
    }
  }, []);

  const loadAll = useCallback(async () => {
    setError(null);
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const username = authenticatedUser.username;
      setUserId(username);

      const customerData = await updateSegment("customer", () =>
        customerGetByIdCustomer(username)
      );

      if (!customerData) {
        throw new Error("Unable to load customer profile");
      }

      const { startDate, endDate } = getDefaultDateWindow();
      await Promise.all([
        updateSegment(
          "workouts",
          () => workoutsGetIDDateTime(username, startDate, endDate),
          parseBody
        ),
        updateSegment("events", () => eventGetIDDateTime(username), parseBody),
        updateSegment(
          "metrics3DaysWeight",
          () => metricsGet3DaysWeight(username),
          parseBody
        ),
        updateSegment(
          "metrics3DaysSleep",
          () => metricsGet3DaysSleep(username),
          parseBody
        ),
        updateSegment(
          "customerAvailabilities",
          () =>
            customerAvailabilitiesGetByIdCustomer(
              customerData.idCustomer || username
            ),
          parseBody
        ),
      ]);
    } catch (loadError) {
      console.error("Failed to bootstrap application data", loadError);
      setError(loadError);
    }
  }, [updateSegment]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const refreshCustomerAvailabilities = useCallback(async () => {
    const id = data.customer?.idCustomer || userId;
    if (!id) {
      return;
    }
    await updateSegment("customerAvailabilities", () =>
      customerAvailabilitiesGetByIdCustomer(id),
      parseBody
    );
  }, [data.customer?.idCustomer, updateSegment, userId]);

  const refreshEvents = useCallback(async () => {
    if (!userId) {
      return;
    }
    await updateSegment("events", () => eventGetIDDateTime(userId), parseBody);
  }, [updateSegment, userId]);

  const contextValue = useMemo(
    () => ({
      ...data,
      status,
      error,
      refreshAll: loadAll,
      refreshCustomerAvailabilities,
      refreshEvents,
      setCustomerAvailabilities: (list) =>
        setData((prev) => ({ ...prev, customerAvailabilities: list })),
      setEvents: (list) => setData((prev) => ({ ...prev, events: list })),
    }),
    [
      data,
      error,
      loadAll,
      refreshCustomerAvailabilities,
      refreshEvents,
      status,
    ]
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return ctx;
};
