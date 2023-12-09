// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ACTIVITIESGARMIN, CUSTOMER3RDPARTY, ACTIVITIESTP, ACTIVITIESSTRAVA, ACTIVITIES360DSL, CUSTOMER360DSL, NonTrainingDays, Events, ACTIVITIES360DSLCUSTOMER360DSL, TrainingDays, NonTrainingPeriod, ThirdPartyApplications } = initSchema(schema);

export {
  ACTIVITIESGARMIN,
  CUSTOMER3RDPARTY,
  ACTIVITIESTP,
  ACTIVITIESSTRAVA,
  ACTIVITIES360DSL,
  CUSTOMER360DSL,
  NonTrainingDays,
  Events,
  ACTIVITIES360DSLCUSTOMER360DSL,
  TrainingDays,
  NonTrainingPeriod,
  ThirdPartyApplications
};