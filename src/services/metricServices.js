import { API, graphqlOperation } from "aws-amplify";
import { metricsByIdCustomerAndMetricDate } from "../graphql/queries";

export const metricsGet3DaysWeight = async (idCustomer) => {
  console.log("<metricServices><metricsGet3DaysWeight>: executing ...");
  //console.log("<metricServices><metricsGet3DaysWeight>: idCustomer passed in: ", idCustomer);
  try {

    const today = new Date();
    const threeDaysAgo = new Date(today);

    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const startDate = threeDaysAgo.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    const endDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

    const queryVariables = {
      idCustomer: idCustomer,
      MetricDate: {
        between: [startDate, endDate],
      },
      filter: { MetricType: { eq: 'BodyComposition' } },
      sortDirection: 'ASC'
    };

    const result = await API.graphql(graphqlOperation(metricsByIdCustomerAndMetricDate, queryVariables));
    //console.log("<metricServices><metricsGet3DaysWeight>: result: ", result);
    if (
      result.data.metricsByIdCustomerAndMetricDate.items &&
      result.data.metricsByIdCustomerAndMetricDate.items.length > 0) {
      const response = result.data.metricsByIdCustomerAndMetricDate.items;

      //console.log("<metricServices><metricsGet3DaysWeight>: Metrics returned: ", response);

      const transformedMetrics = response.map(metric => {
        //console.log("metric: ", metric);
        let metricValueParsed = JSON.parse(metric.MetricValue);
        return {
          id: metric.id,
          MetricDate: metric.MetricDate,
          MetricValue: metricValueParsed.weightInGrams
        };
      });

      const responseMessage = {
        statusCode: 200,
        body: transformedMetrics
      }
      return responseMessage;
    } else {
      const returnMessage = '<metricServices><metricsGet3DaysWeight><Error><002> No weight metrics returned';
      console.log(returnMessage);
      const responseMessage = {
        statusCode: 204,
        body: returnMessage
      }
      return responseMessage;
    }
  } catch (error) {
    const errorMessage = '<metricServices><metricsGet3DaysWeight><Error><001>: Error retrieving weight metrics: ' + error;
    console.error(errorMessage);
    const responseMessage = {
      statusCode: 500,
      body: errorMessage
    }
    return responseMessage;
  }
};

export const metricsGet3DaysSleep = async (idCustomer) => {
  console.log("<metricServices><metricsGet3DaysSleep>: executing ...");
  //console.log("<metricServices><metricsGet3DaysSleep>: idCustomer passed in: ", idCustomer);
  try {

    const today = new Date();
    const threeDaysAgo = new Date(today);

    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const startDate = threeDaysAgo.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    const endDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

    const queryVariables = {
      idCustomer: idCustomer,
      MetricDate: {
        between: [startDate, endDate],
      },
      filter: { MetricType: { eq: 'Sleep' } },
      sortDirection: 'ASC'
    };

    const result = await API.graphql(graphqlOperation(metricsByIdCustomerAndMetricDate, queryVariables));
    //console.log("<metricServices><metricsGet3DaysSleep>: result: ", result);
    if (
      result.data.metricsByIdCustomerAndMetricDate.items &&
      result.data.metricsByIdCustomerAndMetricDate.items.length > 0) {
      const response = result.data.metricsByIdCustomerAndMetricDate.items;

      //console.log("<metricServices><metricsGet3DaysSleep>: Metrics returned: ", response);

      const transformedMetrics = response.map(metric => {
        // Parse the MetricValue string into a JSON object
        const metricValue = JSON.parse(metric.MetricValue);

        return {
          id: metric.id,
          MetricDate: metric.MetricDate,
          MetricValue: metricValue
        };
      });

      const responseMessage = {
        statusCode: 200,
        body: transformedMetrics
      }
      return responseMessage;
    } else {
      const returnMessage = '<metricServices><metricsGet3DaysSleep><Error><002> No sleep metrics returned';
      console.log(returnMessage);
      const responseMessage = {
        statusCode: 204,
        body: returnMessage
      }
      return responseMessage;
    }
  } catch (error) {
    const errorMessage = '<metricServices><metricsGet3DaysSleep><Error><001>: Error retrieving sleep metrics: ' + error;
    console.error(errorMessage);
    const responseMessage = {
      statusCode: 500,
      body: errorMessage
    }
    return responseMessage;
  }
};