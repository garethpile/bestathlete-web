import { API, graphqlOperation } from "aws-amplify";
import { createWorkout, updateWorkout, deleteWorkout } from "../graphql/mutations";
import { workoutsByIdCustomerAndWorkoutDateTime } from "../graphql/queries";

export const workoutsGetIDDateTime = async (idCustomer, startDate, endDate) => {
  console.log("<workoutServices><workoutsGetIDDateTime>: executing ...");
  console.log("<workoutServices><workoutsGetIDDateTime>: idCustomer passed in: ", idCustomer);
  try {
    const input = {
      idCustomer: idCustomer,
      WorkoutDateTime: {
        between: [startDate, endDate]
      },
      sortDirection: 'ASC'
    }
    const result = await API.graphql(graphqlOperation(workoutsByIdCustomerAndWorkoutDateTime, input));
  
    if (
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items &&
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items.length > 0) {
      const apiresult = result.data.workoutsByIdCustomerAndWorkoutDateTime.items;
      console.log("<workoutServices><workoutsGetIDDateTime>: Workout returned: ", apiresult);
      const response = {
        statusCode: 200,
        body: apiresult
      }
      return response;

    } else {
      const body = "<workoutServices><workoutsGetIDDateTime><Info><002>: No workouts returned";
      console.log(body);

      const response = {
        statusCode: 204,
        body: body
      }
      return response;

    }
  } catch (error) {
    const errorMessage = "<workoutServices><workoutsGetIDDateTime><Error><001>: Error retrieving NEW workouts:" + error;
    console.error(errorMessage);
    const responseMessage = {
      statusCode: 500,
      body: errorMessage
    }
    return responseMessage;
  }
};

export const workoutsGetIDDateTimeFilterAthleteFeedback = async (idCustomer, startDate, endDate, athleteFeedbackValue) => {
  console.log("<workoutServices><workoutsGetIDDateTimeFilterAthleteFeedback>: executing ...");
  try {

    const input = {
      idCustomer: idCustomer,
      WorkoutDateTime: {
        between: [startDate, endDate]
      },
      filter: { WorkoutAthleteFeedback: { eq: athleteFeedbackValue } },
      sortDirection: 'ASC'
    };

    //console.log("<workoutServices><workoutsGetIDDateTimeFilterAthleteFeedback>: input ...", input);

    const result = await API.graphql(graphqlOperation(workoutsByIdCustomerAndWorkoutDateTime, input));
    //console.log("<workoutServices><workoutsGetIDDateTimeFilterAthleteFeedback>: result: ", result);
    if (
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items &&
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items.length > 0) {
      const apiresult = result.data.workoutsByIdCustomerAndWorkoutDateTime.items;
      //console.log("<workoutServices><workoutsGetIDDateTimeFilterAthleteFeedback>: Workouts returned: ", apiresult);
      const response = {
        statusCode: 200,
        body: apiresult
      }
      return response;

    } else {
      const returnMessage = "<workoutServices><workoutsGetIDDateTimeFilterAthleteFeedback><Info><002>: No workouts returned";
      console.log(returnMessage);

      const response = {
        statusCode: 200,
        body: returnMessage
      }
      return response;
    }
  } catch (error) {
    const errorMessage = "<workoutServices><workoutsGetIDDateTimeFilterAthleteFeedback><Error><001>: Error retrieving NEW workouts:" + error;
    console.error(errorMessage);
    const responseMessage = {
      statusCode: 500,
      body: errorMessage
    }
    return responseMessage;
  }
};

export const workoutUpdate = async (updatedFields) => {
  try {
    console.log("<workoutServices><workoutUpdate>: executing ...");
    console.log("<workoutServices><workoutUpdate>: updatedFields: ", updatedFields);

    const result = await API.graphql(graphqlOperation(updateWorkout, { input: updatedFields }));
    console.log("<workoutServices><workoutUpdate>: Result: ", result);
    return true;

  } catch (error) {
    console.error('<workoutServices><workoutUpdate><Error><001>: Error updating workout data:', error);
    return false;
  }
};

export const workoutDelete = async (idWorkout) => {
  try {
    console.log("<workoutServices><workoutDelete>: executing ...");

    const result = await API.graphql(graphqlOperation(deleteWorkout, { input: { id: idWorkout } }));

    console.log("<workoutServices><workoutDelete>: Result: ", result);
    return true;

  } catch (error) {
    console.error('<workoutServices><workoutDelete><Error><001>: Error saving event:', error);
    return false;
  }
};

export const workoutCreate = async (newWorkoutCreate) => {
  console.log('<workoutServices><workoutCreate>: Executing ...');
  //console.log('<workoutServices><workoutCreate>: newWorkoutCreate: ', newWorkoutCreate);
  try {
    const result = await API.graphql(graphqlOperation(createWorkout, { input: newWorkoutCreate }));
    console.log("<workoutServices><workoutCreate>: result: ", result);
    return result;
  } catch (error) {
    console.error('<workoutServices><workoutCreate><Error><001>: Error creating customer:', error);
    return false;
  }
};