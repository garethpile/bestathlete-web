import React from "react";
import { Card } from "antd";
import DashboardMiniCalendar from "./DashboardMiniCalendar";

const AthleteCard = ({
  customer,
  workouts = [],
  customerAvailabilities = [],
}) => {
  return (
    <Card className="maincardDiv" bodyStyle={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Workouts</h2>
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
        </div>
      </div>

      <DashboardMiniCalendar
        workouts={workouts}
        customerAvailabilities={customerAvailabilities}
      />
    </Card>
  );
};

export default AthleteCard;
