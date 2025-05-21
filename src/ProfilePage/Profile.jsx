import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Card,
  MenuItem,
  Button,
  Grid,
  FormControlLabel,
  InputLabel,
  FormControl,
  Autocomplete,
  Checkbox,
  Divider,
} from "@mui/material";
import CountryList from "./CountryList";
import { Box } from "@mui/system";
import { API, graphqlOperation } from "aws-amplify";
import { updateCustomer } from "../graphql/mutations";

const Profile = ({ customer }) => {
  const [user, setUser] = useState({
    id: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    gender: "",
    MobileNumber: "",
    Country: "",
    DateOfBirth: "",
    TrainingDays: {
      MondayTrain: false,
      MondayTrainHours: 0,
      TuesdayTrain: false,
      TuesdayTrainHours: 0,
      WednesdayTrain: false,
      WednesdayTrainHours: 0,
      ThursdayTrain: false,
      ThursdayTrainHours: 0,
      FridayTrain: false,
      FridayTrainHours: 0,
      SaturdayTrain: false,
      SaturdayTrainHours: 0,
      SundayTrain: false,
      SundayTrainHours: 0,
    },
    _version: customer._version || 1,
  });

  useEffect(() => {
    if (customer) {
      setUser({
        ...customer,
        TrainingDays: {
          MondayTrain: customer.TrainingDays?.MondayTrain || false,
          MondayTrainHours: customer.TrainingDays?.MondayTrainHours || 0,
          TuesdayTrain: customer.TrainingDays?.TuesdayTrain || false,
          TuesdayTrainHours: customer.TrainingDays?.TuesdayTrainHours || 0,
          WednesdayTrain: customer.TrainingDays?.WednesdayTrain || false,
          WednesdayTrainHours: customer.TrainingDays?.WednesdayTrainHours || 0,
          ThursdayTrain: customer.TrainingDays?.ThursdayTrain || false,
          ThursdayTrainHours: customer.TrainingDays?.ThursdayTrainHours || 0,
          FridayTrain: customer.TrainingDays?.FridayTrain || false,
          FridayTrainHours: customer.TrainingDays?.FridayTrainHours || 0,
          SaturdayTrain: customer.TrainingDays?.SaturdayTrain || false,
          SaturdayTrainHours: customer.TrainingDays?.SaturdayTrainHours || 0,
          SundayTrain: customer.TrainingDays?.SundayTrain || false,
          SundayTrainHours: customer.TrainingDays?.SundayTrainHours || 0,
        },
        Country: customer.Country || ''
      });
    }
  }, [customer]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name.includes("TrainHours")) {
      setUser((prev) => ({
        ...prev,
        TrainingDays: {
          ...prev.TrainingDays,
          [name]: type === "number" ? Number(value) : value,
        },
      }));
    } else if (name.includes("Train")) {
      setUser((prev) => ({
        ...prev,
        TrainingDays: {
          ...prev.TrainingDays,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCountryChange = (event, newValue) => {
    setUser(prev => ({
      ...prev,
      Country: newValue ? newValue.name : ''
    }));
  };

  const saveCustomerData = async () => {
    const input = {
      id: user.id,
      idCustomer: user.idCustomer,
      LastName: user.LastName,
      FirstName: user.FirstName,
      EmailAddress: user.EmailAddress,
      MobileNumber: user.MobileNumber,
      Gender: user.Gender,
      DateOfBirth: user.DateOfBirth,
      Country: user.Country,
      TrainingDays: {
        MondayTrain: user.TrainingDays.MondayTrain,
        MondayTrainHours: parseInt(user.TrainingDays.MondayTrainHours, 10),
        TuesdayTrain: user.TrainingDays.TuesdayTrain,
        TuesdayTrainHours: parseInt(user.TrainingDays.TuesdayTrainHours, 10),
        WednesdayTrain: user.TrainingDays.WednesdayTrain,
        WednesdayTrainHours: parseInt(user.TrainingDays.WednesdayTrainHours, 10),
        ThursdayTrain: user.TrainingDays.ThursdayTrain,
        ThursdayTrainHours: parseInt(user.TrainingDays.ThursdayTrainHours, 10),
        FridayTrain: user.TrainingDays.FridayTrain,
        FridayTrainHours: parseInt(user.TrainingDays.FridayTrainHours, 10),
        SaturdayTrain: user.TrainingDays.SaturdayTrain,
        SaturdayTrainHours: parseInt(user.TrainingDays.SaturdayTrainHours, 10),
        SundayTrain: user.TrainingDays.SundayTrain,
        SundayTrainHours: parseInt(user.TrainingDays.SundayTrainHours, 10),
      },

    };
  
    try {
      const response = await API.graphql(graphqlOperation(updateCustomer, { input }));
      alert("Customer data updated successfully");
      console.log("Update response:", response);
    } catch (error) {
      console.error("Error updating customer data:", error);
      alert("Error updating customer data. Please try again.");
    }
  };

  return (
    <Card sx={{ padding: "20px", margin: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center"><h1>Personal Details</h1></Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="First Name" name="FirstName" value={user.FirstName || ''} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Last Name" name="LastName" value={user.LastName || ''} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Email Address" name="EmailAddress" value={user.EmailAddress || ''} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Mobile Number" name="MobileNumber" value={user.MobileNumber || ''} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="genderLabel">Select Gender</InputLabel>
            <Select
              labelId="genderLabel"
              name="Gender"
              value={user.Gender || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="DateOfBirth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={user.DateOfBirth || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={CountryList}
            getOptionLabel={(option) => option.name}
            value={CountryList.find(c => c.name === user.Country) || null}
            onChange={handleCountryChange}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" style={{ margin: '20px 0' }} />
        </Grid>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <Grid item xs={6} sm={4} key={day}>
            <FormControlLabel
              control={
                <Checkbox
                  name={`${day}Train`}
                  checked={user.TrainingDays[`${day}Train`] || false}
                  onChange={handleInputChange}
                />
              }
              label={`${day} Train`}
            />
            <TextField
              type="number"
              fullWidth
              label={`${day} Train Hours`}
              name={`${day}TrainHours`}
              value={user.TrainingDays[`${day}TrainHours`] || 0}
              onChange={handleInputChange}
              inputProps={{ min: 0 }} // Prevent negative numbers
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={saveCustomerData}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Profile;