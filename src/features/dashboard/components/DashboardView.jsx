import React from "react";
import { Row, Col } from "antd";
import AthleteCard from "./AthleteCard";

const Dashboard = ({
  customer,
  customerAvailabilities = [],
  events = [],
  workouts,
}) => {
  return (
    <div className="bodyDiv" style={{ padding: "16px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AthleteCard
            customer={customer}
            workouts={workouts}
            customerAvailabilities={customerAvailabilities}
            events={events}
          />
        </Col>

      </Row>
    </div>
  );
};

export default Dashboard;
