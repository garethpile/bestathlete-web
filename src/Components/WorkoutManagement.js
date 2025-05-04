import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Card } from "antd";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./WorkoutManagement.css";
import { workoutUpdate } from "../services/workoutServices";

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
        workoutCaloriesEatenPerHour: selectedWorkout.WorkoutCaloriesEatenPerHour || 0,
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
      WorkoutCaloriesEatenPerHour: workoutData.workoutCaloriesEatenPerHour,
    });

    if (success) {
      setSelectedWorkout(null);
    }
  };

  const getDescription = (value, descriptions) => descriptions[value] || "";

  const rpeDescriptions = ["Rest", "Very Easy", "Easy", "Moderate", "Hard", "Very Hard"];
  const bodyDescriptions = ["Perfect", "Good", "Average", "Tender", "Sore", "Destroyed!"];
  const weatherDescriptions = ["Perfect", "Good", "Average", "Poor", "Very Poor", "Extreme"];
  const hydrationDescriptions = ["Perfect", "Good", "Average", "Poor", "Very Poor", "Dehydrated"];

  return (
    <Card className="workout-management-card">
      <Row gutter={16}>
        <Col span={12}>
          <label>Type:</label>
          <Input value={workoutData.type} disabled />
        </Col>
        <Col span={12}>
          <label>Workout:</label>
          <Input value={workoutData.description} disabled />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Date:</label>
          <Input value={workoutData.date.toLocaleDateString()} disabled />
        </Col>
        <Col span={12}>
          <label>Avg Heart Rate:</label>
          <Input value={workoutData.avgHeartRate} disabled />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Average Speed:</label>
          <Input value={workoutData.averageSpeed} disabled />
        </Col>
        <Col span={12}>
          <label>Distance:</label>
          <Input value={workoutData.distance} disabled />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>RPE:</label>
          <Slider
            min={0}
            max={10}
            value={workoutData.workoutRPE}
            onChange={(value) => handleChange("workoutRPE", value)}
            trackStyle={{ backgroundColor: "#1890ff" }}
            handleStyle={{ borderColor: "#1890ff" }}
          />
          <div>{getDescription(workoutData.workoutRPE, rpeDescriptions)}</div>
        </Col>
        <Col span={12}>
          <label>Body:</label>
          <Slider
            min={0}
            max={5}
            value={workoutData.workoutPhysicalLevel}
            onChange={(value) => handleChange("workoutPhysicalLevel", value)}
            trackStyle={{ backgroundColor: "#1890ff" }}
            handleStyle={{ borderColor: "#1890ff" }}
          />
          <div>{getDescription(workoutData.workoutPhysicalLevel, bodyDescriptions)}</div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Weather:</label>
          <Slider
            min={0}
            max={5}
            value={workoutData.workoutWeatherLevel}
            onChange={(value) => handleChange("workoutWeatherLevel", value)}
            trackStyle={{ backgroundColor: "#52c41a" }}
            handleStyle={{ borderColor: "#52c41a" }}
          />
          <div>{getDescription(workoutData.workoutWeatherLevel, weatherDescriptions)}</div>
        </Col>
        <Col span={12}>
          <label>Hydration:</label>
          <Slider
            min={0}
            max={5}
            value={workoutData.workoutHydrationLevel}
            onChange={(value) => handleChange("workoutHydrationLevel", value)}
            trackStyle={{ backgroundColor: "#52c41a" }}
            handleStyle={{ borderColor: "#52c41a" }}
          />
          <div>{getDescription(workoutData.workoutHydrationLevel, hydrationDescriptions)}</div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <label>Calories eaten per hour:</label>
          <Input
            value={workoutData.workoutCaloriesEatenPerHour}
            onChange={(e) => handleChange("workoutCaloriesEatenPerHour", e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Button type="primary" onClick={handleSave} className="workout-save-button">
            Save
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default WorkoutManagement;