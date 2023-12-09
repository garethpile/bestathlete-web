import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Select } from "antd";
import { updateAthleteMetricsMutation, updateNonTrainingDays } from "../Apollo/queries";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { Grid, TextField, Button } from "@mui/material";
import Modal from "./Modal/Modal"

const { Option } = Select;

export default function AthleteFeedback(props) {
  const [dropdownSleep, setDropdownSleep] = React.useState(props.customerEntity.metricSleep);
  const [dropdownWorkLifeStress, setDropdownWorkLifeStress] =
    React.useState("");
  const [dropdownInjury, setDropdownInjury] = React.useState("");
  const [dropdownSick, setDropdownSick] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({startDate : "" , endDate: ""});
  const dateHandler = (e) => {
    setForm({...form , [e.target.name] : e.target.value})
  }

  const addAthleteOffDays = async () => {
    if(!form.startDate || !form.endDate){
      return alert("Please enter start and end date");
    }
    let currentCustomerEntityVersion = "";
    try {
      currentCustomerEntityVersion = props.customerEntity._version;
      console.log(
        "Function updateAthleteMetrics executing with parameter id: " + props.customerEntity.id
      );
      
      console.log("AthleteFeedback Component - customerVersion: " + currentCustomerEntityVersion);

      const updateAthleteMetricsResponse = await API.graphql(
        graphqlOperation(updateNonTrainingDays, {
          id: props.customerEntity.id,
          startDate: form.startDate,
          endDate: form.endDate,
          valid: true,
          EmailAddress: props.customerEntity.EmailAddress,
          _version: currentCustomerEntityVersion
        })
      );
      console.log(
        "updateAthleteMetricsMutation response: " + updateAthleteMetricsResponse
      );
      alert("OffDays Added Succesfully");
    } catch (err) {
      console.log("Error updating Athlete metrics", err);
    }
  }
  async function updateAthleteMetrics(userId,customerEntity) {
    let currentCustomerEntityVersion = "";
    try {
      currentCustomerEntityVersion = customerEntity._version;
      console.log(
        "Function updateAthleteMetrics executing with parameter id: " + userId
      );
      
      console.log("AthleteFeedback Component - customerVersion: " + currentCustomerEntityVersion);

      const updateAthleteMetricsResponse = await API.graphql(
        graphqlOperation(updateAthleteMetricsMutation, {
          id: userId,
          MetricInjury: dropdownInjury,
          MetricSleep: dropdownSleep,
          MetricSick: dropdownSick,
          MetricWorkLifeBalance: dropdownWorkLifeStress,
          MetricsDateCapture: moment(new Date()).format("YYYY-MM-DD"),
          _version: currentCustomerEntityVersion
        })
      );
      console.log(
        "updateAthleteMetricsMutation response: " + updateAthleteMetricsResponse
      );
    } catch (err) {
      console.log("Error updating Athlete metrics", err);
    }
  }

  return (
    <Card className="maincardDiv">
      <Modal
        header="Select Non Training Days Date" 
        open={open} size="sm"
        closeHandler={() => setOpen(!open)}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid col={4} lg={4} md={4} item>
            {/* <label htmlFor="startDate"> Start Date</label><br /> */}
            <TextField label="Start Date" InputLabelProps={{ shrink: true }} type="date" value={form.startDate} onChange={dateHandler} name="startDate" />
          </Grid>
          <Grid col={4} lg={4} md={4} item>
            {/* <label htmlFor="endDate"> End Date</label><br /> */}
            <TextField type="date" InputLabelProps={{ shrink: true }} label="End Date" value={form.endDate} onChange={dateHandler} name="endDate" />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Box textAlign="center" mt={2}>
                <Button color="primary" onClick={addAthleteOffDays} size="large" variant="contained" >
                  Save
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
      <Row style={{ marginRight: "10px", marginTop: "10px" }}>
        <Col>
          <b className="healthHead">Overall Health</b>
          <p className="healthText">
            Productive training comes from good sleep!!
          </p>
          <p className="healthText">
            Work / Life balance has a huge effect on your ability to train
            effectively.
          </p>
          <b className="healthHead">Select and Save</b>
          <Box paddingX={0}>
            <Typography className="healthQuestion">Are you Sick?</Typography>
            <Select
              value={dropdownSick}
              onChange={(e) => {
                if(e === "SickYesNoTrain"){
                  setOpen(!open)
                }
                setDropdownSick(e)

              }}
              placeholder="SickFeedback"
              style={{ width: 200 }}
            >
              <Option value="SickNo">No</Option>
              <Option value="SickYesNoTrain">Yes - cannot train</Option>
              <Option value="SickYesLightTraining">
                Yes - light training
              </Option>
            </Select>
          </Box>
          <Box>
          <Typography className="healthQuestion">Are you injured?</Typography>
          <Select
              value={dropdownInjury}
              onChange={(e) => {
                console.log("e " , e)
                if(e === "InuryYesNoTrain"){
                  setOpen(!open)
                }
                setDropdownInjury(e)
              }}
              placeholder="InjuryFeedback"
              style={{ width: 200 }}
            >
              <Option value="InjuryNo">No</Option>
              <Option value="InuryYesNoTrain">Yes - cannot train</Option>
              <Option value="InjuryYesLightTraining">
                Yes - light training
              </Option>
            </Select>
          </Box>
          <Box paddingX={0}>
            <Typography>Average sleep per night?</Typography>
            <Select
              value={dropdownSleep}
              onChange={(e) => setDropdownSleep(e)}
              placeholder={props.customerEntity.MetricSleep }
              style={{ width: 200 }}
              defaulValue={props.customerEntity.MetricSleep }
            >
              <Option value="HardlyAny">Hardly any</Option>
              <Option value="6Less">Less Than 6</Option>
              <Option value="6To8">6-8 Hours</Option>
              <Option value="8HoursPlus">8 Hours Plus</Option>
            </Select>
          </Box>

          <Box paddingX={0}>
            <Typography>Recent Work / Life stress??</Typography>
            <Select
              value={dropdownWorkLifeStress}
              onChange={(e) => setDropdownWorkLifeStress(e)}
              placeholder="WorkLifeStressFeedback"
              style={{ width: 200 }}
            >
              <Option value="ZeroStress">Zero stress!</Option>
              <Option value="PerfectStress">Perfect balance</Option>
              <Option value="OverStress">Over stressed!</Option>
              <Option value="InsaneStress">Insanely stressed!</Option>
            </Select>
          </Box>
     
<p></p>
          <Button onClick={() => updateAthleteMetrics(props.customerEntity.id,props.customerEntity._version)}>Save</Button>
        </Col>
      </Row>
    </Card>
  );
}
