import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Space,
  Collapse,
} from "antd";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./WorkoutManagement.css";
import { workoutUpdate } from "../services/workoutServices";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const WorkoutManagement = ({ selectedWorkout, setSelectedWorkout }) => {
  const [workoutData, setWorkoutData] = useState({
    description: "",
    date: new Date(),
    averageSpeed: 0,
    avgHeartRate: 0,
    distance: 0,
    type: "",
    workoutRPE: 0,
    workoutPhysicalLevel: 0,
    workoutWeatherLevel: 0,
    workoutHydrationLevel: 0,
    workoutCaloriesEatenPerHour: 0,
  });

  useEffect(() => {
    if (selectedWorkout) {
      setWorkoutData({
        description: selectedWorkout.WorkoutDescription,
        date: new Date(selectedWorkout.WorkoutDateTime),
        averageSpeed: selectedWorkout.WorkoutAverageSpeed,
        avgHeartRate: selectedWorkout.WorkoutAverageHeartRate,
        distance: selectedWorkout.WorkoutDistance,
        type: selectedWorkout.WorkoutType,
        workoutRPE: selectedWorkout.WorkoutRPE || 0,
        workoutPhysicalLevel: selectedWorkout.WorkoutPhysicalLevel || 0,
        workoutWeatherLevel: selectedWorkout.WorkoutWeatherLevel || 0,
        workoutHydrationLevel: selectedWorkout.WorkoutHydrationLevel || 0,
        workoutCaloriesEatenPerHour:
          selectedWorkout.WorkoutCaloriesEatenPerHour || 0,
      });
    }
  }, [selectedWorkout]);

  const handleChange = (field, value) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const success = await workoutUpdate({
      id: selectedWorkout.id,
      WorkoutDescription: workoutData.description,
      WorkoutDateTime: workoutData.date,
      WorkoutAverageSpeed: workoutData.averageSpeed,
      WorkoutAverageHeartRate: workoutData.avgHeartRate,
      WorkoutDistance: workoutData.distance,
      WorkoutType: workoutData.type,
      WorkoutRPE: workoutData.workoutRPE,
      WorkoutPhysicalLevel: workoutData.workoutPhysicalLevel,
      WorkoutWeatherLevel: workoutData.workoutWeatherLevel,
      WorkoutHydrationLevel: workoutData.workoutHydrationLevel,
      WorkoutCaloriesEatenPerHour:
        workoutData.workoutCaloriesEatenPerHour,
    });

    if (success) {
      setSelectedWorkout(null);
    }
  };

  const getDescription = (value, descriptions) => descriptions[value] || "";

  const rpeDescriptions = [
    "Rest",
    "Very Easy",
    "Easy",
    "Moderate",
    "Hard",
    "Very Hard",
  ];
  const bodyDescriptions = [
    "Perfect",
    "Good",
    "Average",
    "Tender",
    "Sore",
    "Destroyed!",
  ];
  const weatherDescriptions = [
    "Perfect",
    "Good",
    "Average",
    "Poor",
    "Very Poor",
    "Extreme",
  ];
  const hydrationDescriptions = [
    "Perfect",
    "Good",
    "Average",
    "Poor",
    "Very Poor",
    "Dehydrated",
  ];

  return (
    <Collapse>
      <Panel header={workoutData.type || "Workout"} key="1">
        <Card
          style={{
            margin: 12,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Description and Date combined */}
            <div style={{ width: "100%" }}>
              <div className="workout-description-date-row">
                <Input value={workoutData.description} disabled style={{ width: "65%" }} />
                <Input value={workoutData.date.toLocaleDateString()} disabled style={{ width: "30%" }} />
              </div>
            </div>

            {/* Avg Heart Rate */}
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text strong>Avg Heart Rate:</Text>
                <Input value={workoutData.avgHeartRate} disabled style={{ width: "80%" }} />
              </div>
            </div>

            {/* Average Speed and Distance */}
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Text strong>Average Speed:</Text>
                <Input value={workoutData.averageSpeed} disabled style={{ width: "80%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text strong>Distance:</Text>
                <Input value={workoutData.distance} disabled style={{ width: "80%" }} />
              </div>
            </div>

            <Divider />

            {/* RPE and Body */}
            <div style={{ width: "100%" }}>
              <Text strong>RPE:</Text>
              <Slider
                min={0}
                max={5}
                value={workoutData.workoutRPE}
                onChange={(value) =>
                  handleChange("workoutRPE", value)
                }
                style={{ width: "100%" }}
              />
              <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
                {getDescription(workoutData.workoutRPE, rpeDescriptions)}
              </Text>
              <Text strong>Body:</Text>
              <Slider
                min={0}
                max={5}
                value={workoutData.workoutPhysicalLevel}
                onChange={(value) =>
                  handleChange("workoutPhysicalLevel", value)
                }
                style={{ width: "100%" }}
              />
              <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
                {getDescription(
                  workoutData.workoutPhysicalLevel,
                  bodyDescriptions
                )}
              </Text>
            </div>

            {/* Weather and Hydration */}
            <div style={{ width: "100%" }}>
              <Text strong>Weather:</Text>
              <Slider
                min={0}
                max={5}
                value={workoutData.workoutWeatherLevel}
                onChange={(value) =>
                  handleChange("workoutWeatherLevel", value)
                }
                style={{ width: "100%" }}
              />
              <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
                {getDescription(
                  workoutData.workoutWeatherLevel,
                  weatherDescriptions
                )}
              </Text>
              <Text strong>Hydration:</Text>
              <Slider
                min={0}
                max={5}
                value={workoutData.workoutHydrationLevel}
                onChange={(value) =>
                  handleChange("workoutHydrationLevel", value)
                }
                style={{ width: "100%" }}
              />
              <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
                {getDescription(
                  workoutData.workoutHydrationLevel,
                  hydrationDescriptions
                )}
              </Text>
            </div>

            {/* Calories Eaten Per Hour */}
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text strong>Calories eaten per hour:</Text>
                <Input
                  value={workoutData.workoutCaloriesEatenPerHour}
                  onChange={(e) =>
                    handleChange(
                      "workoutCaloriesEatenPerHour",
                      e.target.value
                    )
                  }
                  style={{ width: "80%" }}
                />
              </div>
            </div>

            {/* Save Button */}
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Space>
        </Card>
      </Panel>
    </Collapse>
  );
};

export default WorkoutManagement;