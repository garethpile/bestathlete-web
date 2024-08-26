import React from 'react';
import { Row, Col, Button as AntButton } from "antd";
import AthleteCard from "./AthleteCard";
import AthleteFeedback from "./AthleteFeedback";
import NonTrainingDays from "./NonTrainingDays";
import TermsConditions from "./TermsConditions";
import EventManagement from "./EventManagement";

const Dashboard = ({ customer, events, setOpen }) => {
  const removeEvent = (id) => {
    // Logic to remove an event, if necessary
  };

  return (
    <div className="bodyDiv">
      <Row>
        <Col className="firstCol" span={12} xs={24} sm={24} lg={12} xl={12} style={{ overflowY: "auto", maxHeight: "100%" }}>
          <h1 style={{ justifyContent: "center", display: "flex", color: "crimson", marginTop: "15px" }}>
            Activity Feedback Corner
          </h1>
          <AthleteCard customer={customer} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2>Events:</h2>
            <AntButton onClick={() => setOpen(true)}>Add</AntButton>
          </div>
          {events && events.map((event) => (
            <EventManagement key={event.id} event={event} removeEvent={removeEvent} />
          ))}
        </Col>
        <Col className="thirdCol" span={12} xs={24} sm={24} style={{ overflowY: "auto", maxHeight: "100%" }}>
          <AthleteFeedback customer={customer} />
          <NonTrainingDays customer={customer} />
          <TermsConditions />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;