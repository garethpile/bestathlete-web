import React from "react";
import { Card } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Select } from "antd";
import { Button } from "antd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { updateStravaActivity } from "../Apollo/queries";

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

  var hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? ":" : "") : "";
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
      }
      console.log("Strava ActivityAthleteBody: ", dropdownActivityBody);

      const updateActivity = await API.graphql(
        graphqlOperation(updateStravaActivity, {
          id: id,
          StravaActivityAthleteBody: dropdownActivityBody,
          StravaActivityAthleteEffort: dropdownActivityEffort,
          StravaActivityAthleteFeedback: true,
          _version: workout.version,
        })
      );
      console.log("updateActivity response: ", updateActivity);
      workout.fetcchActivity(workout.StravaActivityOwnerId);
    } catch (err) {
      console.log("Error updating activity", err);
    }
  }

  return (
    <Card className="maincardDiv">
      <div className="activityDiv">
        <span className="activitySpan">
          <IconButton className="activityAvator">
            <Avatar shape="circle" size={60}>
              {iconDictionary[workout.WorkoutType] || workout.WorkoutType}
            </Avatar>
          </IconButton>
        </span>

        <span className="activityHead">
          <p>{workout.WorkoutDescription}</p>
          <p className="metricValue">
            {moment(new Date(workout.WorkoutDateTime)).format("DD/MM/YYYY HH:MM")}
          </p>
        </span>
      </div>

      <div className="metricDiv">
        <span className="metricSpan">
          <p className="metricHead">Distance(km)</p>
          <p className="metricValue">
            {workout.WorkoutDistance != null
              ? (workout.WorkoutDistance / 1000).toFixed(2)
              : "-"}
          </p>
        </span>
        <span className="metricSpan">
          <p className="metricHead">Time</p>
          <p className="metricValue">{secondsToHms(workout.WorkoutMovingTime)}</p>
        </span>
        <span className="metricSpan">
          <p className="metricHead">Pace</p>
          <p className="metricValue">
            {MetresPerSecondToMinsPerKm(
              workout.WorkoutAverageSpeed,
              workout.WorkoutType
            )}
          </p>
        </span>
        <span className="metricSpan">
          <p className="metricHead">Avg HR</p>
          <p className="metricValue">
            {workout.WorkoutAverageHeartRate != null
              ? Math.round(workout.WorkoutAverageHeartRate)
              : "-"}
          </p>
        </span>
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
