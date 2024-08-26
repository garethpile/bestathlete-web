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
} from "@mui/material";
import CountryList from "./ContryList";
import "./Profile.css";
import { Box } from "@mui/system";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateCustomer } from "../graphql/mutations";

const Profile = ({ userExists, customer = {} }) => {

 
 
  const [user, setUser] =  useState({
    id: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    gender: "",
    MobileNumber: "",
    Country: "",
    DateOfBirth: "",
    SaturdayTrain: true,
    SundayTrain: true,
    MondayTrain: true,
    TuesdayTrain: true,
    WednesdayTrain: true,
    ThursdayTrain: true,
    FridayTrain: true,
    SaturdayTrainHours: 1,
    SundayTrainHours: 1,
    MondayTrainHours: 1,
    TuesdayTrainHours: 1,
    WednesdayTrainHours: 1,
    ThursdayTrainHours: 1,
    FridayTrainHours: 1,
    _version:1
  });

  const handleChange = (e) => {
    console.log(e);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
  };

  const saveCustomer = async () => {
    if (Object.keys(user).every((key) => user[key] !== "")) {
      const updateCustomer = await API.graphql(
        updateCustomer(updateCustomer, {
          id: customer.id,
          EmailAddress: customer.EmailAddress,
          MobileNumber: customer.MobileNumber,
          Gender: customer.Gender,
          FirstName: customer.FirstName,
          LastName: customer.LastName,
          Country: customer.Country,
          DateOfBirth: new Date(customer.DateOfBirth)
            .toISOString()
            .substring(0, 10),
          TrainingDays : {
          SaturdayTrain: customer.SaturdayTrain,
          SaturdayTrainHours: Number(customer.SundayTrainHours),
          SundayTrain: customer.SundayTrain,
          SundayTrainHours: Number(customer.SundayTrainHours),
          MondayTrain: customer.MondayTrain,
          MondayTrainHours: Number(customer.MondayTrainHours),
          TuesdayTrain: customer.TuesdayTrain,
          TuesdayTrainHours: Number(customer.TuesdayTrainHours),
          WednesdayTrain: customer.WednesdayTrain,
          WednesdayTrainHours: Number(customer.WednesdayTrainHours),
          ThursdayTrain: customer.ThursdayTrain,
          ThursdayTrainHours: Number(customer.ThursdayTrainHours),
          FridayTrain: customer.FridayTrain,
          FridayTrainHours: Number(customer.FridayTrainHours),
          },
          _version: customer._version,
        })
      );


      setUser({ ...user, _version: customer._version + 1 });

      
          if (customer.FirstName === "-" || customer.LastName === "-") {
            alert(`Please fill all the fields`);
          } else {
            //setRedirect(true);
            //setRedirect(false);
            window.location.reload();
          }
          
    } else {
      alert(`Please fill all the fields`);
    }
  };

  return (
    <div className="ProfileMainDiv">
      {/* <Paper> */}
      <Card sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center">
              <h1>Personal Details</h1>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="FirstName"
              value={customer.FirstName}
              label="First Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="LastName"
              value={customer.LastName}
              label="Last Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="EmailAddress"
              value={customer.EmailAddress}
              label="Email Address"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="genderLabel">Select Gender</InputLabel>
              <Select
                labelId="genderLabel"
                id="gender"
                name="gender"
                value={customer.Gender}
                label="Gender"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              type="text"
              value={customer.MobileNumber}
              name="MobileNumber"
              label="Mobile Number"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="DateOfBirth"
              InputLabelProps={{ shrink: true }}
              value={customer.DateOfBirth}
              type="date"
              label="Date Of Birth"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <Autocomplete
              id="country"
              name="Country"
              value={customer.Country}
              inputValue={customer.Country}
              options={CountryList?.map((option) => option.name)}
              fullWidth
              onInputChange={(a, b) => setUser({ ...customer, Country: b })}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" />
              )}
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ padding: "20px", marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3} md={3} sm={6} />
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center" my={2}>
              <h1>TrainingDays</h1>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="FridayTrain"
                  checked={customer.FridayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="FridayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.FridayTrainHours}
              name="FridayTrainHours"
              label="Friday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="SaturdayTrain"
                  checked={customer.SaturdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SaturdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.SaturdayTrainHours}
              name="SaturdayTrainHours"
              label="Saturday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="SundayTrain"
                  checked={customer.SundayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SundayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.SundayTrainHours}
              name="SundayTrainHours"
              label="Sunday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="MondayTrain"
                  checked={customer.MondayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="MondayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.MondayTrainHours}
              name="MondayTrainHours"
              label="Monday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckBox}
                  checked={customer.TuesdayTrain}
                  name="TuesdayTrain"
                />
              }
              label="TuesdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.TuesdayTrainHours}
              name="TuesdayTrainHours"
              label="Tuesday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="WednesdayTrain"
                  checked={customer.WednesdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="WednesdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.WednesdayTrainHours}
              name="WednesdayTrainHours"
              label="Wednesday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="ThursdayTrain"
                  checked={customer.ThursdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="ThursdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customer.ThursdayTrainHours}
              name="ThursdayTrainHours"
              label="Thursday Train Hours"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center">
              <Button variant="outlined" onClick={saveCustomer} color="primary">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
      {/* </Paper> */}
    </div>
  );
};

export default Profile;
