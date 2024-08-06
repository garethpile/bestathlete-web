import React, { useState } from "react";
import { Card } from "antd";
import { Grid, TextField, Button, Select, InputLabel, MenuItem, FormControl, Box, Slider } from "@mui/material";
import Modal from "./Modal/Modal"; 
import { eventDelete } from "../services/eventServices"; // Import the eventDelete function

export default function EventManagement({ event, removeEvent }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    eventName: event.EventName || "",
    eventDate: event.EventDate || "",
    eventType: event.EventType || "",
    eventDistance: event.EventDistance || "",
    eventPriority: event.EventPriority || "",
    eventDescription: event.EventDescription || "",
    sliderValue: [0, 33, 66] // Default values for three sliders
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (event, newValue) => {
    setForm({ ...form, sliderValue: newValue });
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSave = () => {
    handleCloseModal();
  };

  const handleDeleteEvent = async () => {
    const success = await eventDelete(event.id);
    if (success) {
      removeEvent(event.id); // Optionally remove the event from the UI if deletion is successful
    }
  };

  const sliderMarks = [
    { value: 0, label: 'Section 1' },
    { value: 33, label: 'Section 2' },
    { value: 66, label: 'Section 3' },
    { value: 100, label: 'Section 4' }
  ];

  return (
    <Card style={{ marginBottom: '20px', padding: '20px' }}>
      <h3>{event.EventName || "No Name"} - {event.EventDate || "No Date"}</h3>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          View
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
          Delete
        </Button>
      </Box>

      <Modal
        header="Event Details"
        open={open}
        size="sm"
        closeHandler={handleCloseModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Event Name"
                InputLabelProps={{ shrink: true }}
                value={form.eventName}
                name="eventName"
                margin="normal"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Event Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                value={form.eventDate}
                name="eventDate"
                margin="normal"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="event-type-select-label">Event Type</InputLabel>
                <Select
                  labelId="event-type-select-label"
                  id="event-type-select"
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                >
                  <MenuItem value="TriathlonFull">Triathlon - Full Distance</MenuItem>
                  <MenuItem value="TriathlonHalf">Triathlon - Half Distance</MenuItem>
                  <MenuItem value="TriathlonOlympic">Triathlon - Olympic Distance</MenuItem>
                  <MenuItem value="TriathlonSprint">Triathlon - Sprint Distance</MenuItem>
                  <MenuItem value="Running">Running</MenuItem>
                  <MenuItem value="Riding">Riding</MenuItem>
                  <MenuItem value="Swimming">Swimming</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Event Distance"
                InputLabelProps={{ shrink: true }}
                value={form.eventDistance}
                name="eventDistance"
                margin="normal"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="event-priority-select-label">Event Priority</InputLabel>
                <Select
                  labelId="event-priority-select-label"
                  id="event-priority-select"
                  name="eventPriority"
                  value={form.eventPriority}
                  onChange={handleChange}
                >
                  <MenuItem value="A">A Race</MenuItem>
                  <MenuItem value="B">B Race</MenuItem>
                  <MenuItem value="C">C Race</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Event Description"
                InputLabelProps={{ shrink: true }}
                value={form.eventDescription}
                name="eventDescription"
                margin="normal"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box mt={2}>
              <Slider
                value={form.sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={100}
                step={1} 
              />
              <Box display="flex" justifyContent="space-between">
                {sliderMarks.map((mark) => (
                  <Box key={mark.value} sx={{ textAlign: 'center', width: '25%' }}>
                    {mark.label}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center" mt={2}>
              <Button
                color="primary"
                onClick={handleSave}
                size="large"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </Card>
  );
}