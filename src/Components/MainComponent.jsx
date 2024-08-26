import {React, useState} from "react";
import { Tabs } from "antd";
import Dashboard from "./Dashboard";
import Workouts from "./Workouts";
import ThirdPartyCard from "./ThirdPartyCard";
import Profile from "../ProfilePage/Profile";
import Modal from "./Modal/Modal";
import { Grid } from "@mui/material";

const { TabPane } = Tabs;

export default function MainComponent({ customer, events, workoutsNoFeedback, userExists }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Dashboard" key="1">
          <Dashboard customer={customer} events={events} setOpen={setOpen} />
        </TabPane>
        <TabPane tab="Workouts" key="2">
          <Workouts workoutsNoFeedback={workoutsNoFeedback} />
        </TabPane>
        <TabPane tab="ThirdParty" key="3">
          <ThirdPartyCard customerEntity={customer} />
        </TabPane>
        <TabPane tab="Profile" key="4">
          <Profile userExists={userExists} customer={customer} />
        </TabPane>
      </Tabs>

      <Modal header="Enter Event Details" open={open} size="sm" closeHandler={() => setOpen(!open)}>
        <Grid container spacing={2}>
          {/* Modal form elements */}
        </Grid>
      </Modal>
    </div>
  );
}