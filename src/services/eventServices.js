import { API, graphqlOperation } from "aws-amplify";
import { createEvent, updateEvent, deleteEvent } from "../graphql/mutations";
import { eventsByIdCustomerAndEventDate } from "../graphql/queries";

export const eventGetIDDateTime= async (idCustomer, dateTime) => {
  console.log("<eventServices><eventGetIDDateTime>: Executing ...");
  //console.log("<eventServices><eventGetIDDateTime>: Incoming idCustomer: ", idCustomer);
  try {
    const result = await API.graphql(graphqlOperation(eventsByIdCustomerAndEventDate, { idCustomer: idCustomer }));
    //console.log("<eventServices><eventGetIDDateTime>: result: ", result);
    if (
      result.data.eventsByIdCustomerAndEventDate.items &&
      result.data.eventsByIdCustomerAndEventDate.items.length > 0) {
      const response = result.data.eventsByIdCustomerAndEventDate.items;
      //console.log("<eventServices><eventGetIDDateTime>: Workout returned: ", response);
      return response;
    } else {
      console.log('<eventServices><eventGetIDDateTime><Error><002> No events returned');
      const response = [];
      return response;
    }
  } catch (error) {
    console.error("<eventServices><eventGetIDDateTime><Error><001>: Error retrieving NEW events:", error);
  }
};

export const eventUpdate = async (updatedFields) => {
  try {
    console.log("<eventServices><eventUpdate>: executing ...");

    const result = await API.graphql(graphqlOperation(updateEvent, { input: updatedFields }));
    //console.log("<eventServices><eventUpdate>: Result: ", result);
    return true; 

  } catch (error) {
    console.error('<eventServices><eventUpdate><Error><001>: Error updating event data:', error);
    return false; 
  }
};

export const eventDelete = async (id) => {
  try {
    console.log("<eventServices><eventDelete>: executing ...");

    const result = await API.graphql(graphqlOperation(deleteEvent, {input: { id: id }}));

    //console.log("<eventServices><eventDelete>: Result: ", result);
    return true; 
    
  } catch (error) {
    console.error('<eventServices><eventDelete><Error><001>: Error saving event:', error);
    return false; 
  }
};

export const eventCreate = async (newEvent) => {
  console.log('<eventServices><eventCreate>: Executing ...');
  //console.log('<eventServices><eventCreate>: newEvent: ', newEvent);
  try {
    const result = await API.graphql(graphqlOperation(createEvent, { input: newEvent }));
    //console.log("<eventServices><eventCreate>: result: ", result);
    return result;
  } catch (error) {
    console.error('<eventServices><eventCreate><Error><001>: Error creating event:', error);
    return false;
  }
};
  