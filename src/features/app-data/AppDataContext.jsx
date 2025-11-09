import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Auth } from "aws-amplify";
import { customerCreate, customerGetByIdCustomer } from "../../services/customerServices";
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

const TRAINING_DAY_TEMPLATE = {
  MondayTrain: false,
  MondayTrainHours: 0,
  TuesdayTrain: false,
  TuesdayTrainHours: 0,
  WednesdayTrain: false,
  WednesdayTrainHours: 0,
  ThursdayTrain: false,
  ThursdayTrainHours: 0,
  FridayTrain: false,
  FridayTrainHours: 0,
  SaturdayTrain: false,
  SaturdayTrainHours: 0,
  SundayTrain: false,
  SundayTrainHours: 0,
};

const buildDefaultTrainingDays = () => ({ ...TRAINING_DAY_TEMPLATE });

const DEFAULT_PHONE_NUMBER = "+12065550100";
const E164_REGEX = /^\+[1-9]\d{1,14}$/;

const sanitizePhoneNumber = (rawNumber) => {
  if (!rawNumber) {
    return null;
  }
  const trimmed = rawNumber.trim();
  if (E164_REGEX.test(trimmed)) {
    return trimmed;
  }
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (!digitsOnly) {
    return null;
  }
  const normalized = digitsOnly.startsWith("0")
    ? `+${digitsOnly.replace(/^0+/, "")}`
    : `+${digitsOnly}`;
  return E164_REGEX.test(normalized) ? normalized : null;
};

const buildNewCustomerPayload = (username, attributes = {}) => {
  const nameParts = (attributes.name || "").trim().split(" ").filter(Boolean);
  const derivedFirstName = attributes.given_name || nameParts[0] || "New";
  const derivedLastName =
    attributes.family_name ||
    (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Athlete");

  return {
    idCustomer: username,
    FirstName: derivedFirstName,
    LastName: derivedLastName,
    EmailAddress:
      attributes.email || `${username}@placeholder.example.com`,
    MobileNumber:
      sanitizePhoneNumber(attributes.phone_number) || DEFAULT_PHONE_NUMBER,
    Gender: attributes.gender || "Unspecified",
    DateOfBirth: attributes.birthdate || "1970-01-01",
    Country: attributes["custom:country"] || "",
    TrainingDays: buildDefaultTrainingDays(),
  };
};

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
  const [requiresProfileSetup, setRequiresProfileSetup] = useState(false);

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

  const ensureCustomerProfile = useCallback(
    async (username, attributes) => {
      const existingCustomer = await customerGetByIdCustomer(username);
      if (existingCustomer) {
        setRequiresProfileSetup(false);
        return existingCustomer;
      }

      const createdCustomer = await customerCreate(
        buildNewCustomerPayload(username, attributes)
      );
      if (!createdCustomer) {
        throw new Error("Unable to create customer profile");
      }
      setRequiresProfileSetup(true);
      return createdCustomer;
    },
    []
  );

  const loadAll = useCallback(async () => {
    setError(null);
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const username = authenticatedUser.username;
      const attributes = authenticatedUser?.attributes || {};
      setUserId(username);

      const customerData = await updateSegment("customer", () =>
        ensureCustomerProfile(username, attributes)
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
  }, [ensureCustomerProfile, updateSegment]);

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

  const markProfileComplete = useCallback(() => {
    setRequiresProfileSetup(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      ...data,
      status,
      error,
      refreshAll: loadAll,
      refreshCustomerAvailabilities,
      refreshEvents,
      requiresProfileSetup,
      markProfileComplete,
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
      requiresProfileSetup,
      markProfileComplete,
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
