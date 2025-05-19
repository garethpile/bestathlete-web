import React, { useState } from "react";
import { Row, Col, Button as AntButton, Collapse } from "antd";
import AthleteCard from "./AthleteCard";
import AthleteFeedback from "./AthleteFeedback";
import NonTrainingDays from "./NonTrainingDays";
import TermsConditions from "./TermsConditions";
import EventModal from "./EventModal";
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
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventCreated = async () => {
    const refreshed = await eventGetIDDateTime(customer.idCustomer);
    setEventList(Array.isArray(refreshed.body) ? refreshed.body : []);
  };

  const removeEvent = (id) => {
    setEventList((prev) => prev.filter((e) => e.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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
            Dashboard
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
                <div
                  key={event.id}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    marginBottom: "8px",
                    padding: "10px 16px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#fafafa"
                  }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                >
                  <span>
                    <strong style={{ color: event.EventPriority === "A" ? "#d32f2f" : event.EventPriority === "B" ? "#f57c00" : "#1976d2" }}>
                      {event.EventPriority} Race
                    </strong>
                    &nbsp; - {event.EventName} ({event.EventDate})
                  </span>
                </div>
              ))}

              <EventModal
                open={isModalOpen}
                setOpen={handleCloseModal}
                onEventCreated={handleEventCreated}
                customer={customer}
                existingEvents={eventList}
                event={selectedEvent}
              />
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