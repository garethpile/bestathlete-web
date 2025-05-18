import React, { useState } from "react";
import { Row, Col, Button as AntButton, Collapse } from "antd";
import AthleteCard from "./AthleteCard";
import AthleteFeedback from "./AthleteFeedback";
import NonTrainingDays from "./NonTrainingDays";
import TermsConditions from "./TermsConditions";
import EventManagement from "./EventManagement";
import EventModal from "./EventModal";
import RacePhasePlanner from "./RacePhasePlanner";
import { eventGetIDDateTime } from "../services/eventServices";

const { Panel } = Collapse;

const Dashboard = ({
  customer,
  events = [],
  workouts,
  workoutsNoFeedback,
  metrics3DaysWeight,
  metrics3DaysSleep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventList, setEventList] = useState(events);

  const handleEventCreated = async () => {
    const refreshed = await eventGetIDDateTime(customer.idCustomer);
    setEventList(Array.isArray(refreshed.body) ? refreshed.body : []);
  };

  const removeEvent = (id) => {
    setEventList((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="bodyDiv" style={{ padding: "16px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
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
        </Col>

        <Col xs={24}>
          <Collapse style={{ marginBottom: 16 }}>
            <Panel header="Events" key="events">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h2 style={{ margin: 0 }}>Upcoming:</h2>
                <AntButton onClick={() => setIsModalOpen(true)}>Add</AntButton>
              </div>

              {eventList.map((event) => (
                <div key={event.id} style={{ width: "100%" }}>
                  <EventManagement event={event} removeEvent={removeEvent} />
                </div>
              ))}

              <EventModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                onEventCreated={handleEventCreated}
                customer={customer}
              />
            </Panel>
          </Collapse>

          <Collapse style={{ marginTop: 16 }}>
            <Panel header="Race Phase Planner" key="racephases">
              <RacePhasePlanner customer={customer} />
            </Panel>
          </Collapse>
        </Col>

        <Col xs={24}>
          <div style={{ width: "100%" }}>
            <AthleteFeedback customer={customer} />
          </div>
        </Col>

        <Col xs={24}>
          <div style={{ width: "100%" }}>
            <NonTrainingDays customer={customer} />
            <TermsConditions />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;