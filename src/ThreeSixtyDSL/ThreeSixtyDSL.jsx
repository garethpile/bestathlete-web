import React, { useState } from "react";
import { Row, Col } from "antd";
import TermsConditions from "../Components/TermsConditions";
import NonTrainingDays from "../Components/NonTrainingDays";
import AthleteCard from "../Components/AthleteCard";
import AthleteFeedback from "../Components/AthleteFeedback";
import WorkoutManagement from "../Components/WorkoutManagement"; // Import WorkoutManagement
import Events from "../Components/Events";

function ThreeSixtyDSL({ customer, workoutsNoFeedback, events }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCancelWorkoutManagement = () => {
    setSelectedWorkout(null);
  };

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
                    <WorkoutManagement
                      selectedWorkout={workout}
                      setSelectedWorkout={setSelectedWorkout}
                      cancelWorkoutManagement={() => handleCancelWorkoutManagement()}
                    />
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
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ThreeSixtyDSL;