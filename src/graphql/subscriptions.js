/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onCreateCustomer(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onUpdateCustomer(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onDeleteCustomer(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
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
      WorkoutState
      WorkoutSource
      WorkoutStravaActivityId
      WorkoutGarminActivityId
      WorkoutTPWorkoutId
      WorkoutPairId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
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
      WorkoutState
      WorkoutSource
      WorkoutStravaActivityId
      WorkoutGarminActivityId
      WorkoutTPWorkoutId
      WorkoutPairId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
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
      WorkoutState
      WorkoutSource
      WorkoutStravaActivityId
      WorkoutGarminActivityId
      WorkoutTPWorkoutId
      WorkoutPairId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
      EventPrepStart
      EventPrepEnd
      EventBaseStart
      EventBaseEnd
      EventBuildStart
      EventBuildEnd
      EventPeakStart
      EventPeakEnd
      EventTaperStart
      EventTaperEnd
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
      EventPrepStart
      EventPrepEnd
      EventBaseStart
      EventBaseEnd
      EventBuildStart
      EventBuildEnd
      EventPeakStart
      EventPeakEnd
      EventTaperStart
      EventTaperEnd
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
      EventPrepStart
      EventPrepEnd
      EventBaseStart
      EventBaseEnd
      EventBuildStart
      EventBuildEnd
      EventPeakStart
      EventPeakEnd
      EventTaperStart
      EventTaperEnd
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStravaActivities = /* GraphQL */ `
  subscription OnCreateStravaActivities(
    $filter: ModelSubscriptionStravaActivitiesFilterInput
  ) {
    onCreateStravaActivities(filter: $filter) {
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
export const onUpdateStravaActivities = /* GraphQL */ `
  subscription OnUpdateStravaActivities(
    $filter: ModelSubscriptionStravaActivitiesFilterInput
  ) {
    onUpdateStravaActivities(filter: $filter) {
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
export const onDeleteStravaActivities = /* GraphQL */ `
  subscription OnDeleteStravaActivities(
    $filter: ModelSubscriptionStravaActivitiesFilterInput
  ) {
    onDeleteStravaActivities(filter: $filter) {
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
export const onCreateGarminActivities = /* GraphQL */ `
  subscription OnCreateGarminActivities(
    $filter: ModelSubscriptionGarminActivitiesFilterInput
  ) {
    onCreateGarminActivities(filter: $filter) {
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
export const onUpdateGarminActivities = /* GraphQL */ `
  subscription OnUpdateGarminActivities(
    $filter: ModelSubscriptionGarminActivitiesFilterInput
  ) {
    onUpdateGarminActivities(filter: $filter) {
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
export const onDeleteGarminActivities = /* GraphQL */ `
  subscription OnDeleteGarminActivities(
    $filter: ModelSubscriptionGarminActivitiesFilterInput
  ) {
    onDeleteGarminActivities(filter: $filter) {
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
export const onCreateGarminMetrics = /* GraphQL */ `
  subscription OnCreateGarminMetrics(
    $filter: ModelSubscriptionGarminMetricsFilterInput
  ) {
    onCreateGarminMetrics(filter: $filter) {
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
export const onUpdateGarminMetrics = /* GraphQL */ `
  subscription OnUpdateGarminMetrics(
    $filter: ModelSubscriptionGarminMetricsFilterInput
  ) {
    onUpdateGarminMetrics(filter: $filter) {
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
export const onDeleteGarminMetrics = /* GraphQL */ `
  subscription OnDeleteGarminMetrics(
    $filter: ModelSubscriptionGarminMetricsFilterInput
  ) {
    onDeleteGarminMetrics(filter: $filter) {
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
export const onCreateNonTrainingDays = /* GraphQL */ `
  subscription OnCreateNonTrainingDays(
    $filter: ModelSubscriptionNonTrainingDaysFilterInput
  ) {
    onCreateNonTrainingDays(filter: $filter) {
      id
      idCustomer
      Valid
      NonTrainingType
      StartDate
      EndDate
      NonTrainingActivitiesAllowed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNonTrainingDays = /* GraphQL */ `
  subscription OnUpdateNonTrainingDays(
    $filter: ModelSubscriptionNonTrainingDaysFilterInput
  ) {
    onUpdateNonTrainingDays(filter: $filter) {
      id
      idCustomer
      Valid
      NonTrainingType
      StartDate
      EndDate
      NonTrainingActivitiesAllowed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNonTrainingDays = /* GraphQL */ `
  subscription OnDeleteNonTrainingDays(
    $filter: ModelSubscriptionNonTrainingDaysFilterInput
  ) {
    onDeleteNonTrainingDays(filter: $filter) {
      id
      idCustomer
      Valid
      NonTrainingType
      StartDate
      EndDate
      NonTrainingActivitiesAllowed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMetric = /* GraphQL */ `
  subscription OnCreateMetric($filter: ModelSubscriptionMetricFilterInput) {
    onCreateMetric(filter: $filter) {
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
export const onUpdateMetric = /* GraphQL */ `
  subscription OnUpdateMetric($filter: ModelSubscriptionMetricFilterInput) {
    onUpdateMetric(filter: $filter) {
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
export const onDeleteMetric = /* GraphQL */ `
  subscription OnDeleteMetric($filter: ModelSubscriptionMetricFilterInput) {
    onDeleteMetric(filter: $filter) {
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
export const onCreateCustomerAvailability = /* GraphQL */ `
  subscription OnCreateCustomerAvailability(
    $filter: ModelSubscriptionCustomerAvailabilityFilterInput
  ) {
    onCreateCustomerAvailability(filter: $filter) {
      id
      idCustomer
      AvailableActivities
      UnavailableStartDate
      UnavailableEndDate
      UnavailableReason
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCustomerAvailability = /* GraphQL */ `
  subscription OnUpdateCustomerAvailability(
    $filter: ModelSubscriptionCustomerAvailabilityFilterInput
  ) {
    onUpdateCustomerAvailability(filter: $filter) {
      id
      idCustomer
      AvailableActivities
      UnavailableStartDate
      UnavailableEndDate
      UnavailableReason
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCustomerAvailability = /* GraphQL */ `
  subscription OnDeleteCustomerAvailability(
    $filter: ModelSubscriptionCustomerAvailabilityFilterInput
  ) {
    onDeleteCustomerAvailability(filter: $filter) {
      id
      idCustomer
      AvailableActivities
      UnavailableStartDate
      UnavailableEndDate
      UnavailableReason
      createdAt
      updatedAt
      __typename
    }
  }
`;
