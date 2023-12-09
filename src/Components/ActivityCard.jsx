import React from "react";
import { Card } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Select } from "antd";
import { Button} from "antd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { updateGarminActivity } from "../Apollo/queries";

const { Option } = Select;

const iconDictionary = {
  LAP_SWIMMING: <PoolIcon fontSize="large" />,
  STRENGTH_TRAINING: <FitnessCenterIcon fontSize="large" />,
  RUNNING: <DirectionsRunIcon fontSize="large" />,
  CYCLING: <DirectionsBikeIcon fontSize="large" />,
  VIRTUAL_RIDE: <PedalBikeIcon fontSize="large" />,
};
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? ":" : "") : "";
  return hDisplay + mDisplay + sDisplay;
}

function MinPerKmFraction(MinPerKm, GarminActivityType) {
  switch (GarminActivityType) {
    case "LAP_SWIMMING":
      MinPerKm = Number(MinPerKm);
      var SecPerHundred = (MinPerKm / 10) * 60;
      var Mins = Math.floor(SecPerHundred / 60);
      var Secs = Math.floor(SecPerHundred - Mins * 60);
      return Mins + ":" + Secs;
    case "STRENGTH_TRAINING":
      return "-";
    case "RUNNING": {
      MinPerKm = Number(MinPerKm);
      var mins = Math.floor(MinPerKm / 1);
      var fraction = Math.floor((MinPerKm - mins) * 60);
      return mins + ":" + fraction;
    }
    case "CYCLING":
      MinPerKm = Number(MinPerKm);
      var KmPerHr = (1 / MinPerKm) * 60;
      return KmPerHr.toFixed(2);
    case "VIRTUAL_RIDE":
      MinPerKm = Number(MinPerKm);
      var KmPerHr = (1 / MinPerKm) * 60;
      return KmPerHr.toFixed(2);
    default:
      return "-";
  }
}

export default function ActivityCard(props) {
  const [dropdownActivityEffort, setDropdownActivityEffort] = React.useState("");
  const [dropdownActivityBody, setDropdownActivityBody] = React.useState("");

  async function updateActivity(id) {
    try {
      if(!dropdownActivityBody || !dropdownActivityEffort) {
        alert("Please Select Required Fields")
      }
      console.log("GarminActivityAthleteBody: " + dropdownActivityBody);

      const updateActivity = await API.graphql(
        graphqlOperation(updateGarminActivity, {
          // variables: {
            id: id,
            GarminActivityAthleteBody: dropdownActivityBody,
            GarminActivityAthleteEffort: dropdownActivityEffort,
            GarminActivityAthleteFeedback: true,
            _version : props.version
          // }
        })
      );
      console.log("updateActivity response: " + updateActivity);
      props.fetcchActivity()
      //setActivities(activity.data.activitiesgarminByGarminAccountId.items);
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
              {iconDictionary[props.GarminActivityType] || props.GarminActivityType}
            </Avatar>
          </IconButton>
          { }
        </span>

        <span className="activityHead">
          <p>{props.GarminActivityDescription}</p>
          <p className="metricValue">
            {moment(new Date(props.GarminActivityStartTime * 1000)).format(
              "DD/MM/YYYY HH:MM"
            )}
          </p>
        </span>
      </div>

      <div className="metricDiv">
        <span className="metricSpan">
          <p className="metricHead">Distance(km)</p>
          <p className="metricValue">
            {(props.GarminActivityDistance / 1000).toFixed(2)}
          </p>
        </span>
        <span className="metricSpan">
          <p className="metricHead">Time</p>
          <p className="metricValue">{secondsToHms(props.GarminActivityDuration)}</p>
        </span>
        <span className="metricSpan">
          <p className="metricHead">Pace</p>
          <p className="metricValue">
            {MinPerKmFraction(
              props.GarminAveragePaceInMinutesPerKilometer,
              props.GarminActivityType
            )}
          </p>
        </span>
        <span className="metricSpan">
          <p className="metricHead">Avg HR</p>
          <p className="metricValue">
            {Math.round(props.GarminAverageHeartRateInBeatsPerMinute)}
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
          <Option selected disabled value="">Please Select ActivityEffort</Option>
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
          <Option selected disabled value="">Please Select BodyFeedback</Option>
          <Option value="Awesome">Awesome!</Option>
          <Option value="Good">Feels good!</Option>
          <Option value="Tired">Quite tired</Option>
          <Option value="Fatigued">Seriously fatigued!</Option>
          <Option value="Sore">I'm sore!</Option>
        </Select>
      </Box>
      <Divider light />
      <Box mt={1}>
        <Button
          onClick={() => updateActivity(props.id)}
        >
          Save
        </Button>
      </Box>
    </Card>
  );
}
