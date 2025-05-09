import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Card, Typography, Divider, Space } from "antd";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./WorkoutManagement.css";
import { workoutUpdate } from "../services/workoutServices";

const { Title, Text } = Typography;

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
    <Card style={{ margin: 12, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Type:</Text>
            <Input value={workoutData.type} disabled />
          </Col>
          <Col span={12}>
            <Text strong>Workout:</Text>
            <Input value={workoutData.description} disabled />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Date:</Text>
            <Input value={workoutData.date.toLocaleDateString()} disabled />
          </Col>
          <Col span={12}>
            <Text strong>Avg Heart Rate:</Text>
            <Input value={workoutData.avgHeartRate} disabled />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Average Speed:</Text>
            <Input value={workoutData.averageSpeed} disabled />
          </Col>
          <Col span={12}>
            <Text strong>Distance:</Text>
            <Input value={workoutData.distance} disabled />
          </Col>
        </Row>

        <Divider />

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>RPE:</Text>
            <Slider
              min={0}
              max={5}
              value={workoutData.workoutRPE}
              onChange={(value) => handleChange("workoutRPE", value)}
            />
            <Text type="secondary">{getDescription(workoutData.workoutRPE, rpeDescriptions)}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Body:</Text>
            <Slider
              min={0}
              max={5}
              value={workoutData.workoutPhysicalLevel}
              onChange={(value) => handleChange("workoutPhysicalLevel", value)}
            />
            <Text type="secondary">{getDescription(workoutData.workoutPhysicalLevel, bodyDescriptions)}</Text>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Weather:</Text>
            <Slider
              min={0}
              max={5}
              value={workoutData.workoutWeatherLevel}
              onChange={(value) => handleChange("workoutWeatherLevel", value)}
            />
            <Text type="secondary">{getDescription(workoutData.workoutWeatherLevel, weatherDescriptions)}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Hydration:</Text>
            <Slider
              min={0}
              max={5}
              value={workoutData.workoutHydrationLevel}
              onChange={(value) => handleChange("workoutHydrationLevel", value)}
            />
            <Text type="secondary">{getDescription(workoutData.workoutHydrationLevel, hydrationDescriptions)}</Text>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Text strong>Calories eaten per hour:</Text>
            <Input
              value={workoutData.workoutCaloriesEatenPerHour}
              onChange={(e) => handleChange("workoutCaloriesEatenPerHour", e.target.value)}
            />
          </Col>
        </Row>

        <Row justify="end">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Row>
      </Space>
    </Card>
  );
};

export default WorkoutManagement;