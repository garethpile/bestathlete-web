import React from "react";
import { Card } from "antd";
import { useLocation } from "react-router-dom";

export default function ThirdPartyCard(props) {

  /*
  try{
  //let location = useLocation();
  //console.log("location in ThirdPartyCard: ", location);
  //let locationStateCustomerEntity = location.state.customerEntity;
  //console.log("locationStateCustomerEntity: ",locationStateCustomerEntity);
  }
  catch(error){
    console.log("Error: ", error);
  }
  */
   console.log("props.customerEntity: ", props.customerEntity);
  let customerUserId = props.customerEntity.id;


  // let customerUserId = locationStateCustomerEntity.id;
  // console.log("Customer userId: ", customerUserId);
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
        <a href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://44vyjr3o2g.execute-api.eu-west-1.amazonaws.com/prod/tpnotification">
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
