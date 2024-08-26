import React, { useState } from "react";
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
import CountryList from "./CountryList"; // Ensure the import is correct
import { Box } from "@mui/system";
import { API, graphqlOperation } from "aws-amplify";
import { updateCustomer } from "../graphql/mutations";

const Profile = ({ customer }) => {
  const [user, setUser] = useState({
    ...customer,
    Country: customer.Country || '', // Initialize country if undefined
  });

  const handleInputChange = (event, newValue, field) => {
    if (field === 'Country') {
      setUser((prev) => ({ ...prev, Country: newValue ? newValue.name : '' }));
    } else {
      const { name, value, type, checked } = event.target;
      setUser(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const saveCustomerData = async () => {
    try {
      const response = await API.graphql(graphqlOperation(updateCustomer, { input: user }));
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
        {/* Personal Details */}
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
              name="gender"
              value={user.gender || ''}
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
        {/* Country Autocomplete */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={CountryList}
            getOptionLabel={(option) => option.name}
            value={CountryList.find(c => c.name === user.Country) || null}
            onChange={(event, newValue) => handleInputChange(event, newValue, 'Country')}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
        </Grid>
        {/* Separator */}
        <Grid item xs={12}>
          <Divider variant="middle" style={{ margin: '20px 0' }} />
        </Grid>
        {/* Training Days */}
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <Grid item xs={6} sm={4} key={day}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user[`${day}Train`] || false}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: `${day}Train`,
                      type: 'checkbox',
                      checked: e.target.checked,
                    }
                  })}
                />
              }
              label={`${day} Train`}
            />
            <TextField
              type="number"
              fullWidth
              label={`${day} Train Hours`}
              name={`${day}TrainHours`}
              value={user[`${day}TrainHours`] || 0}
              onChange={handleInputChange}
              inputProps={{ min: 0 }} // Set minimum to 0 to avoid negative values
            />
          </Grid>
        ))}
        {/* Save Button */}
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