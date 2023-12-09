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
import { updateCustomer360DSL, getCustomerByID } from "../Apollo/queries";
// import { useLocation } from "react-router-dom";

//export default function Profile(props) {
const Profile = ({ setRedirect }) => {

 
  /*
      const [customer, setCustomer] = useState({
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
      });

      let location = useLocation();
      console.log("location: ", location);

      if (location.state == null) {
        // Location state data NOT sent through ..... therefore use PROP info sent through ...
        console.log("location.state is NULL");
        console.log("props.customerEntity on Profile Page: ", props.customerEntity);

        setCustomer({ ...customer,
            id: props.customerEntity.id,
            EmailAddress: props.customerEntity.EmailAddress,
            MobileNumber: props.customerEntity.MobileNumber,
            gender: props.customerEntity.Male ? "Male" : "Female",
            FirstName: props.customerEntity.FirstName,
            LastName: props.customerEntity.LastName,
            Country: props.customerEntity.Country,
            DateOfBirth: props.customerEntity.DateOfBirth,
            SaturdayTrain: props.customerEntity.SaturdayTrain,
            SaturdayTrainHours: Number(props.customerEntity.SundayTrainHours),
            SundayTrain: props.customerEntity.SundayTrain || true,
            SundayTrainHours: Number(props.customerEntity.SundayTrainHours),
            MondayTrain: props.customerEntity.MondayTrain,
            MondayTrainHours: Number(props.customerEntity.MondayTrainHours),
            TuesdayTrain: props.customerEntity.TuesdayTrain,
            TuesdayTrainHours: Number(props.customerEntity.TuesdayTrainHours),
            WednesdayTrain: props.customerEntity.WednesdayTrain,
            WednesdayTrainHours: Number(props.customerEntity.WednesdayTrainHours),
            ThursdayTrain: props.customerEntity.ThursdayTrain,
            ThursdayTrainHours: Number(props.customerEntity.ThursdayTrainHours),
            FridayTrain: props.customerEntity.FridayTrain,
            FridayTrainHours: Number(props.customerEntity.FridayTrainHours),
            _version: props.customerEntity._version,
          });



      } else {
        // PROP data sent through is NULL ..... use Location STATE data ....
        console.log(
          "location.state.customerEntity: ",
          location.state.customerEntity
        );
        let locationStateCustomerEntity = location.state.customerEntity;

        setCustomer({ ...customer,
            id: locationStateCustomerEntity.id,
            EmailAddress: locationStateCustomerEntity.EmailAddress,
            MobileNumber: locationStateCustomerEntity.MobileNumber,
            gender: locationStateCustomerEntity.Male ? "Male" : "Female",
            FirstName: locationStateCustomerEntity.FirstName,
            LastName: locationStateCustomerEntity.LastName,
            Country: locationStateCustomerEntity.Country,
            DateOfBirth: locationStateCustomerEntity.DateOfBirth,
            SaturdayTrain: locationStateCustomerEntity.SaturdayTrain,
            SaturdayTrainHours: Number(locationStateCustomerEntity.SundayTrainHours),
            SundayTrain: locationStateCustomerEntity.SundayTrain || true,
            SundayTrainHours: Number(locationStateCustomerEntity.SundayTrainHours),
            MondayTrain: locationStateCustomerEntity.MondayTrain,
            MondayTrainHours: Number(locationStateCustomerEntity.MondayTrainHours),
            TuesdayTrain: locationStateCustomerEntity.TuesdayTrain,
            TuesdayTrainHours: Number(locationStateCustomerEntity.TuesdayTrainHours),
            WednesdayTrain: locationStateCustomerEntity.WednesdayTrain,
            WednesdayTrainHours: Number(locationStateCustomerEntity.WednesdayTrainHours),
            ThursdayTrain: locationStateCustomerEntity.ThursdayTrain,
            ThursdayTrainHours: Number(locationStateCustomerEntity.ThursdayTrainHours),
            FridayTrain: locationStateCustomerEntity.FridayTrain,
            FridayTrainHours: Number(locationStateCustomerEntity.FridayTrainHours),
            _version: locationStateCustomerEntity._version,
          });
      }

      
    */

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

  const getCustomer = async (id) => {
    const customerData = await API.graphql(
      graphqlOperation(getCustomerByID, { id: id })
    );
    console.log("customerData.data.getCUSTOMER360DSL : ", customerData.data.getCUSTOMER360DSL);
    const userData = customerData.data.getCUSTOMER360DSL;
    if (customerData.data.getCUSTOMER360DSL) {
      //setCustomer(customerData);
      console.log("customerData: ",customerData);
      setUser({
        ...user,
        id: userData.id,
        EmailAddress: userData.EmailAddress,
        MobileNumber: userData.MobileNumber,
        gender: userData.Male ? "Male" : "Female",
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Country: userData.Country,
        DateOfBirth: userData.DateOfBirth,
        SaturdayTrain: userData.TrainingDays.SaturdayTrain,
        SaturdayTrainHours: Number(userData.TrainingDays.SundayTrainHours),
        SundayTrain: userData.TrainingDays.SundayTrain,
        SundayTrainHours: Number(userData.TrainingDays.SundayTrainHours),
        MondayTrain: userData.TrainingDays.MondayTrain,
        MondayTrainHours: Number(userData.TrainingDays.MondayTrainHours),
        TuesdayTrain: userData.TrainingDays.TuesdayTrain,
        TuesdayTrainHours: Number(userData.TrainingDays.TuesdayTrainHours),
        WednesdayTrain: userData.TrainingDays.WednesdayTrain,
        WednesdayTrainHours: Number(userData.TrainingDays.WednesdayTrainHours),
        ThursdayTrain: userData.TrainingDays.ThursdayTrain,
        ThursdayTrainHours: Number(userData.TrainingDays.ThursdayTrainHours),
        FridayTrain: userData.TrainingDays.FridayTrain,
        FridayTrainHours: Number(userData.TrainingDays.FridayTrainHours),
        _version: userData._version
      });
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((userData) => {
        setUser({ ...user, id: userData.username });
        getCustomer(userData.username);
        console.log("Current userId: ", userData.username);
      })
      .catch((err) => console.log(err));
  }, []);

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
        graphqlOperation(updateCustomer360DSL, {
          id: user.id,
          EmailAddress: user.EmailAddress,
          MobileNumber: user.MobileNumber,
          Male: user.gender === "Male" ? true : false,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Country: user.Country,
          DateOfBirth: new Date(user.DateOfBirth)
            .toISOString()
            .substring(0, 10),
          SaturdayTrain: user.SaturdayTrain,
          SaturdayTrainHours: Number(user.SundayTrainHours),
          SundayTrain: user.SundayTrain,
          SundayTrainHours: Number(user.SundayTrainHours),
          MondayTrain: user.MondayTrain,
          MondayTrainHours: Number(user.MondayTrainHours),
          TuesdayTrain: user.TuesdayTrain,
          TuesdayTrainHours: Number(user.TuesdayTrainHours),
          WednesdayTrain: user.WednesdayTrain,
          WednesdayTrainHours: Number(user.WednesdayTrainHours),
          ThursdayTrain: user.ThursdayTrain,
          ThursdayTrainHours: Number(user.ThursdayTrainHours),
          FridayTrain: user.FridayTrain,
          FridayTrainHours: Number(user.FridayTrainHours),
          _version: user._version,
        })
      );
      // Ensure latest version of DB entity is known in case we update again ....
      setUser({ ...user, _version: user._version + 1 });

      
          if (user.FirstName === "-" || user.LastName === "-") {
            alert(`Please fill all the fields`);
          } else {
            //setRedirect(true);
            //props.setRedirect(false);
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
              value={user.FirstName}
              label="First Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="LastName"
              value={user.LastName}
              label="Last Name"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={3} md={3} sm={6}>
            <TextField
              name="EmailAddress"
              value={user.EmailAddress}
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
                value={user.gender}
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
              value={user.MobileNumber}
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
              value={user.DateOfBirth}
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
              value={user.Country}
              inputValue={user.Country}
              options={CountryList?.map((option) => option.name)}
              fullWidth
              onInputChange={(a, b) => setUser({ ...user, Country: b })}
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
                  checked={user.FridayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="FridayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.FridayTrainHours}
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
                  checked={user.SaturdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SaturdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.SaturdayTrainHours}
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
                  checked={user.SundayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="SundayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.SundayTrainHours}
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
                  checked={user.MondayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="MondayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.MondayTrainHours}
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
                  checked={user.TuesdayTrain}
                  name="TuesdayTrain"
                />
              }
              label="TuesdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.TuesdayTrainHours}
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
                  checked={user.WednesdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="WednesdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.WednesdayTrainHours}
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
                  checked={user.ThursdayTrain}
                  onChange={handleCheckBox}
                />
              }
              label="ThursdayTrain"
            />
            <br />
            <TextField
              type="number"
              value={user.ThursdayTrainHours}
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
