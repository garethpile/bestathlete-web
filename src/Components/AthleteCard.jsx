import React from "react";
import { Card } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";

export default function AthleteCard (props) {
  
    return (
      <Card className="maincardDiv">
        <IconButton className="mainavatarIcon">
          <Avatar
            shape="circle"
            size={60}
            src="https://joeschmoe.io/api/v1/random"
          />
        </IconButton>
        <div>
          <p className="nameDiv">{props.customerEntity?.FirstName } {props.customerEntity?.LastName}</p>
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


