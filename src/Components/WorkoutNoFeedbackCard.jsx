import React from "react";
import { Card, Avatar, Select, Button, Modal as AntModal } from "antd";
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
import { updateWorkout, deleteWorkout } from "../graphql/mutations.js";
import Modal from "@mui/material/Modal";
import { workoutUpdate } from "../services/workoutServices.js";

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

// Expect closeComponent to be passed in workout prop from parent
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

  const [dropdownActivityEffort, setDropdownActivityEffort] = React.useState(
    workout.WorkoutRPE ? workout.WorkoutRPE.toString() : ""
  );
  const [dropdownActivityBody, setDropdownActivityBody] = React.useState(
    workout.WorkoutPhysicalLevel !== undefined ? workout.WorkoutPhysicalLevel.toString() : ""
  );
  const [dropdownRunType, setDropdownRunType] = React.useState(
    workout.WorkoutClassification || ""
  );
  const [painModalOpen, setPainModalOpen] = React.useState(false);
  const [painSeverity, setPainSeverity] = React.useState(
    workout.WorkoutPhysicalLevel || 0
  );
  const [painLocations, setPainLocations] = React.useState(
    workout.WorkoutPhysicalLevelPain ? JSON.parse(workout.WorkoutPhysicalLevelPain) : {}
  );
  const [confirmDeleteVisible, setConfirmDeleteVisible] = React.useState(false);

  async function updateActivity(id) {
    try {
      //console.log("Workout WorkoutPhysicalLevel: ", dropdownActivityBody);

      const updateActivity = await API.graphql(
        graphqlOperation(updateWorkout, {
          input: {
            id: id,
            WorkoutPhysicalLevel: painSeverity || 0,
            WorkoutRPE: parseInt(dropdownActivityEffort, 10) || 0,
            WorkoutAthleteFeedback: 1,
            WorkoutClassification: dropdownRunType,
            WorkoutPhysicalLevelPain: JSON.stringify(painLocations),
          }
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

  async function deleteActivity(id) {
    try {
      const response = await API.graphql(
        graphqlOperation(deleteWorkout, {
          input: { id: id }
        })
      );
      console.log("Workout deleted:", response);
      if (typeof workout.fetchActivity === "function") {
        workout.fetchActivity(workout.StravaActivityOwnerId);
      }
    } catch (err) {
      console.log("Error deleting activity", err);
    } finally {
      if (typeof workout.closeComponent === "function") {
        workout.closeComponent();
      }
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className="dropDownLabel">Any physical pain?</Typography>
          <Typography
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => setPainModalOpen(true)}
          >
            {painSeverity > 0 ? `Level: ${painSeverity}` : "Update"}
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
      <Box mt={1} display="flex" justifyContent="space-between">
        <Button onClick={() => updateActivity(workout.id)}>Save</Button>
        <Button danger onClick={() => setConfirmDeleteVisible(true)}>Delete</Button>
      </Box>
      <Modal open={painModalOpen} onClose={() => setPainModalOpen(false)}>
        <Box sx={{ background: "#fff", p: 4, maxWidth: 400, margin: "10vh auto", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Pain and Discomfort</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom>Severity of pain</Typography>
            <Typography fontWeight="bold">{painSeverity}</Typography>
          </Box>
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
            <Button
              type="primary"
              onClick={async () => {
                try {
                  await workoutUpdate({
                    id: workout.id,
                    WorkoutPhysicalLevel: painSeverity,
                    WorkoutPhysicalLevelPain: JSON.stringify(painLocations)
                  });
                  setDropdownActivityBody(painSeverity.toString());
                  setPainModalOpen(false);
                } catch (error) {
                  alert("Failed to update pain information. Please try again.");
                }
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Modal>
      <AntModal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={async () => {
          setConfirmDeleteVisible(false);
          await deleteActivity(workout.id);
        }}
        onCancel={() => setConfirmDeleteVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this workout?</p>
      </AntModal>
    </Card>
  );
}