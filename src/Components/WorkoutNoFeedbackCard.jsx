import React from "react";
import { Card, Avatar, Select, Button } from "antd";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { updateWorkout } from "../graphql/mutations.js";

const { Option } = Select;

const iconDictionary = {
  Swim: <PoolIcon fontSize="large" />,
  WeightTraining: <FitnessCenterIcon fontSize="large" />,
  Workout: <FitnessCenterIcon fontSize="large" />,
  Run: <DirectionsRunIcon fontSize="large" />,
  Hike: <DirectionsRunIcon fontSize="large" />,
  Ride: <DirectionsBikeIcon fontSize="large" />,
  VirtualRide: <PedalBikeIcon fontSize="large" />,
};

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + ":" : "";
  var mDisplay =
    m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : h > 0 ? "00:" : m > 0 ? m + ":" : "";
  var sDisplay = s < 10 ? "0" + s : s;
  return hDisplay + mDisplay + sDisplay;
}

function MetresPerSecondToMinsPerKm(MetresPerSecond, StravaActivityType) {
  if (MetresPerSecond === 0 || StravaActivityType === "WeightTraining") {
    return "-";
  } else {
    var MetresPerMinute = MetresPerSecond * 60;
    var MinutesPerKm = 1000 / MetresPerMinute;

    var MinutesPerKmFormatted = MinPerKmFraction(
      MinutesPerKm.toFixed(2),
      StravaActivityType
    );
    return MinutesPerKmFormatted;
  }
}

function MinPerKmFraction(MinPerKm, StravaActivityType) {
  switch (StravaActivityType) {
    case "Swim":
      MinPerKm = Number(MinPerKm);
      var SecPerHundred = (MinPerKm / 10) * 60;
      var Mins = Math.floor(SecPerHundred / 60);
      var Secs = Math.floor(SecPerHundred - Mins * 60);
      if (Secs < 10) {
        Secs = "0" + Secs;
      }
      return Mins + ":" + Secs;
    case "Run":
      MinPerKm = Number(MinPerKm);
      var mins = Math.floor(MinPerKm / 1);
      var fraction = Math.floor((MinPerKm - mins) * 60);
      if (fraction < 10) {
        fraction = "0" + fraction;
      }
      return mins + ":" + fraction;
    default:
      return "-";
  }
}

export default function WorkoutNoFeedbackCard({ workout }) {
  console.log("WorkoutNoFeedbackCard Component loading .... workout: ", workout);

  const [dropdownActivityEffort, setDropdownActivityEffort] = React.useState("");
  const [dropdownActivityBody, setDropdownActivityBody] = React.useState("");

  async function updateActivity(id) {
    try {
      if (!dropdownActivityBody || !dropdownActivityEffort) {
        alert("Please Select Required Fields");
        return;
      }
      //console.log("Workout WorkoutPhysicalLevel: ", dropdownActivityBody);

      const updateActivity = await API.graphql(
        graphqlOperation(updateWorkout, {
          id: id,
          WorkoutPhysicalLevel: dropdownActivityBody,
          WorkoutRPE: dropdownActivityEffort,
          WorkoutAthleteFeedback: true,
  
        })
      );
      console.log("updateActivity response: ", updateActivity);
      if (typeof workout.fetchActivity === "function") {
        workout.fetchActivity(workout.StravaActivityOwnerId);
      }
    } catch (err) {
      console.log("Error updating activity", err);
    }
  }

  return (
    <Card className="maincardDiv">


      <div className="metricDiv" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        <div className="metricRow">
          <span className="metricHead" style={{ fontWeight: "bold" }}>Distance:</span>{" "}
          <span className="metricValue">
            {workout.WorkoutDistance != null
              ? (workout.WorkoutDistance / 1000).toFixed(2)
              : "-"}
            {" km"}
          </span>
        </div>
        <div className="metricRow">
          <span className="metricHead" style={{ fontWeight: "bold" }}>Time:</span>{" "}
          <span className="metricValue">{secondsToHms(workout.WorkoutMovingTime)}</span>
        </div>
        <div className="metricRow">
          <span className="metricHead" style={{ fontWeight: "bold" }}>Pace:</span>{" "}
          <span className="metricValue">
            {MetresPerSecondToMinsPerKm(
              workout.WorkoutAverageSpeed,
              workout.WorkoutType
            )}
          </span>
        </div>
        <div className="metricRow">
          <span className="metricHead" style={{ fontWeight: "bold" }}>Avg HR:</span>{" "}
          <span className="metricValue">
            {workout.WorkoutAverageHeartRate != null
              ? Math.round(workout.WorkoutAverageHeartRate)
              : "-"}
          </span>
        </div>
      </div>
      <Divider light />
      <Box padding={2}>
        <Typography className="dropDownLabel">How was it?</Typography>
        <Select
          value={dropdownActivityEffort}
          onChange={(e) => setDropdownActivityEffort(e)}
          placeholder="ActivityEffort"
          style={{ width: "100%" }}
        >
          <Option selected disabled value="">
            Please Select ActivityEffort
          </Option>
          <Option value="SuperEasy">Super easy</Option>
          <Option value="GoodWorkout">Good Workout</Option>
          <Option value="SolidWorkout">Solid workout</Option>
          <Option value="Struggled">Struggled</Option>
          <Option value="Broke">Broke me!</Option>
        </Select>
      </Box>
      <Divider light />
      <Box padding={2}>
        <Typography className="dropDownLabel">How's the body?</Typography>
        <Select
          value={dropdownActivityBody}
          onChange={(e) => setDropdownActivityBody(e)}
          placeholder="BodyFeedback"
          style={{ width: "100%" }}
        >
          <Option selected disabled value="">
            Please Select BodyFeedback
          </Option>
          <Option value="Awesome">Awesome!</Option>
          <Option value="Good">Feels good!</Option>
          <Option value="Tired">Quite tired</Option>
          <Option value="Fatigued">Seriously fatigued!</Option>
          <Option value="Sore">I'm sore!</Option>
        </Select>
      </Box>
      <Divider light />
      <Box mt={1}>
        <Button onClick={() => updateActivity(workout.id)}>Save</Button>
      </Box>
    </Card>
  );
}