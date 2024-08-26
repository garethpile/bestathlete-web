import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import Box from "@mui/material/Box";

import {
  getEventsBy360dslId,
  createEventsEntry,
  deleteEventsById
} from "../Apollo/queries";

import { API, graphqlOperation } from "aws-amplify";
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Modal from "./Modal/Modal";

import moment from "moment";

export default function Events({events}) {

  console.log("Events component loading ....")

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({});
  const dateHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
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
      const response = await fetch(
        "https://4sglhoenlj.execute-api.eu-west-1.amazonaws.com/Prod/event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EventName: form.eventName,
            EventDate: form.eventDate,
            EventType: form.eventType,
            EventDistance: form.eventDistance,
            EventPriority: form.eventPriority,
            Description: form.eventDescription,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const createEventsResponse = await response.json();
      alert("Event Added Successfully");
  
      // Retrieve updated list ...
      // getEvents(props.customerId);
      setOpen(false);
    } catch (error) {
      console.log("Error:", error);
      alert(
        "An issue occurred adding an event. Please contact info@360dsl.co.za"
      );
    }
  };

  const deleteEvents = async (id, _version) => {
    //console.log("Delete Non Training Day entry: ", id);
    //console.log("Delete Non Training Day entry version: ", _version);

    const deleteEventsResponse = await API.graphql(
      graphqlOperation(deleteEventsById, {
        id: id,
        _version: _version,
      })
    );
    // Retrieve updated list ....
    //getEvents(props.customerId);
  };

  const getEvents = async (authenticatedUser) => {
    try {
      const getEventsResponse = await API.graphql(
        graphqlOperation(getEventsBy360dslId, {
          UserId360DSL: authenticatedUser,
        })
      );
      if (getEventsResponse.data.eventsBy360dslId.items) {
        // events exist ....

        const eventItems = getEventsResponse.data.eventsBy360dslId.items;

        // console.log( "getEventsResponse.data.eventsBy360dslId.items: ",getEventsResponse.data.eventsBy360dslId.items);
        const newEventItems = eventItems.filter(
          (item) => item._deleted !== true
        );
        //setEvents(newEventItems);

      //  console.log("events after update: ", events);

      } else {
        // No events exist ....
        // Do nothing ...
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  function handleRemove(id, _version) {
    console.log("Removing event with id:", id);
    console.log("Version of the event:", _version);
    deleteEvents(id, _version);
    const newEvents = events.filter((item) => item.id !== id);
    console.log("New events after filter:", newEvents);
    //setEvents(newEvents);
  }


  return (
    <Card className="maincardDiv">
      <Modal
        header="Enter Event Details"
        open={open}
        size="sm"
        closeHandler={() => setOpen(!open)}
      >
        <Grid container alignItems="left" justifyContent="center">
          <Grid col={2} lg={2} md={4} item>
            {/* <label htmlFor="startDate"> Start Date</label><br /> */}
            <TextField
              label="Event Name"
              InputLabelProps={{ shrink: true }}
              value={form.eventName}
              name="eventName"
              margin="normal"
              onChange={handleChange}
            />

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="event-type-select-label">Event Type</InputLabel>
              <Select
                labelId="event-type-select-label"
                id="event-type-select"
                name="eventType"
                label="Event Type"
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value={"TriathlonFull"}>
                  Triathlon - Full Distance
                </MenuItem>
                <MenuItem value={"TriathlonHalf"}>
                  Triathlon - Half Distance
                </MenuItem>
                <MenuItem value={"TriathlonOlympic"}>
                  Triathlon - Olympic Distance
                </MenuItem>
                <MenuItem value={"TriathlonSprint"}>
                  Triathlon - Sprint Distance
                </MenuItem>
                <MenuItem value={"Running"}>Running</MenuItem>
                <MenuItem value={"Riding"}>Riding</MenuItem>
                <MenuItem value={"Swimming"}>Swimming</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Event Distance"
              InputLabelProps={{ shrink: true }}
              value={form.eventDistance}
              name="eventDistance"
              margin="normal"
              onChange={handleChange}
            />
          </Grid>
          <Grid col={4} lg={4} md={4} item>
            {/* <label htmlFor="endDate"> End Date</label><br /> */}

            <TextField
              label="Event Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={form.eventDate}
              onChange={dateHandler}
              name="eventDate"
              margin="normal"
            />

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="event-priority-select-label">
                Event Priority
              </InputLabel>
              <Select
                labelId="event-priority-select-label"
                id="event-priority-select"
                name="eventPriority"
                label="Event Priority"
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value={"A"}>A Race</MenuItem>
                <MenuItem value={"B"}>B Race</MenuItem>
                <MenuItem value={"C"}>C Race</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Event Description"
              InputLabelProps={{ shrink: true }}
              value={form.eventDescription}
              name="eventDescription"
              margin="normal"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
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
      <Row style={{ marginRight: "10px", marginTop: "10px" }}>
        <Col>
          <b className="healthHead">Your events:</b>
          <Box paddingX={0}>
            {events.map((event) => {
              return (
                <div key={event.id} className="cardSpacingDiv">
                  {event.EventPriority} | {event.EventDate} | {event.EventName} | 
                  <button
                    type="button"
                    onClick={() => handleRemove(event.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </Box>
          <p></p>
          <Button onClick={() => setOpen(!open)}>Add</Button>
        </Col>
      </Row>
    </Card>
  );
}
