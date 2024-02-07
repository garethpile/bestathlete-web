import React, { useEffect } from "react";
import "./ThreeSixtyDSL.css";
import "antd/dist/antd.min.css";
import { Row, Col } from "antd";
import { API, graphqlOperation } from "aws-amplify";
import { StravaActivityQuery } from "../Apollo/queries";
import TermsConditions from "../Components/TermsConditions";
import AthleteFeedback from "../Components/AthleteFeedback";
import NonTrainingDays from "../Components/NonTrainingDays";
import AthleteCard from "../Components/AthleteCard";
import ActivityCardStrava from "../Components/ActivityCardStrava";
import Events from "../Components/Events";

function ThreeSixtyDSL({customer}, {stravaData}) {

  console.log( stravaData);
  const [activities, setActivities] = React.useState([]);

  const sortDesByDate = (a, b) => {
    if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
      return -1;
    }
    if (new Date(a.updatedAt) < new Date(b.updatedAt)) {
      return 1;
    }
    return 0;
  };


  return (
    <div>
      {/* <Header user={userId} /> */}
      <div className="bodyDiv">
        <Row>
          <Col className="firstCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            <h1
              style={{
                justifyContent: "center",
                display: "flex",
                color: "crimson",
                marginTop: "15px",
              }}
            >
              Activity Feedback Corner
            </h1>
            <AthleteCard customer={customer} />
            <Events customer={customer}/>
            <NonTrainingDays customer={customer}/>
            
          </Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            {activities.map(
              ({
                id,
                StravaActivityType,
                StravaActivityDescription,
                StravaActivityAverageSpeed,
                StravaActivityDate,
                StravaActivityMovingTime,
                StravaActivityDistance,
                StravaActivityAverageHeartRate,
                StravaActivityAthleteBody,
                StravaActivityAthleteEffort,
                StravaActivityOwnerId,
                _version,
              }) => {
                return (
                  <div key={id} className="cardSpacingDiv">
                    <ActivityCardStrava
                      id={id}
                      version={_version}
                      StravaActivityType={StravaActivityType}
                      StravaActivityDescription={StravaActivityDescription}
                      StravaActivityAverageSpeed={StravaActivityAverageSpeed}
                      fetcchActivity={fetchActivities}
                      StravaActivityDate={StravaActivityDate}
                      StravaActivityMovingTime={StravaActivityMovingTime}
                      StravaActivityDistance={StravaActivityDistance}
                      StravaActivityAverageHeartRate={StravaActivityAverageHeartRate}
                      StravaActivityAthleteBody={StravaActivityAthleteBody}
                      StravaActivityAthleteEffort={StravaActivityAthleteEffort}
                      StravaActivityOwnerId={StravaActivityOwnerId}
                    />
                  </div>
                );
              }
            )}
          </Col>
          <Col className="thirdCol" span={8} xs={24} sm={24}>
        {/*    <AthleteFeedback customerEntity={customer} /> */}
            <TermsConditions />
            <div
              style={{
                marginRight: "40px",
                marginTop: "35px",
                marginLeft: "40px",
              }}
            ></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ThreeSixtyDSL;
