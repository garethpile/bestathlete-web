import React, { useState, useEffect } from "react";
import { Input, Button, Row, Col, Card } from "antd";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./WorkoutManagement.css";
import { workoutUpdate } from "../services/workoutServices";

const WorkoutManagement = ({ selectedWorkout, setSelectedWorkout, cancelWorkoutManagement }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [avgHeartRate, setAvgHeartRate] = useState(0);
  const [distance, setDistance] = useState(0);
  const [type, setType] = useState("");
  const [workoutRPE, setWorkoutRPE] = useState(0);
  const [workoutPhysicalLevel, setWorkoutPhysicalLevel] = useState(0);
  const [workoutWeatherLevel, setWorkoutWeatherLevel] = useState(0);
  const [workoutHydrationLevel, setWorkoutHydrationLevel] = useState(0);
  const [workoutCaloriesEatenPerHour, setWorkoutCaloriesEatenPerHour] = useState(0);
  const [workoutAthleteFeedback, setWorkoutAthleteFeedback] = useState(0);

  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    if (selectedWorkout) {
      setDescription(selectedWorkout.WorkoutDescription);
      setDate(new Date(selectedWorkout.WorkoutDateTime));
      setAverageSpeed(selectedWorkout.WorkoutAverageSpeed);
      setAvgHeartRate(selectedWorkout.WorkoutAverageHeartRate);
      setDistance(selectedWorkout.WorkoutDistance);
      setType(selectedWorkout.WorkoutType);
      setWorkoutRPE(selectedWorkout.WorkoutRPE || 0);
      setWorkoutPhysicalLevel(selectedWorkout.WorkoutPhysicalLevel || 0);
      setWorkoutWeatherLevel(selectedWorkout.WorkoutWeatherLevel || 0);
      setWorkoutHydrationLevel(selectedWorkout.WorkoutHydrationLevel || 0);
      setWorkoutCaloriesEatenPerHour(selectedWorkout.WorkoutCaloriesEatenPerHour || 0);
      setWorkoutAthleteFeedback(selectedWorkout.WorkoutAthleteFeedback || 0);
      setChangedFields({});
    }
  }, [selectedWorkout]);

  const handleChange = (field, value) => {
    switch (field) {
      case 'WorkoutDescription':
        setDescription(value);
        break;
      case 'WorkoutDateTime':
        setDate(value);
        break;
      case 'WorkoutType':
        setType(value);
        break;
      case 'WorkoutRPE':
        setWorkoutRPE(value);
        break;
      case 'WorkoutPhysicalLevel':
        setWorkoutPhysicalLevel(value);
        break;
      case 'WorkoutWeatherLevel':
        setWorkoutWeatherLevel(value);
        break;
      case 'WorkoutHydrationLevel':
        setWorkoutHydrationLevel(value);
        break;
      case 'WorkoutCaloriesEatenPerHour':
        setWorkoutCaloriesEatenPerHour(value);
        break;
      case 'WorkoutAthleteFeedback':
        setWorkoutAthleteFeedback(value);
        break;
      default:
        break;
    }
    setChangedFields({
      ...changedFields,
      [field]: value,
    });
  };

  const handleSave = async () => {
    if (Object.keys(changedFields).length === 0) {
      return;
    }

    const updatedFields = {
      id: selectedWorkout.id,
      ...changedFields,
    };

    const success = await workoutUpdate(updatedFields);
    if (success) {
      setSelectedWorkout(null);
    }
  };

  const getRPEDescription = (value) => {
    switch (value) {
      case 0:
        return "Rest";
      case 1:
      case 2:
        return "Very Easy";
      case 3:
      case 4:
        return "Easy";
      case 5:
      case 6:
        return "Moderate";
      case 7:
      case 8:
        return "Hard";
      case 9:
      case 10:
        return "Very Hard";
      default:
        return "";
    }
  };

  const getBodyDescription = (value) => {
    switch (value) {
      case 0:
        return "Perfect";
      case 1:
        return "Good";
      case 2:
        return "Average";
      case 3:
        return "Tired";
      case 4:
        return "Very Tired";
      case 5:
        return "Exhausted";
      default:
        return "";
    }
  };

  const getWeatherDescription = (value) => {
    switch (value) {
      case 0:
        return "Perfect";
      case 1:
        return "Good";
      case 2:
        return "Average";
      case 3:
        return "Poor";
      case 4:
        return "Very Poor";
      case 5:
        return "Extreme";
      default:
        return "";
    }
  };

  const getHydrationDescription = (value) => {
    switch (value) {
      case 0:
        return "Perfect";
      case 1:
        return "Good";
      case 2:
        return "Average";
      case 3:
        return "Poor";
      case 4:
        return "Very Poor";
      case 5:
        return "Dehydrated";
      default:
        return "";
    }
  };

  return (
    <Card
      title="Workout Management"
      extra={<Button onClick={cancelWorkoutManagement}>Close</Button>}
      className="workout-management-card"
    >
      <Row gutter={16}>
        <Col span={12}>
          <label>Type:</label>
          <Input value={type} onChange={e => handleChange('WorkoutType', e.target.value)} />
        </Col>
        <Col span={12}>
          <label>Workout:</label>
          <Input value={description} onChange={e => handleChange('WorkoutDescription', e.target.value)} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Date:</label>
          <ReactDatePicker selected={date} onChange={date => handleChange('WorkoutDateTime', date)} />
        </Col>
        <Col span={12}>
          <label>Avg Heart Rate:</label>
          <Input value={avgHeartRate} disabled />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Average Speed:</label>
          <Input value={averageSpeed} disabled />
        </Col>
        <Col span={12}>
          <label>Distance:</label>
          <Input value={distance} disabled />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>RPE:</label>
          <Slider
            min={0}
            max={10}
            value={workoutRPE}
            onChange={value => handleChange('WorkoutRPE', value)}
          />
          <div>{getRPEDescription(workoutRPE)}</div>
        </Col>
        <Col span={12}>
          <label>Body:</label>
          <Slider
            min={0}
            max={5}
            value={workoutPhysicalLevel}
            onChange={value => handleChange('WorkoutPhysicalLevel', value)}
          />
          <div>{getBodyDescription(workoutPhysicalLevel)}</div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Weather:</label>
          <Slider
            min={0}
            max={5}
            value={workoutWeatherLevel}
            onChange={value => handleChange('WorkoutWeatherLevel', value)}
          />
          <div>{getWeatherDescription(workoutWeatherLevel)}</div>
        </Col>
        <Col span={12}>
          <label>Hydration:</label>
          <Slider
            min={0}
            max={5}
            value={workoutHydrationLevel}
            onChange={value => handleChange('WorkoutHydrationLevel', value)}
          />
          <div>{getHydrationDescription(workoutHydrationLevel)}</div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <label>Calories eaten per hour:</label>
          <Input value={workoutCaloriesEatenPerHour} onChange={e => handleChange('WorkoutCaloriesEatenPerHour', e.target.value)} />
        </Col>
        <Col span={12}>
          <label>Athlete Feedback:</label>
          <Input value={workoutAthleteFeedback} onChange={e => handleChange('WorkoutAthleteFeedback', parseInt(e.target.value) || 0)} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Button type="primary" onClick={handleSave} style={{ marginRight: 8 }}>Save</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default WorkoutManagement;