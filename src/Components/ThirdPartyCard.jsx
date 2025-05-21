import React from "react";
import { Card, Spin } from "antd";

export default function ThirdPartyCard({customer}) {


  const customerUserId = customer?.idCustomer || "";
  console.log("customerId: ", customerUserId);


  return (
    <Card className="maincardDiv">
      <b
        style={{
          justifyContent: "left",
          display: "flex",
          color: "crimson",
        }}
      >
        Third Party Applications
      </b>
      <p></p>
      <div>
        <a href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://t3fzbc4rjb.execute-api.eu-west-1.amazonaws.com/prod/tpnotification">
          Connect your TP account
        </a>
      </div>
      <div>
        <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://lm88c7efxc.execute-api.eu-west-1.amazonaws.com/prod/notification">
          Connect your Strava account
        </a>
      </div>

      <div>
        <a
          href={` https://r4hp85viv4.execute-api.eu-west-1.amazonaws.com/prod/requesttoken?userId=${customerUserId}`}
        >
          Connect your Garmin account
        </a>
      </div>
    </Card>
  );
}
