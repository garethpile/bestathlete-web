import React from "react";
import { Row, Col } from "antd";
import TermsConditions from "../Components/TermsConditions";
import NonTrainingDays from "../Components/NonTrainingDays";
import AthleteCard from "../Components/AthleteCard";
import AthleteFeedback from "../Components/AthleteFeedback";
import WorkoutNoFeedbackCard from "../Components/WorkoutNoFeedbackCard";
import Events from "../Components/Events";

function ThreeSixtyDSL({ customer, workoutsNoFeedback, events }) {

  console.log("ThreeSixtyDSL component loading ...");
  console.log("workoutsNoFeedback: ", workoutsNoFeedback);

  return (
    <div>
      <div className="bodyDiv">
        <Row>
        <Col
          className="firstCol"
          span={8}
          xs={24}
          sm={24}
          lg={8}
          xl={8}
          style={{ overflowY: "auto", maxHeight: "100%" }}
        >
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
            <Events events={events} />
            
          </Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            {workoutsNoFeedback &&
              workoutsNoFeedback.map((workout) => (
                workout && (
                  <div className="cardSpacingDiv" key={workout.id}>
                    <WorkoutNoFeedbackCard workout={workout} />
                  </div>
                )
              ))}
          </Col>
          <Col
          className="thirdCol"
          span={8}
          xs={24}
          sm={24}
          style={{ overflowY: "auto", maxHeight: "100%" }}
        >
          <AthleteFeedback customer={customer} />
          <NonTrainingDays customer={customer} />
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
