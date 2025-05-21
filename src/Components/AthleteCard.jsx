import React from "react";
import { Card } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";

export default function AthleteCard ({customer}) {
  
    return (
      <Card className="maincardDiv">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton className="mainavatarIcon">
            <Avatar
              shape="circle"
              size={60}
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${customer?.FirstName || "random"}`}
            />
          </IconButton>
          <p className="nameDiv" style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            {customer?.FirstName } {customer?.LastName}
          </p>
        </div>
        <div className="calculationDiv">
          <span className="spanDiv">
            <p className="metricHead">Following</p>
            <p className="metricValue">33</p>
          </span>
          <span className="spanDiv">
            <p className="metricHead">Followers</p>
            <p className="metricValue">32</p>
          </span>
          <span className="spanDiv">
            <p className="metricHead">Activities</p>
            <p className="metricValue">1,583</p>
          </span>
        </div>
        <Divider light />
        <p></p>
      </Card>
    );
  
}
