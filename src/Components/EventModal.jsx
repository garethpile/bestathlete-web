import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import { eventCreate } from "../services/eventServices";

const EventModal = ({ open, setOpen, onEventCreated, customer }) => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEvent = async () => {
    const currentDate = moment().format("YYYY-MM-DD");
    const eventDateFormatted = moment(form.eventDate).format("YYYY-MM-DD");

    if (!form.eventDate) return alert("Please enter event date");
    if (eventDateFormatted < currentDate) return alert("Event date cannot be in the past!");

    try {
      setLoading(true);
      const result = await eventCreate({
        EventName: form.eventName,
        EventDate: form.eventDate,
        EventType: form.eventType,
        EventDistance: form.eventDistance,
        EventPriority: form.eventPriority,
        EventDescription: form.eventDescription,
        idCustomer: customer.idCustomer,
      });

      if (!result) throw new Error("Event creation failed");

      alert("Event Added Successfully");
      setOpen(false);
      onEventCreated();
    } catch (error) {
      console.error("Error:", error);
      alert("An issue occurred adding the event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Name" name="eventName" value={form.eventName || ""} onChange={handleChange} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Type</InputLabel>
              <Select name="eventType" value={form.eventType || ""} onChange={handleChange}>
                <MenuItem value="TriathlonFull">Triathlon - Full Distance</MenuItem>
                <MenuItem value="TriathlonHalf">Triathlon - Half Distance</MenuItem>
                <MenuItem value="TriathlonOlympic">Triathlon - Olympic Distance</MenuItem>
                <MenuItem value="TriathlonSprint">Triathlon - Sprint Distance</MenuItem>
                <MenuItem value="Running">Running</MenuItem>
                <MenuItem value="Riding">Riding</MenuItem>
                <MenuItem value="Swimming">Swimming</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Event Distance" name="eventDistance" value={form.eventDistance || ""} onChange={handleChange} margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Date" type="date" name="eventDate" InputLabelProps={{ shrink: true }} value={form.eventDate || ""} onChange={handleChange} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Priority</InputLabel>
              <Select name="eventPriority" value={form.eventPriority || ""} onChange={handleChange}>
                <MenuItem value="A">A Race</MenuItem>
                <MenuItem value="B">B Race</MenuItem>
                <MenuItem value="C">C Race</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Event Description" name="eventDescription" value={form.eventDescription || ""} onChange={handleChange} margin="normal" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={createEvent} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;