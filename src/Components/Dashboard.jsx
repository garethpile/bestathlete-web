import React, { useState, useEffect } from "react";
import { Row, Col, Button as AntButton, Collapse } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AthleteCard from "./AthleteCard";
import AthleteFeedback from "./AthleteFeedback";
import TermsConditions from "./TermsConditions";
import EventModal from "./EventModal";
import UnavailabilityModal from "./UnavailabilityModal";
import { eventGetIDDateTime, eventDelete } from "../services/eventServices";
import {
  customerAvailabilitiesGetByIdCustomer,
  customerAvailabilityCreate,
  customerAvailabilityUpdate,
  customerAvailabilityDelete,
} from "../services/customerAvailabilityServices";

const { Panel } = Collapse;

const Dashboard = ({
  customer,
  customerAvailabilities = [],
  events = [],
  workouts,
  workoutsNoFeedback,
  metrics3DaysWeight,
  metrics3DaysSleep,
  setCustomerAvailabilities,
  refreshCustomerAvailabilities,
  setEvents,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventList, setEventList] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUnavailModalOpen, setIsUnavailModalOpen] = useState(false);
  const [unavailabilityList, setUnavailabilityList] = useState(Array.isArray(customerAvailabilities) ? customerAvailabilities : []);
  const [selectedUnavailability, setSelectedUnavailability] = useState(null);

  // Assuming timeDistributionData is derived from workouts or other props
  const timeDistributionData = []; // Replace with actual data computation or props

  useEffect(() => {
    if (Array.isArray(customerAvailabilities)) {
      setUnavailabilityList(customerAvailabilities);
    }
  }, [customerAvailabilities]);

  const handleEventCreated = async () => {
    const refreshed = await eventGetIDDateTime(customer.idCustomer);
    const updatedEvents = Array.isArray(refreshed.body) ? refreshed.body : [];
    setEventList(updatedEvents);
    if (typeof setEvents === "function") {
      setEvents(updatedEvents);
    }
  };

  const removeEvent = async (id) => {
    await eventDelete(id);
    const refreshed = await eventGetIDDateTime(customer.idCustomer);
    const updatedEvents = Array.isArray(refreshed.body) ? refreshed.body : [];
    setEventList(updatedEvents);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="bodyDiv" style={{ padding: "16px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AthleteCard customer={customer} workouts={workouts}/>
        </Col>

        <Col xs={24}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <h2>Last 7 Days Summary</h2>
          </div>

          <div style={{ overflowX: 'auto', maxWidth: '100%', marginBottom: 16 }}>
            <table className="seven-day-summary-table">
              {/* Existing table content here */}
            </table>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3>Time Distribution</h3>
            <PieChart data={timeDistributionData} /> {/* or however your chart is rendered */}
          </div>
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
                  <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                    <span>
                      <strong style={{ color: event.EventPriority === "A" ? "#d32f2f" : event.EventPriority === "B" ? "#f57c00" : "#1976d2" }}>
                        {event.EventPriority} Race
                      </strong>
                      &nbsp; - {event.EventName} ({event.EventDate})
                    </span>
                    <DeleteOutlined
                      style={{ color: "crimson", marginLeft: "12px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Are you sure you want to delete this event?")) {
                          removeEvent(event.id);
                        }
                      }}
                    />
                  </div>
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
          <Collapse style={{ marginBottom: 16 }}>
            <Panel header="Unavailability" key="unavailability">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h2 style={{ margin: 0 }}>Entries:</h2>
                <AntButton onClick={() => setIsUnavailModalOpen(true)}>Add</AntButton>
              </div>

              {unavailabilityList.map((entry, idx) => (
                <div
                  key={entry.id || idx}
                  style={{
                    width: "100%",
                    marginBottom: "8px",
                    padding: "10px 16px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "6px",
                    backgroundColor: "#fafafa",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedUnavailability(entry);
                    setIsUnavailModalOpen(true);
                  }}
                >
                  <div>
                    <span>
                      <strong>{entry.UnavailableReason}</strong> — From {entry.UnavailableStartDate} to {entry.UnavailableEndDate}
                    </span>
                  </div>
                  <DeleteOutlined
                    style={{ color: "crimson", marginLeft: "8px" }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure you want to delete this unavailability entry?")) {
                        await customerAvailabilityDelete(entry.id);
                        const result = await customerAvailabilitiesGetByIdCustomer(customer.idCustomer);
                        const updatedList = (result.statusCode === 200 && Array.isArray(result.body)) ? result.body : [];
                        setUnavailabilityList(updatedList);
                        if (setCustomerAvailabilities) {
                          setCustomerAvailabilities(updatedList);
                        }
                      }
                    }}
                  />
                </div>
              ))}

              <UnavailabilityModal
                open={isUnavailModalOpen}
                onClose={() => {
                  setIsUnavailModalOpen(false);
                  setSelectedUnavailability(null);
                }}
                event={selectedUnavailability}
                onSave={async (newEntry) => {
                  const payload = {
                    idCustomer: customer.idCustomer,
                    AvailableActivities: JSON.stringify(newEntry.activities),
                    UnavailableStartDate: newEntry.startDate,
                    UnavailableEndDate: newEntry.endDate,
                    UnavailableReason: newEntry.reason,
                  };

                  const response = selectedUnavailability
                    ? await customerAvailabilityUpdate({ id: selectedUnavailability.id, ...payload })
                    : await customerAvailabilityCreate(payload);

                  if (response && response.data) {
                    if (refreshCustomerAvailabilities) {
                      await refreshCustomerAvailabilities(customer.idCustomer);
                    }
                  }

                  setIsUnavailModalOpen(false);
                  setSelectedUnavailability(null);
                }}
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

            <TermsConditions />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;