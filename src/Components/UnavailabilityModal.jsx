

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormHelperText,
} from "@mui/material";

const REASONS = ["Illness", "Vacation", "Work", "Personal", "Other"];
const ACTIVITIES = [
  { value: "None", label: "None" },
  { value: "Swim", label: "Swim" },
  { value: "Bike", label: "Bike" },
  { value: "Run", label: "Run" },
  { value: "Strength", label: "Strength" },
  { value: "Walk", label: "Walk" },
];

function UnavailabilityModal({ open, onClose, onSave, event }) {
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState(["None"]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setReason(event.UnavailableReason || "");
      setStartDate(event.UnavailableStartDate || "");
      setEndDate(event.UnavailableEndDate || "");
      setActivities(event.AvailableActivities ? JSON.parse(event.AvailableActivities) : ["None"]);
    } else {
      setReason("");
      setStartDate("");
      setEndDate("");
      setActivities(["None"]);
    }
  }, [event, open]);

  // Handle mutually exclusive 'None' for activities
  const handleActivitiesChange = (event) => {
    const value = event.target.value;
    if (value.includes("None")) {
      setActivities(["None"]);
    } else {
      setActivities(value.filter((v) => v !== "None"));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!reason) newErrors.reason = "Reason is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "End date must be after or equal to start date";
    }
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave({
        reason,
        startDate,
        endDate,
        activities: activities.length === 0 ? ["None"] : activities,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setReason("");
    setStartDate("");
    setEndDate("");
    setActivities(["None"]);
    setErrors({});
    onClose && onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Set Unavailability</DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors.reason)}
        >
          <InputLabel id="reason-label">Reason</InputLabel>
          <Select
            labelId="reason-label"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            label="Reason"
          >
            {REASONS.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
          {errors.reason && (
            <FormHelperText>{errors.reason}</FormHelperText>
          )}
        </FormControl>
        <TextField
          margin="normal"
          fullWidth
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          error={Boolean(errors.startDate)}
          helperText={errors.startDate}
        />
        <TextField
          margin="normal"
          fullWidth
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          error={Boolean(errors.endDate)}
          helperText={errors.endDate}
        />
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel id="activities-label">Available Activities</InputLabel>
          <Select
            labelId="activities-label"
            multiple
            value={activities}
            onChange={handleActivitiesChange}
            input={<OutlinedInput label="Available Activities" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {ACTIVITIES.map((act) => (
              <MenuItem key={act.value} value={act.value}>
                <Checkbox checked={activities.indexOf(act.value) > -1} />
                <ListItemText primary={act.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UnavailabilityModal;