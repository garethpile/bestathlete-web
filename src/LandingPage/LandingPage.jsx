import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";

import { customersByIdCustomer } from "../graphql/queries";
import { createCustomer } from "../graphql/mutations";

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
  const [isLoading, setIsLoading] = useState(true);

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
        graphqlOperation(customersByIdCustomer, { idCustomer: userName })
      );
      // If the 360 Customer does not exist ....
      if (!customerData.data.customersByIdCustomer) {
        console.log("Customer does not exist .... Lets' create new customer ....");

        const newCustomer = await API.graphql(
          graphqlOperation(createCustomer, {
            idCustomer: userName,
            EmailAddress: userEmail,
            MobileNumber: "+27821234567",
            Gender: "_",
            FirstName: "-",
            LastName: "-",
            Country: "South Africa",
            DateOfBirth: "1901-01-01",
            TrainingDays: {
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
              FridayTrainHours: 1
            }
          })
        );

        setCustomerEntity({
          ...customerEntity,
          idCustomer: userName,
          EmailAddress: userEmail,
          MobileNumber: "+27821234567",
          Male: "-",
          FirstName: "-",
          LastName: "-",
          Country: "South Africa",
          DateOfBirth: "1901-01-01",
          TrainingDays: {
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
            _version: 1
          }
        });
        // console.log( "Newly created customer copied into customerEntity: ",customerEntity);
        setRedirect(true);
        setIsLoading(false);
      } else {
        // Else Customer exists ....
        console.log("<LandingPage>: Customer exsists ....");
        console.log("<LandingPage>: Customer Data returned: ", customerData.data.customersByIdCustomer.items[0]);
        const customerDataEntity = customerData.data.customersByIdCustomer.items[0];
        setCustomerEntity({
          ...customerEntity,
          idCustomer: userName,
          EmailAddress: customerDataEntity.hasOwnProperty('EmailAddress') ? customerDataEntity.EmailAddress : '',
          MobileNumber: customerDataEntity.hasOwnProperty('MobileNumber') ? customerDataEntity.MobileNumber : '',
          Gender: customerDataEntity.hasOwnProperty('Gender') ? customerDataEntity.Gender : '',
          FirstName: customerDataEntity.hasOwnProperty('FirstName') ? customerDataEntity.FirstName : '',
          LastName: customerDataEntity.hasOwnProperty('LastName') ? customerDataEntity.LastName : '',
          Country: customerDataEntity.hasOwnProperty('Country') ? customerDataEntity.Country : 'South Africa',
          DateOfBirth: customerDataEntity.hasOwnProperty('DateOfBirth') ? customerDataEntity.DateOfBirth : '1901-01-01',
          TrainingDays: {

            SaturdayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.SaturdayTrain') ? customerDataEntity.TrainingDays.SaturdayTrain : true,

            SaturdayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.SaturdayTrainHours') ? customerDataEntity.TrainingDays.SaturdayTrainHours : 1,
            SundayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.SundayTrain') ? customerDataEntity.TrainingDays.SundayTrain : true,
            SundayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.SundayTrainHours') ? customerDataEntity.TrainingDays.SundayTrainHours : 1,
            MondayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.MondayTrain') ? customerDataEntity.TrainingDays.MondayTrain : true,
            MondayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.MondayTrainHours') ? customerDataEntity.TrainingDays.MondayTrainHours : 1,
            TuesdayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.TuesdayTrain') ? customerDataEntity.TrainingDays.TuesdayTrain : true,
            TuesdayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.TuesdayTrainHours') ? customerDataEntity.TrainingDays.TuesdayTrainHours : 1,
            WednesdayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.WednesdayTrain') ? customerDataEntity.TrainingDays.WednesdayTrain : true,
            WednesdayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.WednesdayTrainHours') ? customerDataEntity.TrainingDays.WednesdayTrainHours : 1,
            ThursdayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.ThursdayTrain') ? customerDataEntity.TrainingDays.ThursdayTrain : true,
            ThursdayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.ThursdayTrainHours') ? customerDataEntity.TrainingDays.ThursdayTrainHours : 1,
            FridayTrain:
              customerDataEntity.hasOwnProperty('TrainingDays.FridayTrain') ? customerDataEntity.TrainingDays.FridayTrain : true,
            FridayTrainHours:
              customerDataEntity.hasOwnProperty('TrainingDays.FridayTrainHours') ? customerDataEntity.TrainingDays.FridayTrainHours : 1,
            _version: customerDataEntity._version
          }
        });

        customerDataVersion = customerDataEntity?._version;
        console.log("Customer version (Landing Page): ", customerDataVersion);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error retrieving customer entity: ", error);
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

      {/* If loading, display a loading message */}
      {isLoading ? (
        <div>Loading sleep data...</div>
      ) : (
        // Render the Routes only when not loading
        <Routes>
          <Route path="/Profile" element={<Profile setRedirect={setRedirect} customerEntity={customerEntity} />} />
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
