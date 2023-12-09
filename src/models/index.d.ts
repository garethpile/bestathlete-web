import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type EagerTrainingDays = {
  readonly MondayTrain?: boolean | null;
  readonly MondayTrainHours?: number | null;
  readonly TuesdayTrain?: boolean | null;
  readonly TuesdayTrainHours?: number | null;
  readonly WednesdayTrain?: boolean | null;
  readonly WednesdayTrainHours?: number | null;
  readonly ThursdayTrain?: boolean | null;
  readonly ThursdayTrainHours?: number | null;
  readonly FridayTrain?: boolean | null;
  readonly FridayTrainHours?: number | null;
  readonly SaturdayTrain?: boolean | null;
  readonly SaturdayTrainHours?: number | null;
  readonly SundayTrain?: boolean | null;
  readonly SundayTrainHours?: number | null;
}

type LazyTrainingDays = {
  readonly MondayTrain?: boolean | null;
  readonly MondayTrainHours?: number | null;
  readonly TuesdayTrain?: boolean | null;
  readonly TuesdayTrainHours?: number | null;
  readonly WednesdayTrain?: boolean | null;
  readonly WednesdayTrainHours?: number | null;
  readonly ThursdayTrain?: boolean | null;
  readonly ThursdayTrainHours?: number | null;
  readonly FridayTrain?: boolean | null;
  readonly FridayTrainHours?: number | null;
  readonly SaturdayTrain?: boolean | null;
  readonly SaturdayTrainHours?: number | null;
  readonly SundayTrain?: boolean | null;
  readonly SundayTrainHours?: number | null;
}

export declare type TrainingDays = LazyLoading extends LazyLoadingDisabled ? EagerTrainingDays : LazyTrainingDays

export declare const TrainingDays: (new (init: ModelInit<TrainingDays>) => TrainingDays)

type EagerNonTrainingPeriod = {
  readonly NonTrainingPeriodId?: string | null;
  readonly valid?: boolean | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
}

type LazyNonTrainingPeriod = {
  readonly NonTrainingPeriodId?: string | null;
  readonly valid?: boolean | null;
  readonly startDate?: string | null;
  readonly endDate?: string | null;
}

export declare type NonTrainingPeriod = LazyLoading extends LazyLoadingDisabled ? EagerNonTrainingPeriod : LazyNonTrainingPeriod

export declare const NonTrainingPeriod: (new (init: ModelInit<NonTrainingPeriod>) => NonTrainingPeriod)

type EagerThirdPartyApplications = {
  readonly application: string;
  readonly applicationSync: boolean;
  readonly applicationPartyId?: string | null;
  readonly applicationRequestOauthToken?: string | null;
  readonly applicationRequestOauthSecret?: string | null;
  readonly applicationUserOauthToken?: string | null;
  readonly applicationUserOauthSecret?: string | null;
  readonly applicationUserOauthRefreshToken?: string | null;
  readonly applicationUserOauthTokenExpiryDate?: string | null;
}

type LazyThirdPartyApplications = {
  readonly application: string;
  readonly applicationSync: boolean;
  readonly applicationPartyId?: string | null;
  readonly applicationRequestOauthToken?: string | null;
  readonly applicationRequestOauthSecret?: string | null;
  readonly applicationUserOauthToken?: string | null;
  readonly applicationUserOauthSecret?: string | null;
  readonly applicationUserOauthRefreshToken?: string | null;
  readonly applicationUserOauthTokenExpiryDate?: string | null;
}

export declare type ThirdPartyApplications = LazyLoading extends LazyLoadingDisabled ? EagerThirdPartyApplications : LazyThirdPartyApplications

export declare const ThirdPartyApplications: (new (init: ModelInit<ThirdPartyApplications>) => ThirdPartyApplications)



















type EagerACTIVITIESGARMIN = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly GarminAccountId?: string | null;
  readonly GarminActivityId?: string | null;
  readonly GarminActivityDescription?: string | null;
  readonly GarminActivityType?: string | null;
  readonly GarminActivityStartTime?: number | null;
  readonly GarminActivityDistance?: number | null;
  readonly GarminActivityDuration?: number | null;
  readonly GarminAveragePaceInMinutesPerKilometer?: number | null;
  readonly GarminActiveKilocalories?: number | null;
  readonly GarminAverageHeartRateInBeatsPerMinute?: number | null;
  readonly GarminActivity?: string | null;
  readonly GarminActivityRPE?: number | null;
  readonly GarminActivityFatigue?: number | null;
  readonly GarminActivityAthleteFeedback?: boolean | null;
  readonly GarminActivityAthleteEffort?: string | null;
  readonly GarminActivityAthleteBody?: string | null;
}

type LazyACTIVITIESGARMIN = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly GarminAccountId?: string | null;
  readonly GarminActivityId?: string | null;
  readonly GarminActivityDescription?: string | null;
  readonly GarminActivityType?: string | null;
  readonly GarminActivityStartTime?: number | null;
  readonly GarminActivityDistance?: number | null;
  readonly GarminActivityDuration?: number | null;
  readonly GarminAveragePaceInMinutesPerKilometer?: number | null;
  readonly GarminActiveKilocalories?: number | null;
  readonly GarminAverageHeartRateInBeatsPerMinute?: number | null;
  readonly GarminActivity?: string | null;
  readonly GarminActivityRPE?: number | null;
  readonly GarminActivityFatigue?: number | null;
  readonly GarminActivityAthleteFeedback?: boolean | null;
  readonly GarminActivityAthleteEffort?: string | null;
  readonly GarminActivityAthleteBody?: string | null;
}

export declare type ACTIVITIESGARMIN = LazyLoading extends LazyLoadingDisabled ? EagerACTIVITIESGARMIN : LazyACTIVITIESGARMIN

export declare const ACTIVITIESGARMIN: (new (init: ModelInit<ACTIVITIESGARMIN>) => ACTIVITIESGARMIN) & {
  copyOf(source: ACTIVITIESGARMIN, mutator: (draft: MutableModel<ACTIVITIESGARMIN>) => MutableModel<ACTIVITIESGARMIN> | void): ACTIVITIESGARMIN;
}

type EagerCUSTOMER3RDPARTY = {
  readonly id: string;
  readonly Application: string;
  readonly ApplicationSync: boolean;
  readonly ApplicationRefreshToken?: string | null;
  readonly ApplicationTokenExpiryDate?: string | null;
  readonly ApplicationAccessToken?: string | null;
  readonly customer360dslID?: string | null;
}

type LazyCUSTOMER3RDPARTY = {
  readonly id: string;
  readonly Application: string;
  readonly ApplicationSync: boolean;
  readonly ApplicationRefreshToken?: string | null;
  readonly ApplicationTokenExpiryDate?: string | null;
  readonly ApplicationAccessToken?: string | null;
  readonly customer360dslID?: string | null;
}

export declare type CUSTOMER3RDPARTY = LazyLoading extends LazyLoadingDisabled ? EagerCUSTOMER3RDPARTY : LazyCUSTOMER3RDPARTY

export declare const CUSTOMER3RDPARTY: (new (init: ModelInit<CUSTOMER3RDPARTY>) => CUSTOMER3RDPARTY) & {
  copyOf(source: CUSTOMER3RDPARTY, mutator: (draft: MutableModel<CUSTOMER3RDPARTY>) => MutableModel<CUSTOMER3RDPARTY> | void): CUSTOMER3RDPARTY;
}

type EagerACTIVITIESTP = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly TPActivityId: string;
  readonly TPActivityOwnerId: string;
  readonly TPActivityDescription: string;
  readonly TPActivityType: string;
  readonly TPActivityDate: string;
  readonly TPActivityMovingTime: number;
  readonly TPActivityDistance: number;
  readonly TPActivityAverageHeartRate?: number | null;
  readonly TPActivityTSS?: number | null;
  readonly TPActivityCalories?: number | null;
  readonly TPActivityElevationGain?: number | null;
  readonly TPActivityAverageSpeed?: number | null;
  readonly TPActivityAverageCadence?: number | null;
  readonly TPActivityAverageTemp?: number | null;
  readonly ACTIVITIES360DSL?: ACTIVITIES360DSL | null;
  readonly TPActivityLocation?: string | null;
  readonly TPActivity?: string | null;
}

type LazyACTIVITIESTP = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly TPActivityId: string;
  readonly TPActivityOwnerId: string;
  readonly TPActivityDescription: string;
  readonly TPActivityType: string;
  readonly TPActivityDate: string;
  readonly TPActivityMovingTime: number;
  readonly TPActivityDistance: number;
  readonly TPActivityAverageHeartRate?: number | null;
  readonly TPActivityTSS?: number | null;
  readonly TPActivityCalories?: number | null;
  readonly TPActivityElevationGain?: number | null;
  readonly TPActivityAverageSpeed?: number | null;
  readonly TPActivityAverageCadence?: number | null;
  readonly TPActivityAverageTemp?: number | null;
  readonly ACTIVITIES360DSL: AsyncItem<ACTIVITIES360DSL | undefined>;
  readonly TPActivityLocation?: string | null;
  readonly TPActivity?: string | null;
}

export declare type ACTIVITIESTP = LazyLoading extends LazyLoadingDisabled ? EagerACTIVITIESTP : LazyACTIVITIESTP

export declare const ACTIVITIESTP: (new (init: ModelInit<ACTIVITIESTP>) => ACTIVITIESTP) & {
  copyOf(source: ACTIVITIESTP, mutator: (draft: MutableModel<ACTIVITIESTP>) => MutableModel<ACTIVITIESTP> | void): ACTIVITIESTP;
}

type EagerACTIVITIESSTRAVA = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly StravaActivityId: string;
  readonly StravaActivityOwnerId: string;
  readonly StravaActivityDescription: string;
  readonly StravaActivityType: string;
  readonly StravaActivityDate: string;
  readonly StravaActivityMovingTime: number;
  readonly StravaActivityDistance: number;
  readonly StravaActivityAverageHeartRate?: number | null;
  readonly StravaActivitySufferScore?: number | null;
  readonly StravaActivityCalories?: number | null;
  readonly StravaActivityElevationGain?: number | null;
  readonly StravaActivityAverageSpeed?: number | null;
  readonly StravaActivityAverageCadence?: number | null;
  readonly StravaActivityAvergeTemp?: number | null;
  readonly StravaActivityLocation?: string | null;
  readonly StravaActivity?: string | null;
  readonly StravaActivityZones?: string | null;
  readonly StravaActivityAthleteFeedback?: boolean | null;
  readonly StravaActivityRPE?: number | null;
  readonly StravaActivityFatigue?: number | null;
  readonly StravaActivityAthleteEffort?: string | null;
  readonly StravaActivityAthleteBody?: string | null;
}

type LazyACTIVITIESSTRAVA = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly StravaActivityId: string;
  readonly StravaActivityOwnerId: string;
  readonly StravaActivityDescription: string;
  readonly StravaActivityType: string;
  readonly StravaActivityDate: string;
  readonly StravaActivityMovingTime: number;
  readonly StravaActivityDistance: number;
  readonly StravaActivityAverageHeartRate?: number | null;
  readonly StravaActivitySufferScore?: number | null;
  readonly StravaActivityCalories?: number | null;
  readonly StravaActivityElevationGain?: number | null;
  readonly StravaActivityAverageSpeed?: number | null;
  readonly StravaActivityAverageCadence?: number | null;
  readonly StravaActivityAvergeTemp?: number | null;
  readonly StravaActivityLocation?: string | null;
  readonly StravaActivity?: string | null;
  readonly StravaActivityZones?: string | null;
  readonly StravaActivityAthleteFeedback?: boolean | null;
  readonly StravaActivityRPE?: number | null;
  readonly StravaActivityFatigue?: number | null;
  readonly StravaActivityAthleteEffort?: string | null;
  readonly StravaActivityAthleteBody?: string | null;
}

export declare type ACTIVITIESSTRAVA = LazyLoading extends LazyLoadingDisabled ? EagerACTIVITIESSTRAVA : LazyACTIVITIESSTRAVA

export declare const ACTIVITIESSTRAVA: (new (init: ModelInit<ACTIVITIESSTRAVA>) => ACTIVITIESSTRAVA) & {
  copyOf(source: ACTIVITIESSTRAVA, mutator: (draft: MutableModel<ACTIVITIESSTRAVA>) => MutableModel<ACTIVITIESSTRAVA> | void): ACTIVITIESSTRAVA;
}

type EagerACTIVITIES360DSL = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly ActivityDescription: string;
  readonly ActivityType: string;
  readonly ActivityDate: string;
  readonly ActivityMovingTime: number;
  readonly ActivityDistance: number;
  readonly ACTIVITIES360DSLCUSTOMER360DSLS?: (ACTIVITIES360DSLCUSTOMER360DSL | null)[] | null;
  readonly ACTIVITIESSTRAVA?: ACTIVITIESSTRAVA | null;
  readonly ActivityAverageHeartRate?: number | null;
  readonly ActivityStressScore?: number | null;
  readonly ActivityCalories?: number | null;
  readonly ActivityElevationGain?: number | null;
  readonly ActivityAverageSpeed?: number | null;
  readonly ActivityAverageCadence?: number | null;
  readonly ActivityAverageTemp?: number | null;
  readonly ActivityLocation?: string | null;
  readonly ActivityRPE?: number | null;
  readonly ActivityFatigueLevel?: string | null;
  readonly ActivityPhysicalLevel?: string | null;
  readonly ActivityStravaActivityId?: string | null;
  readonly ActivityStravaOwnerId?: string | null;
}

type LazyACTIVITIES360DSL = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly ActivityDescription: string;
  readonly ActivityType: string;
  readonly ActivityDate: string;
  readonly ActivityMovingTime: number;
  readonly ActivityDistance: number;
  readonly ACTIVITIES360DSLCUSTOMER360DSLS: AsyncCollection<ACTIVITIES360DSLCUSTOMER360DSL>;
  readonly ACTIVITIESSTRAVA: AsyncItem<ACTIVITIESSTRAVA | undefined>;
  readonly ActivityAverageHeartRate?: number | null;
  readonly ActivityStressScore?: number | null;
  readonly ActivityCalories?: number | null;
  readonly ActivityElevationGain?: number | null;
  readonly ActivityAverageSpeed?: number | null;
  readonly ActivityAverageCadence?: number | null;
  readonly ActivityAverageTemp?: number | null;
  readonly ActivityLocation?: string | null;
  readonly ActivityRPE?: number | null;
  readonly ActivityFatigueLevel?: string | null;
  readonly ActivityPhysicalLevel?: string | null;
  readonly ActivityStravaActivityId?: string | null;
  readonly ActivityStravaOwnerId?: string | null;
}

export declare type ACTIVITIES360DSL = LazyLoading extends LazyLoadingDisabled ? EagerACTIVITIES360DSL : LazyACTIVITIES360DSL

export declare const ACTIVITIES360DSL: (new (init: ModelInit<ACTIVITIES360DSL>) => ACTIVITIES360DSL) & {
  copyOf(source: ACTIVITIES360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSL>) => MutableModel<ACTIVITIES360DSL> | void): ACTIVITIES360DSL;
}

type EagerCUSTOMER360DSL = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly LastName?: string | null;
  readonly FirstName?: string | null;
  readonly EmailAddress?: string | null;
  readonly MobileNumber?: string | null;
  readonly Male?: boolean | null;
  readonly DateOfBirth?: string | null;
  readonly Country?: string | null;
  readonly TrainingDays?: TrainingDays | null;
  readonly NonTrainingPeriod?: (NonTrainingPeriod | null)[] | null;
  readonly ThirdPartyApplications?: (ThirdPartyApplications | null)[] | null;
  readonly MetricsDateCapture?: string | null;
  readonly MetricSick?: string | null;
  readonly MetricInjury?: string | null;
  readonly MetricSleep?: string | null;
  readonly MetricWorkLifeBalance?: string | null;
  readonly activities360dsls?: (ACTIVITIES360DSLCUSTOMER360DSL | null)[] | null;
  readonly CUSTOMER3RDPARTIES?: (CUSTOMER3RDPARTY | null)[] | null;
}

type LazyCUSTOMER360DSL = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly LastName?: string | null;
  readonly FirstName?: string | null;
  readonly EmailAddress?: string | null;
  readonly MobileNumber?: string | null;
  readonly Male?: boolean | null;
  readonly DateOfBirth?: string | null;
  readonly Country?: string | null;
  readonly TrainingDays?: TrainingDays | null;
  readonly NonTrainingPeriod?: (NonTrainingPeriod | null)[] | null;
  readonly ThirdPartyApplications?: (ThirdPartyApplications | null)[] | null;
  readonly MetricsDateCapture?: string | null;
  readonly MetricSick?: string | null;
  readonly MetricInjury?: string | null;
  readonly MetricSleep?: string | null;
  readonly MetricWorkLifeBalance?: string | null;
  readonly activities360dsls: AsyncCollection<ACTIVITIES360DSLCUSTOMER360DSL>;
  readonly CUSTOMER3RDPARTIES: AsyncCollection<CUSTOMER3RDPARTY>;
}

export declare type CUSTOMER360DSL = LazyLoading extends LazyLoadingDisabled ? EagerCUSTOMER360DSL : LazyCUSTOMER360DSL

export declare const CUSTOMER360DSL: (new (init: ModelInit<CUSTOMER360DSL>) => CUSTOMER360DSL) & {
  copyOf(source: CUSTOMER360DSL, mutator: (draft: MutableModel<CUSTOMER360DSL>) => MutableModel<CUSTOMER360DSL> | void): CUSTOMER360DSL;
}

type EagerNonTrainingDays = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly Valid?: boolean | null;
  readonly NonTrainingType?: string | null;
  readonly StartDate?: string | null;
  readonly EndDate?: string | null;
}

type LazyNonTrainingDays = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly Valid?: boolean | null;
  readonly NonTrainingType?: string | null;
  readonly StartDate?: string | null;
  readonly EndDate?: string | null;
}

export declare type NonTrainingDays = LazyLoading extends LazyLoadingDisabled ? EagerNonTrainingDays : LazyNonTrainingDays

export declare const NonTrainingDays: (new (init: ModelInit<NonTrainingDays>) => NonTrainingDays) & {
  copyOf(source: NonTrainingDays, mutator: (draft: MutableModel<NonTrainingDays>) => MutableModel<NonTrainingDays> | void): NonTrainingDays;
}

type EagerEvents = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly EventName?: string | null;
  readonly EventDate?: string | null;
  readonly EventType?: string | null;
  readonly EventDistance?: number | null;
  readonly EventPriority?: string | null;
  readonly Description?: string | null;
  readonly GoalTime?: number | null;
  readonly GoalDistance?: number | null;
  readonly GoalPlace?: number | null;
  readonly GoalFinish?: boolean | null;
  readonly GoalPB?: boolean | null;
  readonly GoalOther?: string | null;
}

type LazyEvents = {
  readonly id: string;
  readonly UserId360DSL?: string | null;
  readonly EventName?: string | null;
  readonly EventDate?: string | null;
  readonly EventType?: string | null;
  readonly EventDistance?: number | null;
  readonly EventPriority?: string | null;
  readonly Description?: string | null;
  readonly GoalTime?: number | null;
  readonly GoalDistance?: number | null;
  readonly GoalPlace?: number | null;
  readonly GoalFinish?: boolean | null;
  readonly GoalPB?: boolean | null;
  readonly GoalOther?: string | null;
}

export declare type Events = LazyLoading extends LazyLoadingDisabled ? EagerEvents : LazyEvents

export declare const Events: (new (init: ModelInit<Events>) => Events) & {
  copyOf(source: Events, mutator: (draft: MutableModel<Events>) => MutableModel<Events> | void): Events;
}

type EagerACTIVITIES360DSLCUSTOMER360DSL = {
  readonly id: string;
  readonly activities360dsl: ACTIVITIES360DSL;
  readonly customer360dsl: CUSTOMER360DSL;
}

type LazyACTIVITIES360DSLCUSTOMER360DSL = {
  readonly id: string;
  readonly activities360dsl: AsyncItem<ACTIVITIES360DSL>;
  readonly customer360dsl: AsyncItem<CUSTOMER360DSL>;
}

export declare type ACTIVITIES360DSLCUSTOMER360DSL = LazyLoading extends LazyLoadingDisabled ? EagerACTIVITIES360DSLCUSTOMER360DSL : LazyACTIVITIES360DSLCUSTOMER360DSL

export declare const ACTIVITIES360DSLCUSTOMER360DSL: (new (init: ModelInit<ACTIVITIES360DSLCUSTOMER360DSL>) => ACTIVITIES360DSLCUSTOMER360DSL) & {
  copyOf(source: ACTIVITIES360DSLCUSTOMER360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSLCUSTOMER360DSL>) => MutableModel<ACTIVITIES360DSLCUSTOMER360DSL> | void): ACTIVITIES360DSLCUSTOMER360DSL;
}