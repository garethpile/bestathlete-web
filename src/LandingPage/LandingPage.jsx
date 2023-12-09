import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";

import { createCustomer360DSL, getCustomerByID } from "../Apollo/queries";
import axios from "axios";

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
  const [cognitoEntity, setCognitoEntity] = useState("");
  const [customerEntity, setCustomerEntity] = useState({
    id: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    Male: false,
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
    SaturdayTrainHours: 3,
    SundayTrainHours: 2,
    MondayTrainHours: 1,
    TuesdayTrainHours: 1,
    WednesdayTrainHours: 1,
    ThursdayTrainHours: 1,
    FridayTrainHours: 1,
  });

  const [customerId, setCustomerId] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [stravaInfo, setStravaInfo] = useState("");
  let customerDataVersion = 0;

  let stravaPartyId = "";

  const getCustomer = async (authenticatedUser) => {
    try {
      // console.log("cognitoEntity inside getCustomer: ", cognitoEntity);
      const userEmail = authenticatedUser.attributes.email;
      const userName = authenticatedUser.username;
      // Attempt to get 360DSL Customer .....
      const customerData = await API.graphql(
        graphqlOperation(getCustomerByID, { id: userName })
      );
      // If the 360 Customer does not exist ....
      if (!customerData.data.getCUSTOMER360DSL) {
       //  console.log( "Customer does not exist .... Lets' create new customer ...." );

        const newCustomer = await API.graphql(
          graphqlOperation(createCustomer360DSL, {
            id: userName,
            EmailAddress: userEmail,
            MobileNumber: "+27821234567",
            Male: true,
            FirstName: "-",
            LastName: "-",
            Country: "South Africa",
            DateOfBirth: "1901-01-01",
            SaturdayTrain: true,
            SaturdayTrainHours: 1,
            SundayTrain: true,
            SundayTrainHours: 1,
            MondayTrain: true,
            MondayTrainHours: 1,
            TuesdayTrain: true,
            TuesdayTrainHours: 1,
            WednesdayTrain: true,
            WednesdayTrainHours: 1,
            ThursdayTrain: true,
            ThursdayTrainHours: 1,
            FridayTrain: true,
            FridayTrainHours: 1,
          })
        );

        setCustomerEntity({
          ...customerEntity,
          id: userName,
          EmailAddress: userEmail,
          MobileNumber: "+27821234567",
          Male: true,
          FirstName: "-",
          LastName: "-",
          Country: "South Africa",
          DateOfBirth: "1901-01-01",
          SaturdayTrain: true,
          SaturdayTrainHours: 1,
          SundayTrain: true,
          SundayTrainHours: 1,
          MondayTrain: true,
          MondayTrainHours: 1,
          TuesdayTrain: true,
          TuesdayTrainHours: 1,
          WednesdayTrain: true,
          WednesdayTrainHours: 1,
          ThursdayTrain: true,
          ThursdayTrainHours: 1,
          FridayTrain: true,
          FridayTrainHours: 1,
          _version: 1,
        });
       // console.log( "Newly created customer copied into customerEntity: ",customerEntity);
        setRedirect(true);
      } else {
        // Else Customer exists ....
       // console.log("Customer exsists ....");
         console.log( "Customer Data returned: ", customerData.data.getCUSTOMER360DSL );
        setCustomerEntity({
          ...customerEntity,
          id: userName,
          EmailAddress: customerData.data.getCUSTOMER360DSL.EmailAddress,
          MobileNumber: customerData.data.getCUSTOMER360DSL.MobileNumber,
          Male: customerData.data.getCUSTOMER360DSL.Male,
          FirstName: customerData.data.getCUSTOMER360DSL.FirstName,
          LastName: customerData.data.getCUSTOMER360DSL.LastName,
          Country: customerData.data.getCUSTOMER360DSL.Country,
          DateOfBirth: customerData.data.getCUSTOMER360DSL.DateOfBirth,
          SaturdayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.SaturdayTrain,
          SaturdayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays.SaturdayTrainHours,
          SundayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.SundayTrain,
          SundayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays.SundayTrainHours,
          MondayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.MondayTrain,
          MondayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays.MondayTrainHours,
          TuesdayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.TuesdayTrain,
          TuesdayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays.TuesdayTrainHours,
          WednesdayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.WednesdayTrain,
          WednesdayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays
              .WednesdayTrainHours,
          ThursdayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.ThursdayTrain,
          ThursdayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays.ThursdayTrainHours,
          FridayTrain:
            customerData.data.getCUSTOMER360DSL.TrainingDays.FridayTrain,
          FridayTrainHours:
            customerData.data.getCUSTOMER360DSL.TrainingDays.FridayTrainHours,
          _version: customerData.data.getCUSTOMER360DSL._version,
        });

        customerDataVersion = customerData.data.getCUSTOMER360DSL?._version;
        console.log("Customer version (Landing Page): ", customerDataVersion);
      }
    } catch (error) {
      console.log("Error retrieving CUSTOMER360DSL entity: ", error);
      alert(
        `Apologies! There was a technical error. Please email info@360dsl.co.za`
      );
      setRedirect(true);
    }
  };

  const getStravaPartyId = async (customer360dslId) => {
    try {
      let stravaInformation = await axios.get(
        `https://p7v775qaqh.execute-api.eu-west-1.amazonaws.com/prod/strava?customer360dslId=${customer360dslId}`
      );
      //console.log("Strava Party Information retrieved: ", stravaInformation);
      //console.log("Strava Party Information body retrieved: ", stravaInformation.data.body);
      //console.log("Strava Party Information Item[0] retrieved: ", stravaInformation.data.body.Items[0]);

      if (
        stravaInformation.data.body.Items[0]?.PartyId === undefined ||
        stravaInformation.data.body.Items[0]?.PartyId === null
      ) {
        console.log("Strava Party Id could not be retrieved ...");
      } else {
        stravaPartyId = stravaInformation.data.body.Items[0].PartyId;
        console.log(
          "Strava Party Id retrieved: ",
          stravaInformation.data.body.Items[0].PartyId
        );
        setStravaInfo(stravaInformation.data.body.Items[0]);
        // console.log("stravaInfo: ", stravaInfo);
      }
    } catch (error) {
      console.log("Error retrieving Strava Party info ....", error);
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((authenticatedUser) => {
        setCustomerId(authenticatedUser.username);
        setCognitoEntity(authenticatedUser);

        // console.log("Cognito user: ", authenticatedUser);
        // console.log("Cognito email: ", authenticatedUser.attributes.email);
        // console.log("Cognito username: ", authenticatedUser.username);

        // console.log("cognitoEntity set to: ", { cognitoEntity });

        // console.log("Get customer data of current logged in user: ",authenticatedUser.username);
        getCustomer(authenticatedUser);
        // console.log("Retrieve Strava Party Id ...");
        getStravaPartyId(authenticatedUser.username);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Header
        customerId={customerId}
        customerEntity={customerEntity}
        cognitoEntity={cognitoEntity}
      ></Header>
      {redirect ? (
        <Profile setRedirect={setRedirect} customerEntity={customerEntity} />
      ) : (
        <Routes>
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/ThirdParty"
            element={<ThirdParty customerEntity={customerEntity} />}
          />
          <Route
            exact
            path="/"
            element={
              <ThreeSixtyDSL
                customerId={customerId}
                customerEntity={customerEntity}
                stravaData={stravaInfo}
              />
            }
          />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default LandingPage;
