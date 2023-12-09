export const schema = {
    "models": {
        "ACTIVITIESGARMIN": {
            "name": "ACTIVITIESGARMIN",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminAccountId": {
                    "name": "GarminAccountId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityId": {
                    "name": "GarminActivityId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityDescription": {
                    "name": "GarminActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityType": {
                    "name": "GarminActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityStartTime": {
                    "name": "GarminActivityStartTime",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityDistance": {
                    "name": "GarminActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityDuration": {
                    "name": "GarminActivityDuration",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminAveragePaceInMinutesPerKilometer": {
                    "name": "GarminAveragePaceInMinutesPerKilometer",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActiveKilocalories": {
                    "name": "GarminActiveKilocalories",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminAverageHeartRateInBeatsPerMinute": {
                    "name": "GarminAverageHeartRateInBeatsPerMinute",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivity": {
                    "name": "GarminActivity",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityRPE": {
                    "name": "GarminActivityRPE",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityFatigue": {
                    "name": "GarminActivityFatigue",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityAthleteFeedback": {
                    "name": "GarminActivityAthleteFeedback",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityAthleteEffort": {
                    "name": "GarminActivityAthleteEffort",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GarminActivityAthleteBody": {
                    "name": "GarminActivityAthleteBody",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIESGARMINS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "activitiesgarminByGarminAccountId",
                        "fields": [
                            "GarminAccountId"
                        ],
                        "queryField": "activitiesgarminByGarminAccountId"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "activitiesgarminByGarminActivityStartTime",
                        "fields": [
                            "GarminActivityStartTime"
                        ],
                        "queryField": "activitiesgarminByGarminActivityStartTime"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "CUSTOMER3RDPARTY": {
            "name": "CUSTOMER3RDPARTY",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Application": {
                    "name": "Application",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ApplicationSync": {
                    "name": "ApplicationSync",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "ApplicationRefreshToken": {
                    "name": "ApplicationRefreshToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ApplicationTokenExpiryDate": {
                    "name": "ApplicationTokenExpiryDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "ApplicationAccessToken": {
                    "name": "ApplicationAccessToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "customer360dslID": {
                    "name": "customer360dslID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "CUSTOMER3RDPARTIES",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCUSTOMER360DSL",
                        "fields": [
                            "customer360dslID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIESTP": {
            "name": "ACTIVITIESTP",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityId": {
                    "name": "TPActivityId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityOwnerId": {
                    "name": "TPActivityOwnerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityDescription": {
                    "name": "TPActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityType": {
                    "name": "TPActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityDate": {
                    "name": "TPActivityDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityMovingTime": {
                    "name": "TPActivityMovingTime",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityDistance": {
                    "name": "TPActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "TPActivityAverageHeartRate": {
                    "name": "TPActivityAverageHeartRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityTSS": {
                    "name": "TPActivityTSS",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityCalories": {
                    "name": "TPActivityCalories",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityElevationGain": {
                    "name": "TPActivityElevationGain",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityAverageSpeed": {
                    "name": "TPActivityAverageSpeed",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityAverageCadence": {
                    "name": "TPActivityAverageCadence",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivityAverageTemp": {
                    "name": "TPActivityAverageTemp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ACTIVITIES360DSL": {
                    "name": "ACTIVITIES360DSL",
                    "isArray": false,
                    "type": {
                        "model": "ACTIVITIES360DSL"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "aCTIVITIESTPACTIVITIES360DSLId"
                    }
                },
                "TPActivityLocation": {
                    "name": "TPActivityLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TPActivity": {
                    "name": "TPActivity",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIESTPS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIESSTRAVA": {
            "name": "ACTIVITIESSTRAVA",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityId": {
                    "name": "StravaActivityId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityOwnerId": {
                    "name": "StravaActivityOwnerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityDescription": {
                    "name": "StravaActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityType": {
                    "name": "StravaActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityDate": {
                    "name": "StravaActivityDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityMovingTime": {
                    "name": "StravaActivityMovingTime",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityDistance": {
                    "name": "StravaActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "StravaActivityAverageHeartRate": {
                    "name": "StravaActivityAverageHeartRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivitySufferScore": {
                    "name": "StravaActivitySufferScore",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityCalories": {
                    "name": "StravaActivityCalories",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityElevationGain": {
                    "name": "StravaActivityElevationGain",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAverageSpeed": {
                    "name": "StravaActivityAverageSpeed",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAverageCadence": {
                    "name": "StravaActivityAverageCadence",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAvergeTemp": {
                    "name": "StravaActivityAvergeTemp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityLocation": {
                    "name": "StravaActivityLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivity": {
                    "name": "StravaActivity",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityZones": {
                    "name": "StravaActivityZones",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAthleteFeedback": {
                    "name": "StravaActivityAthleteFeedback",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityRPE": {
                    "name": "StravaActivityRPE",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityFatigue": {
                    "name": "StravaActivityFatigue",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAthleteEffort": {
                    "name": "StravaActivityAthleteEffort",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "StravaActivityAthleteBody": {
                    "name": "StravaActivityAthleteBody",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIESSTRAVAS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "StravaActivityOwnerId-index",
                        "fields": [
                            "StravaActivityOwnerId"
                        ],
                        "queryField": "activitiesStravaByStravaActivityOwnerId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIES360DSL": {
            "name": "ACTIVITIES360DSL",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityDescription": {
                    "name": "ActivityDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityType": {
                    "name": "ActivityType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityDate": {
                    "name": "ActivityDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityMovingTime": {
                    "name": "ActivityMovingTime",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityDistance": {
                    "name": "ActivityDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "ACTIVITIES360DSLCUSTOMER360DSLS": {
                    "name": "ACTIVITIES360DSLCUSTOMER360DSLS",
                    "isArray": true,
                    "type": {
                        "model": "ACTIVITIES360DSLCUSTOMER360DSL"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "activities360dsl"
                    }
                },
                "ACTIVITIESSTRAVA": {
                    "name": "ACTIVITIESSTRAVA",
                    "isArray": false,
                    "type": {
                        "model": "ACTIVITIESSTRAVA"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "aCTIVITIES360DSLACTIVITIESSTRAVAId"
                    }
                },
                "ActivityAverageHeartRate": {
                    "name": "ActivityAverageHeartRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityStressScore": {
                    "name": "ActivityStressScore",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityCalories": {
                    "name": "ActivityCalories",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityElevationGain": {
                    "name": "ActivityElevationGain",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityAverageSpeed": {
                    "name": "ActivityAverageSpeed",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityAverageCadence": {
                    "name": "ActivityAverageCadence",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityAverageTemp": {
                    "name": "ActivityAverageTemp",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityLocation": {
                    "name": "ActivityLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityRPE": {
                    "name": "ActivityRPE",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityFatigueLevel": {
                    "name": "ActivityFatigueLevel",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityPhysicalLevel": {
                    "name": "ActivityPhysicalLevel",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityStravaActivityId": {
                    "name": "ActivityStravaActivityId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ActivityStravaOwnerId": {
                    "name": "ActivityStravaOwnerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIES360DSLS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "CUSTOMER360DSL": {
            "name": "CUSTOMER360DSL",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "LastName": {
                    "name": "LastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "FirstName": {
                    "name": "FirstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EmailAddress": {
                    "name": "EmailAddress",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": false,
                    "attributes": []
                },
                "MobileNumber": {
                    "name": "MobileNumber",
                    "isArray": false,
                    "type": "AWSPhone",
                    "isRequired": false,
                    "attributes": []
                },
                "Male": {
                    "name": "Male",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "DateOfBirth": {
                    "name": "DateOfBirth",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "Country": {
                    "name": "Country",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "TrainingDays": {
                    "name": "TrainingDays",
                    "isArray": false,
                    "type": {
                        "nonModel": "TrainingDays"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "NonTrainingPeriod": {
                    "name": "NonTrainingPeriod",
                    "isArray": true,
                    "type": {
                        "nonModel": "NonTrainingPeriod"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "ThirdPartyApplications": {
                    "name": "ThirdPartyApplications",
                    "isArray": true,
                    "type": {
                        "nonModel": "ThirdPartyApplications"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "MetricsDateCapture": {
                    "name": "MetricsDateCapture",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "MetricSick": {
                    "name": "MetricSick",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "MetricInjury": {
                    "name": "MetricInjury",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "MetricSleep": {
                    "name": "MetricSleep",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "MetricWorkLifeBalance": {
                    "name": "MetricWorkLifeBalance",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "activities360dsls": {
                    "name": "activities360dsls",
                    "isArray": true,
                    "type": {
                        "model": "ACTIVITIES360DSLCUSTOMER360DSL"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "customer360dsl"
                    }
                },
                "CUSTOMER3RDPARTIES": {
                    "name": "CUSTOMER3RDPARTIES",
                    "isArray": true,
                    "type": {
                        "model": "CUSTOMER3RDPARTY"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "customer360dslID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "CUSTOMER360DSLS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "customer360dslByEmail",
                        "fields": [
                            "EmailAddress"
                        ],
                        "queryField": "customer360dslByEmail"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "NonTrainingDays": {
            "name": "NonTrainingDays",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Valid": {
                    "name": "Valid",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "NonTrainingType": {
                    "name": "NonTrainingType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "StartDate": {
                    "name": "StartDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "EndDate": {
                    "name": "EndDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "NonTrainingDays",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "nonTrainingDaysBy360dslId",
                        "fields": [
                            "UserId360DSL"
                        ],
                        "queryField": "nonTrainingDaysBy360dslId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Events": {
            "name": "Events",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "UserId360DSL": {
                    "name": "UserId360DSL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EventName": {
                    "name": "EventName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EventDate": {
                    "name": "EventDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "EventType": {
                    "name": "EventType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "EventDistance": {
                    "name": "EventDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "EventPriority": {
                    "name": "EventPriority",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Description": {
                    "name": "Description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GoalTime": {
                    "name": "GoalTime",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "GoalDistance": {
                    "name": "GoalDistance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "GoalPlace": {
                    "name": "GoalPlace",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "GoalFinish": {
                    "name": "GoalFinish",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "GoalPB": {
                    "name": "GoalPB",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "GoalOther": {
                    "name": "GoalOther",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Events",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "eventsBy360dslId",
                        "fields": [
                            "UserId360DSL"
                        ],
                        "queryField": "eventsBy360dslId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ACTIVITIES360DSLCUSTOMER360DSL": {
            "name": "ACTIVITIES360DSLCUSTOMER360DSL",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "activities360dsl": {
                    "name": "activities360dsl",
                    "isArray": false,
                    "type": {
                        "model": "ACTIVITIES360DSL"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "activities360dslID"
                    }
                },
                "customer360dsl": {
                    "name": "customer360dsl",
                    "isArray": false,
                    "type": {
                        "model": "CUSTOMER360DSL"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "customer360dslID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "ACTIVITIES360DSLCUSTOMER360DSLS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "queries": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byACTIVITIES360DSL",
                        "fields": [
                            "activities360dslID",
                            "customer360dslID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCUSTOMER360DSL",
                        "fields": [
                            "customer360dslID",
                            "activities360dslID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {
        "TrainingDays": {
            "name": "TrainingDays",
            "fields": {
                "MondayTrain": {
                    "name": "MondayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "MondayTrainHours": {
                    "name": "MondayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "TuesdayTrain": {
                    "name": "TuesdayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "TuesdayTrainHours": {
                    "name": "TuesdayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "WednesdayTrain": {
                    "name": "WednesdayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "WednesdayTrainHours": {
                    "name": "WednesdayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ThursdayTrain": {
                    "name": "ThursdayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "ThursdayTrainHours": {
                    "name": "ThursdayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "FridayTrain": {
                    "name": "FridayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "FridayTrainHours": {
                    "name": "FridayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "SaturdayTrain": {
                    "name": "SaturdayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "SaturdayTrainHours": {
                    "name": "SaturdayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "SundayTrain": {
                    "name": "SundayTrain",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "SundayTrainHours": {
                    "name": "SundayTrainHours",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "NonTrainingPeriod": {
            "name": "NonTrainingPeriod",
            "fields": {
                "NonTrainingPeriodId": {
                    "name": "NonTrainingPeriodId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "valid": {
                    "name": "valid",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "ThirdPartyApplications": {
            "name": "ThirdPartyApplications",
            "fields": {
                "application": {
                    "name": "application",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "applicationSync": {
                    "name": "applicationSync",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "applicationPartyId": {
                    "name": "applicationPartyId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "applicationRequestOauthToken": {
                    "name": "applicationRequestOauthToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "applicationRequestOauthSecret": {
                    "name": "applicationRequestOauthSecret",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "applicationUserOauthToken": {
                    "name": "applicationUserOauthToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "applicationUserOauthSecret": {
                    "name": "applicationUserOauthSecret",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "applicationUserOauthRefreshToken": {
                    "name": "applicationUserOauthRefreshToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "applicationUserOauthTokenExpiryDate": {
                    "name": "applicationUserOauthTokenExpiryDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "159402a5276f292aa5a673197135d041"
};