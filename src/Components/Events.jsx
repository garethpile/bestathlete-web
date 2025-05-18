import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { API, graphqlOperation } from "aws-amplify";
import Modal from "./Modal/Modal";
import EventManagement from "./EventManagement";
import { deleteEventsById } from "../Apollo/queries";

export default function Events({ events }) {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const deleteEvents = async (id, _version) => {
    await API.graphql(
      graphqlOperation(deleteEventsById, {
        id,
        _version,
      })
    );
  };

  const handleRemove = (id, _version) => {
    deleteEvents(id, _version);
    const newEvents = events.filter((item) => item.id !== id);
    console.log("Updated events:", newEvents);
  };

  return (
    <Card className="maincardDiv">
      <Modal
        header="Enter Event Details"
        open={open}
        size="sm"
        closeHandler={() => setOpen(false)}
      >
        {selectedEvent && (
          <EventManagement event={selectedEvent} removeEvent={handleRemove} />
        )}
      </Modal>

      <Row style={{ marginRight: "10px", marginTop: "10px" }}>
        <Col>
          <b className="healthHead">Your events:</b>
          <Box paddingX={0}>
            {events.map((event) => (
              <div
                key={event.id}
                className="cardSpacingDiv"
                style={{
                  padding: "8px 12px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      backgroundColor:
                        event.EventPriority === "A"
                          ? "#d32f2f"
                          : event.EventPriority === "B"
                          ? "#f57c00"
                          : "#1976d2",
                      color: "white",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Priority: {event.EventPriority}
                  </span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedEvent(event);
                      setOpen(true);
                    }}
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    {event.EventName} - {event.EventDate}
                  </a>
                </div>
                <IconButton onClick={() => handleRemove(event.id)} size="small">
                  <DeleteIcon style={{ color: "#9c27b0" }} />
                </IconButton>
              </div>
            ))}
          </Box>
        </Col>
      </Row>
    </Card>
  );
}