// [EventModal.jsx]
import React, { useState, useEffect } from "react";
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
  Typography,
  Box,
  Slider,
} from "@mui/material";
import moment from "moment";
import { eventCreate, eventUpdate } from "../services/eventServices";

const EventModal = ({ open, setOpen, onEventCreated, customer, existingEvents, event }) => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [phaseDates, setPhaseDates] = useState(null);
  const [meta, setMeta] = useState({ totalDays: 0 });
  const [phaseDurations, setPhaseDurations] = useState({
    prep: 0,
    base: 0,
    build: 0,
    peak: 0,
  });

  useEffect(() => {
    if (event) {
      setForm({
        eventName: event.EventName || "",
        eventDate: event.EventDate || "",
        eventType: event.EventType || "",
        eventDistance: event.EventDistance || "",
        eventPriority: event.EventPriority || "",
        eventDescription: event.EventDescription || "",
      });
      calculatePhaseDates(event.EventDate);
    } else {
      setForm({});
      setPhaseDates(null);
      setPhaseDurations({ prep: 0, base: 0, build: 0, peak: 0 });
      setMeta({ totalDays: 0 });
    }
  }, [event]);

  // Reset form when opening for new event
  useEffect(() => {
    if (open && !event) {
      setForm({});
      setPhaseDates(null);
      setPhaseDurations({ prep: 0, base: 0, build: 0, peak: 0 });
      setMeta({ totalDays: 0 });
    }
  }, [open, event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "eventDate" && value) {
        calculatePhaseDates(value);
      }
      return updated;
    });
  };

  const calculatePhaseDates = (eventDateInput, durations = null) => {
    const eventDate = moment(eventDateInput);
    if (!eventDate.isValid()) {
      setPhaseDates(null);
      return;
    }

    let start = moment().isoWeekday(1);
    if (start.isBefore(moment())) start.add(1, "week");
    const totalDays = eventDate.diff(start, "days");

    if (totalDays <= 0) return;

    let prep, base, build, peak;
    if (durations) {
      ({ prep, base, build, peak } = durations);
    } else {
      prep = Math.round(totalDays * 0.1);
      base = Math.round(totalDays * 0.3);
      build = Math.round(totalDays * 0.25);
      peak = Math.round(totalDays * 0.25);
    }

    const taper = totalDays - (prep + base + build + peak);
    let cursor = start.clone();

    const data = {
      EventPrepStart: cursor.clone().format("YYYY-MM-DD"),
      EventPrepEnd: cursor.clone().add(prep - 1, "days").isoWeekday(7).format("YYYY-MM-DD"),
    };
    cursor = moment(data.EventPrepEnd).add(1, "day").isoWeekday(1);

    data.EventBaseStart = cursor.clone().format("YYYY-MM-DD");
    data.EventBaseEnd = cursor.clone().add(base - 1, "days").isoWeekday(7).format("YYYY-MM-DD");
    cursor = moment(data.EventBaseEnd).add(1, "day").isoWeekday(1);

    data.EventBuildStart = cursor.clone().format("YYYY-MM-DD");
    data.EventBuildEnd = cursor.clone().add(build - 1, "days").isoWeekday(7).format("YYYY-MM-DD");
    cursor = moment(data.EventBuildEnd).add(1, "day").isoWeekday(1);

    data.EventPeakStart = cursor.clone().format("YYYY-MM-DD");
    data.EventPeakEnd = cursor.clone().add(peak - 1, "days").isoWeekday(7).format("YYYY-MM-DD");
    cursor = moment(data.EventPeakEnd).add(1, "day").isoWeekday(1);

    data.EventTaperStart = cursor.clone().format("YYYY-MM-DD");
    data.EventTaperEnd = eventDate.clone().subtract(1, "day").format("YYYY-MM-DD");

    setPhaseDates(data);
    setPhaseDurations({ prep, base, build, peak });
    setMeta({ totalDays });
  };

  const getPhaseEnds = () => {
    const { prep, base, build, peak } = phaseDurations;
    return [prep, prep + base, prep + base + build, prep + base + build + peak];
  };

  const handleSliderChange = (_, ends) => {
    if (ends[1] <= ends[0] || ends[2] <= ends[1] || ends[3] <= ends[2]) return;

    const prep = ends[0];
    const base = ends[1] - ends[0];
    const build = ends[2] - ends[1];
    const peak = ends[3] - ends[2];

    setPhaseDurations({ prep, base, build, peak });
    calculatePhaseDates(form.eventDate, { prep, base, build, peak });
  };

  const saveEvent = async () => {
    if (!form.eventDate || !phaseDates) return alert("Please complete all fields");

    const payload = {
      EventName: form.eventName,
      EventDate: form.eventDate,
      EventType: form.eventType,
      EventDistance: form.eventDistance,
      EventPriority: form.eventPriority,
      EventDescription: form.eventDescription,
      idCustomer: customer.idCustomer,
      ...phaseDates,
    };

    try {
      setLoading(true);
      if (event?.id) {
        await eventUpdate({ id: event.id, ...payload });
        alert("Event updated successfully");
      } else {
        await eventCreate(payload);
        alert("Event created successfully");
      }
      setOpen(false);
      onEventCreated();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const getSliderMarks = () => {
    const marks = [];
    let sum = 0;
    marks.push({ value: 0, label: "Prep" });
    sum += phaseDurations.prep;
    marks.push({ value: sum, label: "Base" });
    sum += phaseDurations.base;
    marks.push({ value: sum, label: "Build" });
    sum += phaseDurations.build;
    marks.push({ value: sum, label: "Peak" });
    sum += phaseDurations.peak;
    marks.push({ value: sum, label: "Taper" });
    return marks;
  };

  const getPhaseSummary = () => {
    if (!phaseDates) return [];
    return [
      { label: "Prep", start: phaseDates.EventPrepStart, end: phaseDates.EventPrepEnd, weeks: phaseDurations.prep },
      { label: "Base", start: phaseDates.EventBaseStart, end: phaseDates.EventBaseEnd, weeks: phaseDurations.base },
      { label: "Build", start: phaseDates.EventBuildStart, end: phaseDates.EventBuildEnd, weeks: phaseDurations.build },
      { label: "Peak", start: phaseDates.EventPeakStart, end: phaseDates.EventPeakEnd, weeks: phaseDurations.peak },
      { label: "Taper", start: phaseDates.EventTaperStart, end: phaseDates.EventTaperEnd, weeks: meta.totalDays - getPhaseEnds()[3] },
    ];
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        {event ? `Event Details: ${event.EventName || "Untitled"}` : "New Event"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Event Name" name="eventName" value={form.eventName || ""} onChange={handleChange} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Type</InputLabel>
              <Select name="eventType" value={form.eventType || ""} onChange={handleChange}>
                <MenuItem value="TriathlonFull">Triathlon - Full</MenuItem>
                <MenuItem value="TriathlonHalf">Triathlon - Half</MenuItem>
                <MenuItem value="TriathlonOlympic">Olympic</MenuItem>
                <MenuItem value="TriathlonSprint">Sprint</MenuItem>
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
              <InputLabel>Priority</InputLabel>
              <Select name="eventPriority" value={form.eventPriority || ""} onChange={handleChange}>
                <MenuItem value="A">A Race</MenuItem>
                <MenuItem value="B">B Race</MenuItem>
                <MenuItem value="C">C Race</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Description" name="eventDescription" value={form.eventDescription || ""} onChange={handleChange} margin="normal" />
          </Grid>
        </Grid>

        {phaseDates && (
          <Box mt={3}>
            <Typography variant="h6">Training Phases</Typography>
            <Slider
              value={getPhaseEnds()}
              onChange={handleSliderChange}
              min={0}
              max={meta.totalDays}
              step={7}
              marks={getSliderMarks()}
              disableSwap
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => `Week ${Math.floor(x / 7) + 1}`}
            />
            <Box mt={2}>
              {getPhaseSummary().map((phase) => (
                <Box key={phase.label} mb={1}>
                  <Typography variant="body2">
                    <strong>{phase.label}:</strong> {phase.start} – {phase.end} ({Math.round(phase.weeks / 7)} weeks)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={saveEvent} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : event ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;