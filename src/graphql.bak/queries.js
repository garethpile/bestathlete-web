/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idCustomer
        LastName
        FirstName
        EmailAddress
        MobileNumber
        Gender
        DateOfBirth
        Country
        MetricsDateCapture
        MetricSick
        MetricInjury
        MetricSleep
        MetricWorkLifeBalance
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getStravaActivities = /* GraphQL */ `
  query GetStravaActivities($id: ID!) {
    getStravaActivities(id: $id) {
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
export const listStravaActivities = /* GraphQL */ `
  query ListStravaActivities(
    $filter: ModelStravaActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStravaActivities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getGarminActivities = /* GraphQL */ `
  query GetGarminActivities($id: ID!) {
    getGarminActivities(id: $id) {
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
export const listGarminActivities = /* GraphQL */ `
  query ListGarminActivities(
    $filter: ModelGarminActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGarminActivities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getGarminMetrics = /* GraphQL */ `
  query GetGarminMetrics($id: ID!) {
    getGarminMetrics(id: $id) {
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
export const listGarminMetrics = /* GraphQL */ `
  query ListGarminMetrics(
    $filter: ModelGarminMetricsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGarminMetrics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getNonTrainingDays = /* GraphQL */ `
  query GetNonTrainingDays($id: ID!) {
    getNonTrainingDays(id: $id) {
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
export const listNonTrainingDays = /* GraphQL */ `
  query ListNonTrainingDays(
    $filter: ModelNonTrainingDaysFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNonTrainingDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMetric = /* GraphQL */ `
  query GetMetric($id: ID!) {
    getMetric(id: $id) {
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
export const listMetrics = /* GraphQL */ `
  query ListMetrics(
    $filter: ModelMetricFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetrics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const customersByIdCustomer = /* GraphQL */ `
  query CustomersByIdCustomer(
    $idCustomer: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customersByIdCustomer(
      idCustomer: $idCustomer
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          FridayTrain
          FridayTrainHours
          MondayTrain
          MondayTrainHours
          SaturdayTrain
          SaturdayTrainHours
          SundayTrain
          WednesdayTrainHours
          WednesdayTrain
          TuesdayTrainHours
          TuesdayTrain
          ThursdayTrainHours
          ThursdayTrain
          SundayTrainHours
          }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const customersByEmailAddress = /* GraphQL */ `
  query CustomersByEmailAddress(
    $EmailAddress: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customersByEmailAddress(
      EmailAddress: $EmailAddress
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idCustomer
        LastName
        FirstName
        EmailAddress
        MobileNumber
        Gender
        DateOfBirth
        Country
        MetricsDateCapture
        MetricSick
        MetricInjury
        MetricSleep
        MetricWorkLifeBalance
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workoutsByIdCustomerAndWorkoutDateTime = /* GraphQL */ `
  query WorkoutsByIdCustomerAndWorkoutDateTime(
    $idCustomer: String!
    $WorkoutDateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsByIdCustomerAndWorkoutDateTime(
      idCustomer: $idCustomer
      WorkoutDateTime: $WorkoutDateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const eventsByIdCustomerAndEventDate = /* GraphQL */ `
  query EventsByIdCustomerAndEventDate(
    $idCustomer: String!
    $EventDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByIdCustomerAndEventDate(
      idCustomer: $idCustomer
      EventDate: $EventDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const stravaActivitiesByStravaActivityIdAndStravaActivityDateTime = /* GraphQL */ `
  query StravaActivitiesByStravaActivityIdAndStravaActivityDateTime(
    $StravaActivityId: String!
    $StravaActivityDateTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStravaActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stravaActivitiesByStravaActivityIdAndStravaActivityDateTime(
      StravaActivityId: $StravaActivityId
      StravaActivityDateTime: $StravaActivityDateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const garminActivitiesByGarminActivityIdAndGarminActivityStartTime = /* GraphQL */ `
  query GarminActivitiesByGarminActivityIdAndGarminActivityStartTime(
    $GarminActivityId: String!
    $GarminActivityStartTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGarminActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    garminActivitiesByGarminActivityIdAndGarminActivityStartTime(
      GarminActivityId: $GarminActivityId
      GarminActivityStartTime: $GarminActivityStartTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const garminMetricsByIdCustomerAndGarminMetricDate = /* GraphQL */ `
  query GarminMetricsByIdCustomerAndGarminMetricDate(
    $idCustomer: String!
    $GarminMetricDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGarminMetricsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    garminMetricsByIdCustomerAndGarminMetricDate(
      idCustomer: $idCustomer
      GarminMetricDate: $GarminMetricDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const nonTrainingDaysByIdCustomer = /* GraphQL */ `
  query NonTrainingDaysByIdCustomer(
    $idCustomer: String!
    $sortDirection: ModelSortDirection
    $filter: ModelNonTrainingDaysFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nonTrainingDaysByIdCustomer(
      idCustomer: $idCustomer
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const metricsByIdCustomerAndMetricDate = /* GraphQL */ `
  query MetricsByIdCustomerAndMetricDate(
    $idCustomer: String!
    $MetricDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMetricFilterInput
    $limit: Int
    $nextToken: String
  ) {
    metricsByIdCustomerAndMetricDate(
      idCustomer: $idCustomer
      MetricDate: $MetricDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
