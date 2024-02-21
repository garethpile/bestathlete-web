import { API, graphqlOperation } from "aws-amplify";
import { customersByIdCustomer } from "../graphql/queries";
import { updateCustomer, createCustomer } from "../graphql/mutations";

export const customerGetByIdCustomer = async (idCustomer) => {
  console.log("<customerServices><customerGetByIdCustomer>: Executing ...");
  //console.log("<customerServices><customerGetByIdCustomer>: idCustomer: ", idCustomer);
  try {

    const result = await API.graphql(graphqlOperation(customersByIdCustomer, { idCustomer: idCustomer }));
    console.log("<customerServices><customerGetByIdCustomer>: result: ", result);

    let response;

    if (
      result.data.customersByIdCustomer.items &&
      result.data.customersByIdCustomer.items.length > 0) {
      response = result.data.customersByIdCustomer.items[0];
      //console.log("<customerServices><customerGetByIdCustomer>: Customer returned: ", response);
      return response;
    } else {
      console.log('<customerServices><customerGetByIdCustomer><Error><002> No customer returned');
      return false;
    }
  } catch (error) {
    console.error("<customerServices><customerGetByIdCustomer><Error><001> Error retrieving customer: ", error);
    throw error;
  }
};

export const customerUpdate = async (updatedCustomer, idCustomer) => {
  console.log(`<customerServices><customerUpdate>: Executing ...`);

  try {

    const result = await API.graphql(graphqlOperation(updateCustomer, { input: updatedCustomer }));
    return true;

  } catch (error) {
    console.error('<customerServices><customerUpdate><Error><001> Error saving user customer:', error);
  }
};

export const customerCreate = async (newCustomerData) => {
  console.log('<customerServices><customerCreate>: Executing ...');
  //console.log('<customerServices><customerCreate>: newCustomerData: ', newCustomerData);

  try {

    const result = await API.graphql(graphqlOperation(createCustomer, { input: newCustomerData }));
    console.log("<customerServices><customerCreate>: result: ", result);
    return result;

  } catch (error) {
    console.error('<customerServices><customerCreate><Error><001>: Error creating customer:', error);
    return false;
  }
};

