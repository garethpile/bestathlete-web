import React, { useState } from "react";
import { Card } from "antd";
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Slider,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "./Modal/Modal";
import { eventDelete } from "../services/eventServices";

export default function EventManagement({ event, removeEvent, allEvents = [] }) {
  const [open, setOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const [form, setForm] = useState({
    eventName: event.EventName || "",
    eventDate: event.EventDate || "",
    eventType: event.EventType || "",
    eventDistance: event.EventDistance || "",
    eventPriority: event.EventPriority || "",
    eventDescription: event.EventDescription || "",
    sliderValue: [0, 33, 66],
  });

  const hasExistingARace = allEvents.some(
    (e) => e.id !== event.id && e.EventPriority === "A"
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (_, newValue) => {
    setForm({ ...form, sliderValue: newValue });
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleSave = () => handleCloseModal();

  const handleDeleteEvent = async () => {
    const success = await eventDelete(event.id);
    if (success) {
      removeEvent(event.id);
    }
  };

  const sliderMarks = [
    { value: 0, label: "Section 1" },
    { value: 33, label: "Section 2" },
    { value: 66, label: "Section 3" },
    { value: 100, label: "Section 4" },
  ];

  return (
    <Card style={{ marginBottom: "5px", padding: "5px 5px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Box display="flex" alignItems="center" gap={1}>
          {event.EventPriority && (
            <Chip
              label={`${event.EventPriority} Race`}
              size="small"
              color={
                event.EventPriority === "A"
                  ? "error"
                  : event.EventPriority === "B"
                  ? "warning"
                  : "default"
              }
            />
          )}
          <Box
            component="a"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal();
            }}
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#333",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
              cursor: "pointer",
            }}
          >
            {event.EventName || "No Name"} : {event.EventDate || "No Date"}
          </Box>
          <IconButton onClick={handleDeleteEvent} size="small">
            <DeleteIcon sx={{ color: "#9c27b0" }} />
          </IconButton>
        </Box>
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
                type="date"
                InputLabelProps={{ shrink: true }}
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
                <InputLabel>Event Type</InputLabel>
                <Select
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
                <InputLabel>Event Priority</InputLabel>
                <Select
                  name="eventPriority"
                  value={form.eventPriority}
                  onChange={(e) => {
                    if (e.target.value === "A" && hasExistingARace) {
                      setErrorDialogOpen(true);
                    } else {
                      handleChange(e);
                    }
                  }}
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
                  <Box key={mark.value} sx={{ textAlign: "center", width: "25%" }}>
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

      {/* Error Dialog for Duplicate A Race */}
      <Modal
        header="Cannot Add Another A Race"
        open={errorDialogOpen}
        size="xs"
        closeHandler={() => setErrorDialogOpen(false)}
      >
        <Box p={2}>
          <p>You already have an A Priority race. Please change the priority or delete the existing A race.</p>
          <Box mt={2} textAlign="center">
            <Button variant="contained" onClick={() => setErrorDialogOpen(false)}>
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
}