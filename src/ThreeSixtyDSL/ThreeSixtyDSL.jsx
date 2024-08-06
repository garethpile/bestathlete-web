import React, { useState } from "react";
import { Row, Col } from "antd";
import TermsConditions from "../Components/TermsConditions";
import NonTrainingDays from "../Components/NonTrainingDays";
import AthleteCard from "../Components/AthleteCard";
import AthleteFeedback from "../Components/AthleteFeedback";
import WorkoutManagement from "../Components/WorkoutManagement";
import EventManagement from "../Components/EventManagement";
import { Grid, TextField, Button, Select, InputLabel, MenuItem, FormControl, Box } from "@mui/material";
import Modal from "../Components/Modal/Modal";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { createEventsEntry } from "../Apollo/queries"; 

function ThreeSixtyDSL({ customer, workoutsNoFeedback, events: initialEvents }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [events, setEvents] = useState(initialEvents); // Use state for events

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCancelWorkoutManagement = () => {
    setSelectedWorkout(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dateHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEvents = async () => {
    var eventDateObject;
    var eventDateObjectFormatted;

    var currentDate = new Date();
    var currentDateFormatted = moment(currentDate).format("YYYY-MM-DD");

    if (!form.eventDate) {
      return alert("Please enter event date");
    } else {
      eventDateObject = new Date(form.eventDate);
      eventDateObjectFormatted = moment(eventDateObject).format("YYYY-MM-DD");
    }
    if (eventDateObjectFormatted < currentDateFormatted) {
      return alert("Event date cannot be in the past!");
    }

    try {
      const createEventsResponse = await API.graphql(
        graphqlOperation(createEventsEntry, {
          EventName: form.eventName,
          EventDate: form.eventDate,
          EventType: form.eventType,
          EventDistance: form.eventDistance,
          EventPriority: form.eventPriority,
          Description: form.eventDescription,
        })
      );

      // Update the events state with the new event
      setEvents([...events, createEventsResponse.data.createEventsEntry]);
      alert("Event Added Successfully");
      setOpen(false);
    } catch (error) {
      console.log("Error: ", error);
      alert("An issue occurred adding an event. Please contact info@360dsl.co.za");
    }
  };

  const removeEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents); // Update the state with the remaining events
  };

  return (
    <div>
      <div className="bodyDiv">
        <Row>
          <Col
            className="firstCol"
            span={8}
            xs={24}
            sm={24}
            lg={8}
            xl={8}
            style={{ overflowY: "auto", maxHeight: "100%" }}
          >
            <h1
              style={{
                justifyContent: "center",
                display: "flex",
                color: "crimson",
                marginTop: "15px",
              }}
            >
              Activity Feedback Corner
            </h1>
            <AthleteCard customer={customer} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2>Events:</h2>
              <Button onClick={() => setOpen(true)}>Add</Button>
            </div>
            {events && events.map((event) => (
              <EventManagement
                key={event.id}
                event={event}
                removeEvent={removeEvent}
              />
            ))}
          </Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            {workoutsNoFeedback &&
              workoutsNoFeedback.map((workout) => (
                workout && (
                  <WorkoutManagement
                    key={workout.id}
                    selectedWorkout={workout}
                    setSelectedWorkout={setSelectedWorkout}
                    cancelWorkoutManagement={handleCancelWorkoutManagement}
                  />
                )
              ))}
          </Col>
          <Col
            className="thirdCol"
            span={8}
            xs={24}
            sm={24}
            style={{ overflowY: "auto", maxHeight: "100%" }}
          >
            <AthleteFeedback customer={customer} />
            <NonTrainingDays customer={customer} />
            <TermsConditions />
          </Col>
        </Row>
      </div>

      <Modal
        header="Enter Event Details"
        open={open}
        size="sm"
        closeHandler={() => setOpen(!open)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Name"
              InputLabelProps={{ shrink: true }}
              value={form.eventName}
              name="eventName"
              margin="normal"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="event-type-select-label">Event Type</InputLabel>
              <Select
                labelId="event-type-select-label"
                id="event-type-select"
                name="eventType"
                label="Event Type"
                value={form.eventType}
                onChange={handleChange}
              >
                <MenuItem value={"TriathlonFull"}>Triathlon - Full Distance</MenuItem>
                <MenuItem value={"TriathlonHalf"}>Triathlon - Half Distance</MenuItem>
                <MenuItem value={"TriathlonOlympic"}>Triathlon - Olympic Distance</MenuItem>
                <MenuItem value={"TriathlonSprint"}>Triathlon - Sprint Distance</MenuItem>
                <MenuItem value={"Running"}>Running</MenuItem>
                <MenuItem value={"Riding"}>Riding</MenuItem>
                <MenuItem value={"Swimming"}>Swimming</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Distance"
              InputLabelProps={{ shrink: true }}
              value={form.eventDistance}
              name="eventDistance"
              margin="normal"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={form.eventDate}
              onChange={dateHandler}
              name="eventDate"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="event-priority-select-label">Event Priority</InputLabel>
              <Select
                labelId="event-priority-select-label"
                id="event-priority-select"
                name="eventPriority"
                label="Event Priority"
                value={form.eventPriority}
                onChange={handleChange}
              >
                <MenuItem value={"A"}>A Race</MenuItem>
                <MenuItem value={"B"}>B Race</MenuItem>
                <MenuItem value={"C"}>C Race</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Description"
              InputLabelProps={{ shrink: true }}
              value={form.eventDescription}
              name="eventDescription"
              margin="normal"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center" mt={2}>
              <Button
                color="primary"
                onClick={createEvents}
                size="large"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}

export default ThreeSixtyDSL;