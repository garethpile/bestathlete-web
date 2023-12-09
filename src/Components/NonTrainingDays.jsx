import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import Box from "@mui/material/Box";

import {
  getNonTrainingDaysBy360dslId,
  createNonTrainingDays,
  deleteNonTrainingDaysById,
} from "../Apollo/queries";

import { API, graphqlOperation } from "aws-amplify";
import { Grid, TextField, Button } from "@mui/material";
import Modal from "./Modal/Modal";

import moment from "moment";

export default function NonTrainingDays(props) {
  const [nonTrainingDays, setNonTrainingDays] = useState([
    {
      id: "",
      UserId360DSL: props.customerId,
      Valid: true,
      NonTrainingType: "Sick",
      StartDate: "",
      EndDate: "",
      _version: 1,
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ startDate: "", endDate: "" });
  const dateHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createNonTrainingDaysEntry = async () => {
    var startDateObject;
    var startDateObjectFormatted;
    var endDateObject;
    var endDateObjectFormatted;
    var currentDate = new Date();
    var currentDateFormatted = moment(currentDate).format("YYYY-MM-DD");

    if (!form.startDate || !form.endDate) {
      return alert("Please enter start and end date");
    } else {
      startDateObject = new Date(form.startDate);
      startDateObjectFormatted = moment(startDateObject).format("YYYY-MM-DD");
      endDateObject = new Date(form.endDate);
      endDateObjectFormatted = moment(endDateObject).format("YYYY-MM-DD");
      //console.log("startDateObjectFormatted: ", startDateObjectFormatted);
      //console.log("endDateObjectFormatted: ", endDateObjectFormatted);
    }
    if (endDateObjectFormatted < startDateObjectFormatted) {
      return alert("End date cannot be before start date!");
    }
    if (startDateObjectFormatted < currentDateFormatted) {
      return alert("Start date cannot be before today!");
    }
    if (endDateObjectFormatted < currentDateFormatted) {
      return alert("End date cannot be before today!");
    }

    try {
     
      API.graphql(
        graphqlOperation(createNonTrainingDays, {
          UserId360DSL: props.customerId,
          Valid: true,
          NonTrainingType: "Sick",
          StartDate: form.startDate,
          EndDate: form.endDate,
        })
      )
        .then((createNonTrainingDaysResponse) => {
          alert("Off Days Added Succesfully");
          // Retrieve updated list ....
          getNonTrainingDays(props.customerId);
          setOpen(false);
        })
        .catch((error) => {
          console.log("Error: ", error);
          alert(
            "An issue occurred adding Non Training Days. Please contact info@360dsl.co.za"
          );
        });
    } catch (err) {
      console.log("Error creating Non Training Period: ", err);
    }
  };

  const deleteNonTrainingDaysEntry = async (id, _version) => {

    //console.log("Delete Non Training Day entry: ", id);
    //console.log("Delete Non Training Day entry version: ", _version);

    const customerData = await API.graphql(
      graphqlOperation(deleteNonTrainingDaysById, { id: id, _version:_version})
    );
    // Retrieve updated list ....
    getNonTrainingDays(props.customerId);
  };

  const getNonTrainingDays = async (authenticatedUser) => {
    try {
      const nonTrainingDaysData = await API.graphql(
        graphqlOperation(getNonTrainingDaysBy360dslId, {
          UserId360DSL: authenticatedUser,
        })
      );
      if (nonTrainingDaysData.data.nonTrainingDaysBy360dslId.items) {
        // Non Training Days exist ....

        const nonTrainingDaysItems = nonTrainingDaysData.data.nonTrainingDaysBy360dslId.items;

        // console.log( "nonTrainingDaysData.data.nonTrainingDaysBy360dslId.items: ",nonTrainingDaysItems);
        const newNonTrainingDaysItems = nonTrainingDaysItems.filter((item) => item._deleted !== true);
        setNonTrainingDays(newNonTrainingDaysItems);

        // console.log("nonTrainingDays after update: ", nonTrainingDays);
      } else {
        // No Non Training Days exist ....
        // Do nothing ...
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  function handleRemove(id, _version) {
    deleteNonTrainingDaysEntry(id, _version);
    const newNonTrainingDays = nonTrainingDays.filter((item) => item.id !== id);
    setNonTrainingDays(newNonTrainingDays);
  }

  useEffect(() => {
    console.log("useEffect running ....");
    if (props.customerId) {
      // customerId Exists ....
      console.log("props.customerId exists: ", props.customerId);
      getNonTrainingDays(props.customerId);
    } else {
      // customerId Does not exist yet ....
      console.log("props.customerId Does NOT Exist");
    }
  }, [props.customerId]);

  return (
    <Card className="maincardDiv">
      <Modal
        header="Select Non Training Days Date"
        open={open}
        size="sm"
        closeHandler={() => setOpen(!open)}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid col={4} lg={4} md={4} item>
            {/* <label htmlFor="startDate"> Start Date</label><br /> */}
            <TextField
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={form.startDate}
              onChange={dateHandler}
              name="startDate"
            />
          </Grid>
          <Grid col={4} lg={4} md={4} item>
            {/* <label htmlFor="endDate"> End Date</label><br /> */}
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              label="End Date"
              value={form.endDate}
              onChange={dateHandler}
              name="endDate"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Box textAlign="center" mt={2}>
              <Button
                color="primary"
                onClick={createNonTrainingDaysEntry}
                size="large"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
      <Row style={{ marginRight: "10px", marginTop: "10px" }}>
        <Col>
          <b className="healthHead">Non Training Days</b>
          <p className="healthText">You cannot train over these periods:</p>

          <Box paddingX={0}>
            {nonTrainingDays.map((NonTrainingPeriod) => {
              return (
                <div key={NonTrainingPeriod.id} className="cardSpacingDiv">
                  {NonTrainingPeriod.StartDate} : {NonTrainingPeriod.EndDate}
                  <button type="button" onClick={() => handleRemove(NonTrainingPeriod.id, NonTrainingPeriod._version)}>
            Remove
          </button>
                </div>
              );
            })}
          </Box>
          <p></p>
          <Button onClick={() => setOpen(!open)}>Add</Button>
        </Col>
      </Row>
    </Card>
  );
}