import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { customerGetByIdCustomer } from "../services/customerServices";
import { workoutsGetIDDateTime, workoutsGetIDDateTimeFilterAthleteFeedback } from "../services/workoutServices";
import { eventGetIDDateTime } from "../services/eventServices";
import { metricsGet3DaysWeight, metricsGet3DaysSleep } from "../services/metricServices";


import Header from "../Components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import ThreeSixtyDSL from "../ThreeSixtyDSL/ThreeSixtyDSL";
import ThirdParty from "../ThreeSixtyDSL/ThirdParty";
import Profile from "../ProfilePage/Profile";

const LandingPage = () => {
  const [cognitoEntity] = useState("");
  //const [customerEntity, setCustomerEntity] = useState({});

  const [customerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [userExists, setUserExists] = useState(false);
  const [customer, setCustomer] = useState({});

  const [workouts, setWorkouts] = useState([]);
  //const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [workoutsNoFeedback, setWorkoutsNoFeedback] = useState([]);

  const [events, setEvents] = useState([]);
  //const [selectedEvent, setSelectedEvent] = useState(null);

  const [globalUserId, setGlobalUserId] = useState(null);

  const [metrics3DaysWeight, setMetrics3DaysWeight] = useState([]);
  const [metrics3DaysSleep, setMetrics3DaysSleep] = useState([]);

  //const [redirect] = useState(false);

  //let customerDataVersion = 0;

  useEffect(() => {
    console.log("<App><useEffect()-[workouts]>: Executing ...");
    console.log("<App><useEffect()-[workouts]>: 'workouts' state variable updated to: ", workouts);
  }, [workouts]);

  useEffect(() => {
    console.log("<App><useEffect()-[workoutsNoFeedback]>: Executing ...");
    console.log("<App><useEffect()-[workoutsNoFeedback]>: 'workoutsNoFeedback' state variable updated to: ", workoutsNoFeedback);
  }, [workoutsNoFeedback]);

  useEffect(() => {
    console.log("<App><useEffect()-[events]>: Executing ...");
    console.log("<App><useEffect()-[events]>: 'events' state variable updated to: ", events);
  }, [events]);

  useEffect(() => {
    console.log("<App><useEffect()-[customer]>: Executing ...");
    console.log("<App><useEffect()-[customer]>: 'customer' state variable updated to: ", customer);
  }, [customer]);
  useEffect(() => {
    console.log("<App><useEffect()-[metrics3DaysWeight]>: Executing ...");
    console.log("<App><useEffect()-[metrics3DaysWeight]>: 'metrics3DaysWeight' state variable updated to: ", metrics3DaysWeight);
    //console.log("metrics3DaysWeight.length: ", metrics3DaysWeight.length);
  }, [metrics3DaysWeight]);

  useEffect(() => {
    console.log("<App><useEffect()-[metrics3DaysSleep]>: Executing ...");
    console.log("<App><useEffect()-[metrics3DaysSleep]>: 'metrics3DaysSleep' state variable updated to: ", metrics3DaysSleep);
    //console.log("metrics3DaysWeight.length: ", metrics3DaysWeight.length);
  }, [metrics3DaysSleep]);

  useEffect(() => {
    console.log("<LandingPage><useEffect()>: Executing ...");
    Auth.currentAuthenticatedUser({ bypassCache: true, })
      .then((authenticatedUser) => {
        if (authenticatedUser.username) {
          setGlobalUserId(authenticatedUser.username);
          console.log("<LandingPage><useEffect()>: globalUserId retrieved: ", authenticatedUser.username);
          console.log("<LandingPage><useEffect()>: Retrieve customer using customerGet() ...");
          customerGetByIdCustomer(authenticatedUser.username)
            .then(returnedCustomer => {
              if (returnedCustomer === false) {
                //console.log("<LandingPage><useEffect()>: Customer does not exist. Take user to Profile page for creation");
                setUserExists(false);
              }
              else {
                setCustomer(returnedCustomer);
                setUserExists(true);
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const startDate = sevenDaysAgo.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
                const endDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
                console.log("<LandingPage><useEffect()>: Retrieve ALL workouts for past week ...");
                workoutsGetIDDateTime(authenticatedUser.username, startDate, endDate)
                  .then(returnedWorkouts => {
                    if (returnedWorkouts.statusCode === 200) {
                      console.log("<LandingPage><useEffect()>: ALL workouts for past week retrieved: " + returnedWorkouts.body);

                      setWorkouts(returnedWorkouts.body);


                    }
                    else {
                      console.log("<LandingPage><useEffect()>: No workouts for past week ...");
                    }
                  }
                  )
                console.log("<LandingPage><useEffect()>: Retrieve <NO FEEDBACK> workouts for past week ...");
                workoutsGetIDDateTimeFilterAthleteFeedback(authenticatedUser.username, startDate, endDate, 0)
                  .then(returnedWorkoutsNoFeedback => {
                    if (returnedWorkoutsNoFeedback.statusCode === 200) {
                      console.log("<LandingPage><useEffect()>: Filter athlete feedback workouts" + returnedWorkoutsNoFeedback.body);
                      setWorkoutsNoFeedback(returnedWorkoutsNoFeedback.body);

                    }
                    else {
                      console.log("<LandingPage><useEffect()>: <NO Feedback> workouts for past week ...");
                    }
                  }
                  )
                console.log("<LandingPage><useEffect()>: Retrieve events ...");
                eventGetIDDateTime(authenticatedUser.username)
                  .then(returnedEvents => {
                    if (returnedEvents.statusCode === 200) {

                      console.log("<LandingPage><useEffect()>: Events response: " + returnedEvents);
                      console.log("<LandingPage><useEffect()>: Events retrieved: " + returnedEvents.body);
                      setEvents(returnedEvents.body);
                    }
                    else {
                      console.log(returnedEvents.body);
                      setEvents([]);

                    }
                  }
                  )
                console.log("<LandingPage><useEffect()>: Retrieve metrics3DaysWeight using metricsGet3DaysWeight() ...");
                metricsGet3DaysWeight(authenticatedUser.username)
                  .then(returnedMetrics => {

                    if (returnedMetrics.statusCode === 200) {
                      // console.log("<LandingPage><useEffect()>: Weight Metrics returned: ", returnedMetrics);

                      setMetrics3DaysWeight(returnedMetrics.body);
                    }
                    else {
                      console.log("<LandingPage><useEffect()>: NO Weight Metrics returned.");
                      setMetrics3DaysWeight({});
                    }
                  }
                  )
                console.log("<LandingPage><useEffect()>: Retrieve metrics3DaysSleep using metricsGet3DaysSleep() ...");
                metricsGet3DaysSleep(authenticatedUser.username)
                  .then(returnedMetrics => {
                    if (returnedMetrics.statusCode === 200) {
                      // console.log("<LandingPage><useEffect()>: Sleep Metrics returned: ", returnedMetrics);
                      setMetrics3DaysSleep(returnedMetrics.body);
                    }
                    else {
                      console.log("<LandingPage><useEffect()>: NO Sleep Metrics returned.");
                      setMetrics3DaysSleep({});
                    }
                  }
                  )
                setIsLoading(false);
              }
            })

            .catch(error => {
              // If customer does not exist or there's an error fetching
              console.error("<LandingPage><useEffect()><Error><003>: Error retrieving data: ", error);
              setUserExists(false);
            }
            )
        }
      })
  }, []);

  return (
    <BrowserRouter>

      <Header
        customerId={globalUserId}
        customer={customer}
        cognitoEntity={cognitoEntity}
      ></Header>

      {/* If loading, display a loading message */}
      {isLoading ? (
        <div>Loading sleep data...</div>
      ) : (
        // Render the Routes only when not loading
        <Routes>
          <Route path="/Profile" element={<Profile userExists={userExists} customer={customer} />} />
          <Route
            path="/ThirdParty"
            element={<ThirdParty customer={customer} />}
          />
          <Route
            exact
            path="/"
            element={
              <ThreeSixtyDSL
                customer={customer}
                workoutsNoFeedback={workoutsNoFeedback}
                events={events}
              />
            }
          />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );

}
export default LandingPage;
