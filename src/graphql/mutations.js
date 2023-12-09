/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createACTIVITIESGARMIN = /* GraphQL */ `
  mutation CreateACTIVITIESGARMIN(
    $input: CreateACTIVITIESGARMINInput!
    $condition: ModelACTIVITIESGARMINConditionInput
  ) {
    createACTIVITIESGARMIN(input: $input, condition: $condition) {
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
export const updateACTIVITIESGARMIN = /* GraphQL */ `
  mutation UpdateACTIVITIESGARMIN(
    $input: UpdateACTIVITIESGARMINInput!
    $condition: ModelACTIVITIESGARMINConditionInput
  ) {
    updateACTIVITIESGARMIN(input: $input, condition: $condition) {
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
export const deleteACTIVITIESGARMIN = /* GraphQL */ `
  mutation DeleteACTIVITIESGARMIN(
    $input: DeleteACTIVITIESGARMINInput!
    $condition: ModelACTIVITIESGARMINConditionInput
  ) {
    deleteACTIVITIESGARMIN(input: $input, condition: $condition) {
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
export const createCUSTOMER3RDPARTY = /* GraphQL */ `
  mutation CreateCUSTOMER3RDPARTY(
    $input: CreateCUSTOMER3RDPARTYInput!
    $condition: ModelCUSTOMER3RDPARTYConditionInput
  ) {
    createCUSTOMER3RDPARTY(input: $input, condition: $condition) {
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
export const updateCUSTOMER3RDPARTY = /* GraphQL */ `
  mutation UpdateCUSTOMER3RDPARTY(
    $input: UpdateCUSTOMER3RDPARTYInput!
    $condition: ModelCUSTOMER3RDPARTYConditionInput
  ) {
    updateCUSTOMER3RDPARTY(input: $input, condition: $condition) {
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
export const deleteCUSTOMER3RDPARTY = /* GraphQL */ `
  mutation DeleteCUSTOMER3RDPARTY(
    $input: DeleteCUSTOMER3RDPARTYInput!
    $condition: ModelCUSTOMER3RDPARTYConditionInput
  ) {
    deleteCUSTOMER3RDPARTY(input: $input, condition: $condition) {
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
export const createACTIVITIESTP = /* GraphQL */ `
  mutation CreateACTIVITIESTP(
    $input: CreateACTIVITIESTPInput!
    $condition: ModelACTIVITIESTPConditionInput
  ) {
    createACTIVITIESTP(input: $input, condition: $condition) {
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
export const updateACTIVITIESTP = /* GraphQL */ `
  mutation UpdateACTIVITIESTP(
    $input: UpdateACTIVITIESTPInput!
    $condition: ModelACTIVITIESTPConditionInput
  ) {
    updateACTIVITIESTP(input: $input, condition: $condition) {
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
export const deleteACTIVITIESTP = /* GraphQL */ `
  mutation DeleteACTIVITIESTP(
    $input: DeleteACTIVITIESTPInput!
    $condition: ModelACTIVITIESTPConditionInput
  ) {
    deleteACTIVITIESTP(input: $input, condition: $condition) {
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
export const createACTIVITIESSTRAVA = /* GraphQL */ `
  mutation CreateACTIVITIESSTRAVA(
    $input: CreateACTIVITIESSTRAVAInput!
    $condition: ModelACTIVITIESSTRAVAConditionInput
  ) {
    createACTIVITIESSTRAVA(input: $input, condition: $condition) {
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
export const updateACTIVITIESSTRAVA = /* GraphQL */ `
  mutation UpdateACTIVITIESSTRAVA(
    $input: UpdateACTIVITIESSTRAVAInput!
    $condition: ModelACTIVITIESSTRAVAConditionInput
  ) {
    updateACTIVITIESSTRAVA(input: $input, condition: $condition) {
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
export const deleteACTIVITIESSTRAVA = /* GraphQL */ `
  mutation DeleteACTIVITIESSTRAVA(
    $input: DeleteACTIVITIESSTRAVAInput!
    $condition: ModelACTIVITIESSTRAVAConditionInput
  ) {
    deleteACTIVITIESSTRAVA(input: $input, condition: $condition) {
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
export const createACTIVITIES360DSL = /* GraphQL */ `
  mutation CreateACTIVITIES360DSL(
    $input: CreateACTIVITIES360DSLInput!
    $condition: ModelACTIVITIES360DSLConditionInput
  ) {
    createACTIVITIES360DSL(input: $input, condition: $condition) {
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
export const updateACTIVITIES360DSL = /* GraphQL */ `
  mutation UpdateACTIVITIES360DSL(
    $input: UpdateACTIVITIES360DSLInput!
    $condition: ModelACTIVITIES360DSLConditionInput
  ) {
    updateACTIVITIES360DSL(input: $input, condition: $condition) {
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
export const deleteACTIVITIES360DSL = /* GraphQL */ `
  mutation DeleteACTIVITIES360DSL(
    $input: DeleteACTIVITIES360DSLInput!
    $condition: ModelACTIVITIES360DSLConditionInput
  ) {
    deleteACTIVITIES360DSL(input: $input, condition: $condition) {
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
export const createCUSTOMER360DSL = /* GraphQL */ `
  mutation CreateCUSTOMER360DSL(
    $input: CreateCUSTOMER360DSLInput!
    $condition: ModelCUSTOMER360DSLConditionInput
  ) {
    createCUSTOMER360DSL(input: $input, condition: $condition) {
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
export const updateCUSTOMER360DSL = /* GraphQL */ `
  mutation UpdateCUSTOMER360DSL(
    $input: UpdateCUSTOMER360DSLInput!
    $condition: ModelCUSTOMER360DSLConditionInput
  ) {
    updateCUSTOMER360DSL(input: $input, condition: $condition) {
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
export const deleteCUSTOMER360DSL = /* GraphQL */ `
  mutation DeleteCUSTOMER360DSL(
    $input: DeleteCUSTOMER360DSLInput!
    $condition: ModelCUSTOMER360DSLConditionInput
  ) {
    deleteCUSTOMER360DSL(input: $input, condition: $condition) {
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
export const createACTIVITIES360DSLCUSTOMER360DSL = /* GraphQL */ `
  mutation CreateACTIVITIES360DSLCUSTOMER360DSL(
    $input: CreateACTIVITIES360DSLCUSTOMER360DSLInput!
    $condition: ModelACTIVITIES360DSLCUSTOMER360DSLConditionInput
  ) {
    createACTIVITIES360DSLCUSTOMER360DSL(input: $input, condition: $condition) {
      id
      activities360dslID
      customer360dslID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      activities360dsl {
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
      customer360dsl {
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
    }
  }
`;
export const updateACTIVITIES360DSLCUSTOMER360DSL = /* GraphQL */ `
  mutation UpdateACTIVITIES360DSLCUSTOMER360DSL(
    $input: UpdateACTIVITIES360DSLCUSTOMER360DSLInput!
    $condition: ModelACTIVITIES360DSLCUSTOMER360DSLConditionInput
  ) {
    updateACTIVITIES360DSLCUSTOMER360DSL(input: $input, condition: $condition) {
      id
      activities360dslID
      customer360dslID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      activities360dsl {
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
      customer360dsl {
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
    }
  }
`;
export const deleteACTIVITIES360DSLCUSTOMER360DSL = /* GraphQL */ `
  mutation DeleteACTIVITIES360DSLCUSTOMER360DSL(
    $input: DeleteACTIVITIES360DSLCUSTOMER360DSLInput!
    $condition: ModelACTIVITIES360DSLCUSTOMER360DSLConditionInput
  ) {
    deleteACTIVITIES360DSLCUSTOMER360DSL(input: $input, condition: $condition) {
      id
      activities360dslID
      customer360dslID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      activities360dsl {
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
      customer360dsl {
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
    }
  }
`;
