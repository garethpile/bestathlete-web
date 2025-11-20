import { API, graphqlOperation } from "aws-amplify";
import { rollingAveragesByIdCustomer } from "../graphql/queries";

export const rollingAveragesGetByCustomer = async (idCustomer) => {
  try {
    const result = await API.graphql(
      graphqlOperation(rollingAveragesByIdCustomer, {
        idCustomer,
        limit: 1,
        sortDirection: "DESC",
      })
    );

    const items = result?.data?.rollingAveragesByIdCustomer?.items || [];
    return {
      statusCode: 200,
      body: items[0] || null,
    };
  } catch (error) {
    console.error("<rollingAverageServices><rollingAveragesGetByCustomer><Error>:", error);
    return {
      statusCode: 500,
      body: null,
    };
  }
};

