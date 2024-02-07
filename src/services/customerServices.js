import { API, graphqlOperation } from "aws-amplify";
import { customersByIdCustomer } from "../graphql/queries";
import { updateCustomer, createCustomer } from "../graphql/mutations";

export const customerGetByIdCustomer = async (idCustomer) => {
  console.log("<customerServices><customerGet>: Executing ...");
  //console.log("<customerServices><customerGet>: idCustomer: ", idCustomer);
  try {

    const result = await API.graphql(graphqlOperation(customersByIdCustomer, { idCustomer: idCustomer }));
    //console.log("<customerServices><customerGet>: result: ", result);

    let response;

    if (
      result.data.customersByIdCustomer.items &&
      result.data.customersByIdCustomer.items.length > 0) {
      response = result.data.customersByIdCustomer.items[0];
      //console.log("<customerServices><customerGet>: Customer returned: ", response);
      return response;
    } else {
      console.log('<customerServices><customerGet><Error><002> No customer returned');
      return false;
    }
  } catch (error) {
    console.error("<customerServices><customerGet><Error><001> Error retrieving customer: ", error);
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

