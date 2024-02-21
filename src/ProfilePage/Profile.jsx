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

const Profile = ({ userExists, customerEntity = {} }) => {

 
 
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
          id: customerEntity.id,
          EmailAddress: customerEntity.EmailAddress,
          MobileNumber: customerEntity.MobileNumber,
          Gender: customerEntity.Gender,
          FirstName: customerEntity.FirstName,
          LastName: customerEntity.LastName,
          Country: customerEntity.Country,
          DateOfBirth: new Date(customerEntity.DateOfBirth)
            .toISOString()
            .substring(0, 10),
          TrainingDays : {
          SaturdayTrain: customerEntity.SaturdayTrain,
          SaturdayTrainHours: Number(customerEntity.SundayTrainHours),
          SundayTrain: customerEntity.SundayTrain,
          SundayTrainHours: Number(customerEntity.SundayTrainHours),
          MondayTrain: customerEntity.MondayTrain,
          MondayTrainHours: Number(customerEntity.MondayTrainHours),
          TuesdayTrain: customerEntity.TuesdayTrain,
          TuesdayTrainHours: Number(customerEntity.TuesdayTrainHours),
          WednesdayTrain: customerEntity.WednesdayTrain,
          WednesdayTrainHours: Number(customerEntity.WednesdayTrainHours),
          ThursdayTrain: customerEntity.ThursdayTrain,
          ThursdayTrainHours: Number(customerEntity.ThursdayTrainHours),
          FridayTrain: customerEntity.FridayTrain,
          FridayTrainHours: Number(customerEntity.FridayTrainHours),
          },
          _version: customerEntity._version,
        })
      );


      setUser({ ...user, _version: customerEntity._version + 1 });

      
          if (customerEntity.FirstName === "-" || customerEntity.LastName === "-") {
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
              value={customerEntity.FirstName}
              label="First Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="LastName"
              value={customerEntity.LastName}
              label="Last Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="EmailAddress"
              value={customerEntity.EmailAddress}
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
                value={customerEntity.Gender}
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
              value={customerEntity.MobileNumber}
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
              value={customerEntity.DateOfBirth}
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
              value={customerEntity.Country}
              inputValue={customerEntity.Country}
              options={CountryList?.map((option) => option.name)}
              fullWidth
              onInputChange={(a, b) => setUser({ ...customerEntity, Country: b })}
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
                  checked={customerEntity.FridayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="FridayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.FridayTrainHours}
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
                  checked={customerEntity.SaturdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SaturdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.SaturdayTrainHours}
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
                  checked={customerEntity.SundayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SundayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.SundayTrainHours}
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
                  checked={customerEntity.MondayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="MondayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.MondayTrainHours}
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
                  checked={customerEntity.TuesdayTrain}
                  name="TuesdayTrain"
                />
              }
              label="TuesdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.TuesdayTrainHours}
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
                  checked={customerEntity.WednesdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="WednesdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.WednesdayTrainHours}
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
                  checked={customerEntity.ThursdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="ThursdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={customerEntity.ThursdayTrainHours}
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
