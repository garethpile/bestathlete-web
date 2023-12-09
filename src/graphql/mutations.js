/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      idCustomer
      LastName
      FirstName
      EmailAddress
      MobileNumber
      Gender
      DateOfBirth
      Country
      TrainingDays {
        MondayTrain
        MondayTrainHours
        TuesdayTrain
        TuesdayTrainHours
        WednesdayTrain
        WednesdayTrainHours
        ThursdayTrain
        ThursdayTrainHours
        FridayTrain
        FridayTrainHours
        SaturdayTrain
        SaturdayTrainHours
        SundayTrain
        SundayTrainHours
        __typename
      }
      NonTrainingPeriod {
        NonTrainingPeriodId
        StartDate
        EndDate
        Valid
        __typename
      }
      ThirdPartyApplications {
        Application
        ApplicationSync
        ApplicationPartyId
        ApplicationRequestOauthToken
        ApplicationRequestOauthSecret
        ApplicationUserOauthToken
        ApplicationUserOauthSecret
        ApplicationUserOauthRefreshToken
        ApplicationUserOauthTokenExpiryDate
        __typename
      }
      MetricsDateCapture
      MetricSick
      MetricInjury
      MetricSleep
      MetricWorkLifeBalance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      idCustomer
      LastName
      FirstName
      EmailAddress
      MobileNumber
      Gender
      DateOfBirth
      Country
      TrainingDays {
        MondayTrain
        MondayTrainHours
        TuesdayTrain
        TuesdayTrainHours
        WednesdayTrain
        WednesdayTrainHours
        ThursdayTrain
        ThursdayTrainHours
        FridayTrain
        FridayTrainHours
        SaturdayTrain
        SaturdayTrainHours
        SundayTrain
        SundayTrainHours
        __typename
      }
      NonTrainingPeriod {
        NonTrainingPeriodId
        StartDate
        EndDate
        Valid
        __typename
      }
      ThirdPartyApplications {
        Application
        ApplicationSync
        ApplicationPartyId
        ApplicationRequestOauthToken
        ApplicationRequestOauthSecret
        ApplicationUserOauthToken
        ApplicationUserOauthSecret
        ApplicationUserOauthRefreshToken
        ApplicationUserOauthTokenExpiryDate
        __typename
      }
      MetricsDateCapture
      MetricSick
      MetricInjury
      MetricSleep
      MetricWorkLifeBalance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      idCustomer
      LastName
      FirstName
      EmailAddress
      MobileNumber
      Gender
      DateOfBirth
      Country
      TrainingDays {
        MondayTrain
        MondayTrainHours
        TuesdayTrain
        TuesdayTrainHours
        WednesdayTrain
        WednesdayTrainHours
        ThursdayTrain
        ThursdayTrainHours
        FridayTrain
        FridayTrainHours
        SaturdayTrain
        SaturdayTrainHours
        SundayTrain
        SundayTrainHours
        __typename
      }
      NonTrainingPeriod {
        NonTrainingPeriodId
        StartDate
        EndDate
        Valid
        __typename
      }
      ThirdPartyApplications {
        Application
        ApplicationSync
        ApplicationPartyId
        ApplicationRequestOauthToken
        ApplicationRequestOauthSecret
        ApplicationUserOauthToken
        ApplicationUserOauthSecret
        ApplicationUserOauthRefreshToken
        ApplicationUserOauthTokenExpiryDate
        __typename
      }
      MetricsDateCapture
      MetricSick
      MetricInjury
      MetricSleep
      MetricWorkLifeBalance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      idCustomer
      WorkoutDescription
      WorkoutType
      WorkoutDateTime
      WorkoutMovingTime
      WorkoutDistance
      WorkoutAverageHeartRate
      WorkoutStressScore
      WorkoutCalories
      WorkoutElevationGain
      WorkoutAverageSpeed
      WorkoutAverageCadence
      WorkoutAverageTemp
      WorkoutLocation
      WorkoutRPE
      WorkoutPhysicalLevel
      WorkoutWeatherLevel
      WorkoutHydrationLevel
      WorkoutCaloriesEatenPerHour
      WorkoutAthleteFeedback
      WorkoutStravaActivityId
      WorkoutGarminActivityId
      WorkoutTPWorkoutId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      idCustomer
      WorkoutDescription
      WorkoutType
      WorkoutDateTime
      WorkoutMovingTime
      WorkoutDistance
      WorkoutAverageHeartRate
      WorkoutStressScore
      WorkoutCalories
      WorkoutElevationGain
      WorkoutAverageSpeed
      WorkoutAverageCadence
      WorkoutAverageTemp
      WorkoutLocation
      WorkoutRPE
      WorkoutPhysicalLevel
      WorkoutWeatherLevel
      WorkoutHydrationLevel
      WorkoutCaloriesEatenPerHour
      WorkoutAthleteFeedback
      WorkoutStravaActivityId
      WorkoutGarminActivityId
      WorkoutTPWorkoutId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      idCustomer
      WorkoutDescription
      WorkoutType
      WorkoutDateTime
      WorkoutMovingTime
      WorkoutDistance
      WorkoutAverageHeartRate
      WorkoutStressScore
      WorkoutCalories
      WorkoutElevationGain
      WorkoutAverageSpeed
      WorkoutAverageCadence
      WorkoutAverageTemp
      WorkoutLocation
      WorkoutRPE
      WorkoutPhysicalLevel
      WorkoutWeatherLevel
      WorkoutHydrationLevel
      WorkoutCaloriesEatenPerHour
      WorkoutAthleteFeedback
      WorkoutStravaActivityId
      WorkoutGarminActivityId
      WorkoutTPWorkoutId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      idCustomer
      EventName
      EventDate
      EventType
      EventSubType
      EventDistance
      EventPriority
      EventDescription
      EventGoalTime
      EventGoalDistance
      EventGoalPlace
      EventGoalFinish
      EventGoalPB
      EventGoalOther
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      idCustomer
      EventName
      EventDate
      EventType
      EventSubType
      EventDistance
      EventPriority
      EventDescription
      EventGoalTime
      EventGoalDistance
      EventGoalPlace
      EventGoalFinish
      EventGoalPB
      EventGoalOther
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      idCustomer
      EventName
      EventDate
      EventType
      EventSubType
      EventDistance
      EventPriority
      EventDescription
      EventGoalTime
      EventGoalDistance
      EventGoalPlace
      EventGoalFinish
      EventGoalPB
      EventGoalOther
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createStravaActivities = /* GraphQL */ `
  mutation CreateStravaActivities(
    $input: CreateStravaActivitiesInput!
    $condition: ModelStravaActivitiesConditionInput
  ) {
    createStravaActivities(input: $input, condition: $condition) {
      id
      StravaActivityId
      StravaActivityOwnerId
      StravaActivityDescription
      StravaActivityType
      StravaActivityDateTime
      StravaActivityMovingTime
      StravaActivityDistance
      StravaActivityAverageHeartRate
      StravaActivitySufferScore
      StravaActivityCalories
      StravaActivityElevationGain
      StravaActivityAverageSpeed
      StravaActivityAverageCadence
      StravaActivityAvergeTemp
      StravaActivityLocation
      StravaActivity
      StravaActivityZones
      StravaActivityAthleteFeedback
      StravaActivityRPE
      StravaActivityFatigue
      StravaActivityAthleteEffort
      StravaActivityAthleteBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateStravaActivities = /* GraphQL */ `
  mutation UpdateStravaActivities(
    $input: UpdateStravaActivitiesInput!
    $condition: ModelStravaActivitiesConditionInput
  ) {
    updateStravaActivities(input: $input, condition: $condition) {
      id
      StravaActivityId
      StravaActivityOwnerId
      StravaActivityDescription
      StravaActivityType
      StravaActivityDateTime
      StravaActivityMovingTime
      StravaActivityDistance
      StravaActivityAverageHeartRate
      StravaActivitySufferScore
      StravaActivityCalories
      StravaActivityElevationGain
      StravaActivityAverageSpeed
      StravaActivityAverageCadence
      StravaActivityAvergeTemp
      StravaActivityLocation
      StravaActivity
      StravaActivityZones
      StravaActivityAthleteFeedback
      StravaActivityRPE
      StravaActivityFatigue
      StravaActivityAthleteEffort
      StravaActivityAthleteBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteStravaActivities = /* GraphQL */ `
  mutation DeleteStravaActivities(
    $input: DeleteStravaActivitiesInput!
    $condition: ModelStravaActivitiesConditionInput
  ) {
    deleteStravaActivities(input: $input, condition: $condition) {
      id
      StravaActivityId
      StravaActivityOwnerId
      StravaActivityDescription
      StravaActivityType
      StravaActivityDateTime
      StravaActivityMovingTime
      StravaActivityDistance
      StravaActivityAverageHeartRate
      StravaActivitySufferScore
      StravaActivityCalories
      StravaActivityElevationGain
      StravaActivityAverageSpeed
      StravaActivityAverageCadence
      StravaActivityAvergeTemp
      StravaActivityLocation
      StravaActivity
      StravaActivityZones
      StravaActivityAthleteFeedback
      StravaActivityRPE
      StravaActivityFatigue
      StravaActivityAthleteEffort
      StravaActivityAthleteBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGarminActivities = /* GraphQL */ `
  mutation CreateGarminActivities(
    $input: CreateGarminActivitiesInput!
    $condition: ModelGarminActivitiesConditionInput
  ) {
    createGarminActivities(input: $input, condition: $condition) {
      id
      GarminAccountId
      GarminActivityId
      GarminActivityDescription
      GarminActivityType
      GarminActivityStartTime
      GarminActivityDistance
      GarminActivityDuration
      GarminAveragePaceInMinutesPerKilometer
      GarminActiveKilocalories
      GarminAverageHeartRateInBeatsPerMinute
      GarminActivity
      GarminActivityRPE
      GarminActivityFatigue
      GarminActivityAthleteFeedback
      GarminActivityAthleteEffort
      GarminActivityAthleteBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGarminActivities = /* GraphQL */ `
  mutation UpdateGarminActivities(
    $input: UpdateGarminActivitiesInput!
    $condition: ModelGarminActivitiesConditionInput
  ) {
    updateGarminActivities(input: $input, condition: $condition) {
      id
      GarminAccountId
      GarminActivityId
      GarminActivityDescription
      GarminActivityType
      GarminActivityStartTime
      GarminActivityDistance
      GarminActivityDuration
      GarminAveragePaceInMinutesPerKilometer
      GarminActiveKilocalories
      GarminAverageHeartRateInBeatsPerMinute
      GarminActivity
      GarminActivityRPE
      GarminActivityFatigue
      GarminActivityAthleteFeedback
      GarminActivityAthleteEffort
      GarminActivityAthleteBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGarminActivities = /* GraphQL */ `
  mutation DeleteGarminActivities(
    $input: DeleteGarminActivitiesInput!
    $condition: ModelGarminActivitiesConditionInput
  ) {
    deleteGarminActivities(input: $input, condition: $condition) {
      id
      GarminAccountId
      GarminActivityId
      GarminActivityDescription
      GarminActivityType
      GarminActivityStartTime
      GarminActivityDistance
      GarminActivityDuration
      GarminAveragePaceInMinutesPerKilometer
      GarminActiveKilocalories
      GarminAverageHeartRateInBeatsPerMinute
      GarminActivity
      GarminActivityRPE
      GarminActivityFatigue
      GarminActivityAthleteFeedback
      GarminActivityAthleteEffort
      GarminActivityAthleteBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGarminMetrics = /* GraphQL */ `
  mutation CreateGarminMetrics(
    $input: CreateGarminMetricsInput!
    $condition: ModelGarminMetricsConditionInput
  ) {
    createGarminMetrics(input: $input, condition: $condition) {
      id
      idCustomer
      GarminAccountId
      GarminUserAccessToken
      GarminSummaryId
      GarminMetricType
      GarminMetricData
      GarminMetricDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGarminMetrics = /* GraphQL */ `
  mutation UpdateGarminMetrics(
    $input: UpdateGarminMetricsInput!
    $condition: ModelGarminMetricsConditionInput
  ) {
    updateGarminMetrics(input: $input, condition: $condition) {
      id
      idCustomer
      GarminAccountId
      GarminUserAccessToken
      GarminSummaryId
      GarminMetricType
      GarminMetricData
      GarminMetricDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGarminMetrics = /* GraphQL */ `
  mutation DeleteGarminMetrics(
    $input: DeleteGarminMetricsInput!
    $condition: ModelGarminMetricsConditionInput
  ) {
    deleteGarminMetrics(input: $input, condition: $condition) {
      id
      idCustomer
      GarminAccountId
      GarminUserAccessToken
      GarminSummaryId
      GarminMetricType
      GarminMetricData
      GarminMetricDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createNonTrainingDays = /* GraphQL */ `
  mutation CreateNonTrainingDays(
    $input: CreateNonTrainingDaysInput!
    $condition: ModelNonTrainingDaysConditionInput
  ) {
    createNonTrainingDays(input: $input, condition: $condition) {
      id
      idCustomer
      Valid
      NonTrainingType
      StartDate
      EndDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNonTrainingDays = /* GraphQL */ `
  mutation UpdateNonTrainingDays(
    $input: UpdateNonTrainingDaysInput!
    $condition: ModelNonTrainingDaysConditionInput
  ) {
    updateNonTrainingDays(input: $input, condition: $condition) {
      id
      idCustomer
      Valid
      NonTrainingType
      StartDate
      EndDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNonTrainingDays = /* GraphQL */ `
  mutation DeleteNonTrainingDays(
    $input: DeleteNonTrainingDaysInput!
    $condition: ModelNonTrainingDaysConditionInput
  ) {
    deleteNonTrainingDays(input: $input, condition: $condition) {
      id
      idCustomer
      Valid
      NonTrainingType
      StartDate
      EndDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMetric = /* GraphQL */ `
  mutation CreateMetric(
    $input: CreateMetricInput!
    $condition: ModelMetricConditionInput
  ) {
    createMetric(input: $input, condition: $condition) {
      id
      idCustomer
      MetricName
      MetricDate
      MetricType
      MetricValue
      MetricSource
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMetric = /* GraphQL */ `
  mutation UpdateMetric(
    $input: UpdateMetricInput!
    $condition: ModelMetricConditionInput
  ) {
    updateMetric(input: $input, condition: $condition) {
      id
      idCustomer
      MetricName
      MetricDate
      MetricType
      MetricValue
      MetricSource
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMetric = /* GraphQL */ `
  mutation DeleteMetric(
    $input: DeleteMetricInput!
    $condition: ModelMetricConditionInput
  ) {
    deleteMetric(input: $input, condition: $condition) {
      id
      idCustomer
      MetricName
      MetricDate
      MetricType
      MetricValue
      MetricSource
      createdAt
      updatedAt
      __typename
    }
  }
`;
