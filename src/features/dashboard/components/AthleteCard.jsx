import React from "react";
import { Card } from "antd";
import DashboardMiniCalendar from "./DashboardMiniCalendar";
import FitnessCard from "./FitnessCard";

const EventPreview = ({ events = [] }) => {
  const normalizedEvents = Array.isArray(events) ? events : [];
  const formatDate = (value) => {
    try {
      return new Date(value).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return value || "";
    }
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        borderRadius: 18,
        border: "1px solid rgba(24,144,255,0.2)",
        background: "linear-gradient(135deg, #f5f9ff 0%, #eef4ff 100%)",
        padding: 16,
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>
        Upcoming Events
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {normalizedEvents.map((event) => (
          <div
            key={event.id}
            style={{
              minWidth: 220,
              borderRadius: 14,
              border: "1px solid rgba(24,144,255,0.25)",
              padding: 10,
              background: "#ffffff",
              boxShadow: "0 6px 12px rgba(15,23,42,0.08)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 600 }}>{event.EventName}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color:
                    event.EventPriority === "A"
                      ? "#dc2626"
                      : event.EventPriority === "B"
                      ? "#f97316"
                      : "#2563eb",
                }}
              >
                {event.EventPriority || "Race"}
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {formatDate(event.EventDate)}
            </div>
            {event.EventDistance && (
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {event.EventDistance} km
              </div>
            )}
          </div>
        ))}
        {normalizedEvents.length === 0 && (
          <div
            style={{
              minWidth: 220,
              borderRadius: 14,
              border: "1px dashed rgba(148,163,184,0.6)",
              padding: 10,
              background: "#ffffff",
              color: "#94a3b8",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No upcoming events
          </div>
        )}
      </div>
    </div>
  );
};

const AthleteCard = ({
  customer,
  workouts = [],
  customerAvailabilities = [],
  events = [],
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card
        className="maincardDiv"
        bodyStyle={{ padding: "20px" }}
        style={{
          borderRadius: 24,
          border: "1px solid #e2e8f0",
          boxShadow: "0 25px 65px rgba(15,23,42,0.09)",
          background: "#fdfefe",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <FitnessCard />
          <EventPreview events={events} />
        </div>
      </Card>

      <Card
        className="maincardDiv"
        bodyStyle={{ padding: "20px" }}
        style={{
          borderRadius: 24,
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
          background: "linear-gradient(135deg,#fefefe 0%,#f7f9ff 100%)",
        }}
      >
        <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>Workouts</h2>
        <DashboardMiniCalendar
          workouts={workouts}
          customerAvailabilities={customerAvailabilities}
        />
      </Card>
    </div>
  );
};

export default AthleteCard;
