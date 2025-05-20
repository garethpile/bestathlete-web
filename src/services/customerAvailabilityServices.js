import { API, graphqlOperation } from "aws-amplify";
import { createCustomerAvailability, updateCustomerAvailability, deleteCustomerAvailability } from "../graphql/mutations";
import { customerAvailabilitiesByIdCustomer } from "../graphql/queries";

export const customerAvailabilitiesGetByIdCustomer= async (idCustomer) => {
  console.log("<customerAvailabilityServices><customerAvailabilityGetIDDateTime>: Executing ...");
  //console.log("<customerAvailabilityServices><customerAvailabilityGetIDDateTime>: Incoming idCustomer: ", idCustomer);
  try {
    const result = await API.graphql(graphqlOperation(customerAvailabilitiesByIdCustomer, { idCustomer: idCustomer }));
    console.log("<customerAvailabilityServices><customerAvailabilityGetIDDateTime>: result: ", result);
    if (
      result.data.customerAvailabilitiesByIdCustomer.items &&
      result.data.customerAvailabilitiesByIdCustomer.items.length > 0) {
      const apiresult = result.data.customerAvailabilitiesByIdCustomer.items;
      console.log("<customerAvailabilityServices><customerAvailabilityGetIDDateTime>: CustomerAvailabilitys returned: ", apiresult);
      const responseMessage = {
        statusCode: 200,
        body: apiresult
      }
      return responseMessage;

    } else {

      const returnMessage = "<customerAvailabilityServices><customerAvailabilityGetIDDateTime><Error><002>: No customerAvailability returned";
      console.log(returnMessage);

      const responseMessage = {
        statusCode: 204,
        body: returnMessage
      }
      return responseMessage;
    }
  } catch (error) {
    console.error("<customerAvailabilityServices><customerAvailabilityGetIDDateTime><Error><001>: Error retrieving NEW customerAvailability:", error);
  }
};

export const customerAvailabilityUpdate = async (updatedFields) => {
  try {
    console.log("<customerAvailabilityServices><customerAvailabilityUpdate>: executing ...");

    const result = await API.graphql(graphqlOperation(updateCustomerAvailability, { input: updatedFields }));
    //console.log("<customerAvailabilityServices><customerAvailabilityUpdate>: Result: ", result);
    return true; 

  } catch (error) {
    console.error('<customerAvailabilityServices><customerAvailabilityUpdate><Error><001>: Error updating customerAvailability data:', error);
    return false; 
  }
};

export const customerAvailabilityDelete = async (id) => {
  try {
    console.log("<customerAvailabilityServices><customerAvailabilityDelete>: executing ...");

    const result = await API.graphql(graphqlOperation(deleteCustomerAvailability, {input: { id: id }}));

    //console.log("<customerAvailabilityServices><customerAvailabilityDelete>: Result: ", result);
    return true; 
    
  } catch (error) {
    console.error('<customerAvailabilityServices><customerAvailabilityDelete><Error><001>: Error saving customerAvailability:', error);
    return false; 
  }
};

export const customerAvailabilityCreate = async (newCustomerAvailability) => {
  console.log('<customerAvailabilityServices><customerAvailabilityCreate>: Executing ...');
  console.log('<customerAvailabilityServices><customerAvailabilityCreate>: newCustomerAvailability: ', newCustomerAvailability);
  try {
    const result = await API.graphql(graphqlOperation(createCustomerAvailability, { input: newCustomerAvailability }));
    console.log("<customerAvailabilityServices><customerAvailabilityCreate>: result: ", result);
    return result;
  } catch (error) {
    console.error('<customerAvailabilityServices><customerAvailabilityCreate><Error><001>: Error creating customerAvailability:', error);
    return false;
  }
};
  