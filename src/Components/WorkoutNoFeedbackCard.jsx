import React from "react";
import { Card, Avatar, Select, Button } from "antd";
import Slider from "@mui/material/Slider";
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
import Modal from "@mui/material/Modal";

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

  const effortLabels = {
    1: "Super easy",
    2: "Easy",
    3: "Smooth",
    4: "Moderate",
    5: "Medium",
    6: "Slightly taxing",
    7: "Hard",
    8: "Really tough",
    9: "Extremely tough",
    10: "All out effort",
  };

  const [dropdownActivityEffort, setDropdownActivityEffort] = React.useState("");
  const [dropdownActivityBody, setDropdownActivityBody] = React.useState("");
  const [dropdownRunType, setDropdownRunType] = React.useState("");
  const [painModalOpen, setPainModalOpen] = React.useState(false);
  const [painSeverity, setPainSeverity] = React.useState(0);
  const [painLocations, setPainLocations] = React.useState({});

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
          WorkoutRunType: dropdownRunType,
  
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
        <Typography className="dropDownLabel">Run Type</Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {[
            "Moderate",
            "Fartlek",
            "Intervals",
            "Hill Repeats",
            "Tempo Run",
            "Threshold",
            "Cruise Intervals",
            "Strides",
            "Progression Run",
            "Pace Run"
          ].map((type) => (
            <Button
              key={type}
              size="small"
              type={dropdownRunType === type ? "primary" : "default"}
              onClick={() => setDropdownRunType(type)}
              style={{
                borderRadius: 20,
                padding: "4px 12px",
                fontWeight: "bold"
              }}
            >
              {type}
            </Button>
          ))}
        </Box>
      </Box>
      <Box padding={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className="dropDownLabel">Any physical pain?</Typography>
          <Typography
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => setPainModalOpen(true)}
          >
            Update
          </Typography>
        </Box>
      </Box>
      <Box padding={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className="dropDownLabel">Perceived effort?</Typography>
          <Typography variant="body2" fontWeight="bold">
            {effortLabels[dropdownActivityEffort] || ""}
          </Typography>
        </Box>
        <Slider
          value={dropdownActivityEffort ? Number(dropdownActivityEffort) : 0}
          onChange={(e, val) => setDropdownActivityEffort(val.toString())}
          step={1}
          min={1}
          max={10}
          valueLabelDisplay="off"
        />
      </Box>
      <Divider light />
      <Box mt={1}>
        <Button onClick={() => updateActivity(workout.id)}>Save</Button>
      </Box>
      <Modal open={painModalOpen} onClose={() => setPainModalOpen(false)}>
        <Box sx={{ background: "#fff", p: 4, maxWidth: 400, margin: "10vh auto", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Pain and Discomfort</Typography>
          <Typography gutterBottom>Severity of pain</Typography>
          <Slider
            min={0}
            max={10}
            value={painSeverity}
            onChange={(e, val) => setPainSeverity(val)}
          />
          <Typography gutterBottom mt={2}>What locations?</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {["Achilles", "Ankle", "Calf", "Foot", "Hamstring", "Hip", "Knee", "Plantar"].map(part => (
              <Box key={part} display="flex" alignItems="center" justifyContent="space-between">
                <Typography>{part}</Typography>
                <Box>
                  <Button size="small" onClick={() =>
                    setPainLocations(prev => ({ ...prev, [part]: { ...prev[part], L: !prev[part]?.L } }))
                  } type={painLocations[part]?.L ? "primary" : "default"}>L</Button>
                  <Button size="small" onClick={() =>
                    setPainLocations(prev => ({ ...prev, [part]: { ...prev[part], R: !prev[part]?.R } }))
                  } type={painLocations[part]?.R ? "primary" : "default"} style={{ marginLeft: 4 }}>R</Button>
                </Box>
              </Box>
            ))}
          </Box>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={() => setPainModalOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setPainModalOpen(false)}>Apply</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
}