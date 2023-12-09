/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getACTIVITIESGARMIN = /* GraphQL */ `
  query GetACTIVITIESGARMIN($id: ID!) {
    getACTIVITIESGARMIN(id: $id) {
      id
      UserId360DSL
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listACTIVITIESGARMINs = /* GraphQL */ `
  query ListACTIVITIESGARMINs(
    $filter: ModelACTIVITIESGARMINFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listACTIVITIESGARMINs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        UserId360DSL
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const activitiesgarminByGarminAccountId = /* GraphQL */ `
  query ActivitiesgarminByGarminAccountId(
    $GarminAccountId: String
    $sortDirection: ModelSortDirection
    $filter: ModelACTIVITIESGARMINFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activitiesgarminByGarminAccountId(
      GarminAccountId: $GarminAccountId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        UserId360DSL
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const activitiesgarminByGarminActivityStartTime = /* GraphQL */ `
  query ActivitiesgarminByGarminActivityStartTime(
    $GarminActivityStartTime: Int
    $sortDirection: ModelSortDirection
    $filter: ModelACTIVITIESGARMINFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activitiesgarminByGarminActivityStartTime(
      GarminActivityStartTime: $GarminActivityStartTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        UserId360DSL
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncACTIVITIESGARMINS = /* GraphQL */ `
  query SyncACTIVITIESGARMINS(
    $filter: ModelACTIVITIESGARMINFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncACTIVITIESGARMINS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        UserId360DSL
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCUSTOMER3RDPARTY = /* GraphQL */ `
  query GetCUSTOMER3RDPARTY($id: ID!) {
    getCUSTOMER3RDPARTY(id: $id) {
      id
      Application
      ApplicationSync
      ApplicationRefreshToken
      ApplicationTokenExpiryDate
      ApplicationAccessToken
      customer360dslID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listCUSTOMER3RDPARTYs = /* GraphQL */ `
  query ListCUSTOMER3RDPARTYs(
    $filter: ModelCUSTOMER3RDPARTYFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCUSTOMER3RDPARTYs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Application
        ApplicationSync
        ApplicationRefreshToken
        ApplicationTokenExpiryDate
        ApplicationAccessToken
        customer360dslID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCUSTOMER3RDPARTIES = /* GraphQL */ `
  query SyncCUSTOMER3RDPARTIES(
    $filter: ModelCUSTOMER3RDPARTYFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCUSTOMER3RDPARTIES(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Application
        ApplicationSync
        ApplicationRefreshToken
        ApplicationTokenExpiryDate
        ApplicationAccessToken
        customer360dslID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getACTIVITIESTP = /* GraphQL */ `
  query GetACTIVITIESTP($id: ID!) {
    getACTIVITIESTP(id: $id) {
      id
      UserId360DSL
      TPActivityId
      TPActivityOwnerId
      TPActivityDescription
      TPActivityType
      TPActivityDate
      TPActivityMovingTime
      TPActivityDistance
      TPActivityAverageHeartRate
      TPActivityTSS
      TPActivityCalories
      TPActivityElevationGain
      TPActivityAverageSpeed
      TPActivityAverageCadence
      TPActivityAverageTemp
      TPActivityLocation
      TPActivity
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      ACTIVITIES360DSL {
        id
        UserId360DSL
        ActivityDescription
        ActivityType
        ActivityDate
        ActivityMovingTime
        ActivityDistance
        ActivityAverageHeartRate
        ActivityStressScore
        ActivityCalories
        ActivityElevationGain
        ActivityAverageSpeed
        ActivityAverageCadence
        ActivityAverageTemp
        ActivityLocation
        ActivityRPE
        ActivityFatigueLevel
        ActivityPhysicalLevel
        ActivityStravaActivityId
        ActivityStravaOwnerId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const listACTIVITIESTPs = /* GraphQL */ `
  query ListACTIVITIESTPs(
    $filter: ModelACTIVITIESTPFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listACTIVITIESTPs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        UserId360DSL
        TPActivityId
        TPActivityOwnerId
        TPActivityDescription
        TPActivityType
        TPActivityDate
        TPActivityMovingTime
        TPActivityDistance
        TPActivityAverageHeartRate
        TPActivityTSS
        TPActivityCalories
        TPActivityElevationGain
        TPActivityAverageSpeed
        TPActivityAverageCadence
        TPActivityAverageTemp
        TPActivityLocation
        TPActivity
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncACTIVITIESTPS = /* GraphQL */ `
  query SyncACTIVITIESTPS(
    $filter: ModelACTIVITIESTPFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncACTIVITIESTPS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        UserId360DSL
        TPActivityId
        TPActivityOwnerId
        TPActivityDescription
        TPActivityType
        TPActivityDate
        TPActivityMovingTime
        TPActivityDistance
        TPActivityAverageHeartRate
        TPActivityTSS
        TPActivityCalories
        TPActivityElevationGain
        TPActivityAverageSpeed
        TPActivityAverageCadence
        TPActivityAverageTemp
        TPActivityLocation
        TPActivity
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getACTIVITIESSTRAVA = /* GraphQL */ `
  query GetACTIVITIESSTRAVA($id: ID!) {
    getACTIVITIESSTRAVA(id: $id) {
      id
      UserId360DSL
      StravaActivityId
      StravaActivityOwnerId
      StravaActivityDescription
      StravaActivityType
      StravaActivityDate
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listACTIVITIESSTRAVAs = /* GraphQL */ `
  query ListACTIVITIESSTRAVAs(
    $filter: ModelACTIVITIESSTRAVAFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listACTIVITIESSTRAVAs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        UserId360DSL
        StravaActivityId
        StravaActivityOwnerId
        StravaActivityDescription
        StravaActivityType
        StravaActivityDate
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncACTIVITIESSTRAVAS = /* GraphQL */ `
  query SyncACTIVITIESSTRAVAS(
    $filter: ModelACTIVITIESSTRAVAFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncACTIVITIESSTRAVAS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        UserId360DSL
        StravaActivityId
        StravaActivityOwnerId
        StravaActivityDescription
        StravaActivityType
        StravaActivityDate
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getACTIVITIES360DSL = /* GraphQL */ `
  query GetACTIVITIES360DSL($id: ID!) {
    getACTIVITIES360DSL(id: $id) {
      id
      UserId360DSL
      ActivityDescription
      ActivityType
      ActivityDate
      ActivityMovingTime
      ActivityDistance
      ActivityAverageHeartRate
      ActivityStressScore
      ActivityCalories
      ActivityElevationGain
      ActivityAverageSpeed
      ActivityAverageCadence
      ActivityAverageTemp
      ActivityLocation
      ActivityRPE
      ActivityFatigueLevel
      ActivityPhysicalLevel
      ActivityStravaActivityId
      ActivityStravaOwnerId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      ACTIVITIESSTRAVA {
        id
        UserId360DSL
        StravaActivityId
        StravaActivityOwnerId
        StravaActivityDescription
        StravaActivityType
        StravaActivityDate
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      ACTIVITIES360DSLCUSTOMER360DSLS {
        nextToken
        startedAt
      }
    }
  }
`;
export const listACTIVITIES360DSLs = /* GraphQL */ `
  query ListACTIVITIES360DSLs(
    $filter: ModelACTIVITIES360DSLFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listACTIVITIES360DSLs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        UserId360DSL
        ActivityDescription
        ActivityType
        ActivityDate
        ActivityMovingTime
        ActivityDistance
        ActivityAverageHeartRate
        ActivityStressScore
        ActivityCalories
        ActivityElevationGain
        ActivityAverageSpeed
        ActivityAverageCadence
        ActivityAverageTemp
        ActivityLocation
        ActivityRPE
        ActivityFatigueLevel
        ActivityPhysicalLevel
        ActivityStravaActivityId
        ActivityStravaOwnerId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncACTIVITIES360DSLS = /* GraphQL */ `
  query SyncACTIVITIES360DSLS(
    $filter: ModelACTIVITIES360DSLFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncACTIVITIES360DSLS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        UserId360DSL
        ActivityDescription
        ActivityType
        ActivityDate
        ActivityMovingTime
        ActivityDistance
        ActivityAverageHeartRate
        ActivityStressScore
        ActivityCalories
        ActivityElevationGain
        ActivityAverageSpeed
        ActivityAverageCadence
        ActivityAverageTemp
        ActivityLocation
        ActivityRPE
        ActivityFatigueLevel
        ActivityPhysicalLevel
        ActivityStravaActivityId
        ActivityStravaOwnerId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCUSTOMER360DSL = /* GraphQL */ `
  query GetCUSTOMER360DSL($id: ID!) {
    getCUSTOMER360DSL(id: $id) {
      id
      UserId360DSL
      LastName
      FirstName
      EmailAddress
      MobileNumber
      Male
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
      }
      NonTrainingPeriod {
        valid
        startDate
        endDate
      }
      ThirdPartyApplications {
        application
        applicationSync
        applicationPartyId
        applicationRequestOauthToken
        applicationRequestOauthSecret
        applicationUserOauthToken
        applicationUserOauthSecret
        applicationUserOauthRefreshToken
        applicationUserOauthTokenExpiryDate
      }
      MetricsDateCapture
      MetricSick
      MetricInjury
      MetricSleep
      MetricWorkLifeBalance
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      CUSTOMER3RDPARTIES {
        nextToken
        startedAt
      }
      activities360dsls {
        nextToken
        startedAt
      }
    }
  }
`;
export const listCUSTOMER360DSLs = /* GraphQL */ `
  query ListCUSTOMER360DSLs(
    $filter: ModelCUSTOMER360DSLFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCUSTOMER360DSLs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        UserId360DSL
        LastName
        FirstName
        EmailAddress
        MobileNumber
        Male
        DateOfBirth
        Country
        MetricsDateCapture
        MetricSick
        MetricInjury
        MetricSleep
        MetricWorkLifeBalance
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const customer360dslByEmail = /* GraphQL */ `
  query Customer360dslByEmail(
    $EmailAddress: AWSEmail
    $sortDirection: ModelSortDirection
    $filter: ModelCUSTOMER360DSLFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customer360dslByEmail(
      EmailAddress: $EmailAddress
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        UserId360DSL
        LastName
        FirstName
        EmailAddress
        MobileNumber
        Male
        DateOfBirth
        Country
        MetricsDateCapture
        MetricSick
        MetricInjury
        MetricSleep
        MetricWorkLifeBalance
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCUSTOMER360DSLS = /* GraphQL */ `
  query SyncCUSTOMER360DSLS(
    $filter: ModelCUSTOMER360DSLFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCUSTOMER360DSLS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        UserId360DSL
        LastName
        FirstName
        EmailAddress
        MobileNumber
        Male
        DateOfBirth
        Country
        MetricsDateCapture
        MetricSick
        MetricInjury
        MetricSleep
        MetricWorkLifeBalance
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncACTIVITIES360DSLCUSTOMER360DSLS = /* GraphQL */ `
  query SyncACTIVITIES360DSLCUSTOMER360DSLS(
    $filter: ModelACTIVITIES360DSLCUSTOMER360DSLFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncACTIVITIES360DSLCUSTOMER360DSLS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        activities360dslID
        customer360dslID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
