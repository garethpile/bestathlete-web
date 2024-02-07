import { API, graphqlOperation } from "aws-amplify";
import { createWorkout, updateWorkout, deleteWorkout } from "../graphql/mutations";
import { workoutsByIdCustomerAndWorkoutDateTime } from "../graphql/queries";

export const workoutGetIDDateTime = async (idCustomer, startDate, endDate) => {
  console.log("<workoutServices><workoutGetIDDateTime>: executing ...");
  console.log("<workoutServices><workoutGetIDDateTime>: idCustomer passed in: ", idCustomer);
  try {
    const input = {
      idCustomer: idCustomer,
      WorkoutDateTime: {
        between: [startDate, endDate]
      },
      sortDirection: 'ASC'
    }
    const result = await API.graphql(graphqlOperation(workoutsByIdCustomerAndWorkoutDateTime, input));
    console.log("<workoutServices><workoutGetIDDateTime>: result: ", result);
    if (
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items &&
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items.length > 0) {
      const response = result.data.workoutsByIdCustomerAndWorkoutDateTime.items;
      //console.log("<workoutServices><workoutGetIDDateTime>: Workout returned: ", response);
      return response;
    } else {
      console.log('<workoutServices><workoutGetIDDateTime><Error><002> No workouts returned');
      const response = [];
      return response;
    }
  } catch (error) {
    console.error("<workoutServices><workoutGetIDDateTime><Error><001>: Error retrieving NEW workouts:", error);
    return false;
  }
};

export const workoutGetIDDateTimeFilterAthleteFeedback = async (idCustomer, startDate, endDate, athleteFeedbackValue) => {
  console.log("<workoutServices><workoutGetIDDateTimeFilterAthleteFeedback>: executing ...");
  try {

    const input = {
      idCustomer: idCustomer,
      WorkoutDateTime: {
        between: [startDate, endDate]
      },
      filter: {WorkoutAthleteFeedback : {eq:athleteFeedbackValue}},
      sortDirection: 'ASC'
    };

    //console.log("<workoutServices><workoutGetIDDateTimeFilterAthleteFeedback>: input ...", input);

    const result = await API.graphql(graphqlOperation(workoutsByIdCustomerAndWorkoutDateTime, input));
    //console.log("<workoutServices><workoutGetIDDateTimeFilterAthleteFeedback>: result: ", result);
    if (
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items &&
      result.data.workoutsByIdCustomerAndWorkoutDateTime.items.length > 0) {
      const response = result.data.workoutsByIdCustomerAndWorkoutDateTime.items;
      console.log("<workoutServices><workoutGetIDDateTimeFilterAthleteFeedback>: Workout returned: ", response);
      return response;
    } else {
      console.log('<workoutServices><workoutGetIDDateTimeFilterAthleteFeedback><Error><002> No workouts returned');
      const response = [];
      return response;
    }
  } catch (error) {
    console.error("<workoutServices><workoutGetIDDateTimeFilterAthleteFeedback><Error><001>: Error retrieving NEW workouts:", error);
    return false;
  }
};

export const workoutUpdate = async (updatedFields) => {
  try {
    console.log("<workoutServices><workoutUpdate>: executing ...");
    console.log("<workoutServices><workoutUpdate>: updatedFields: ", updatedFields);

    const result = await API.graphql(graphqlOperation(updateWorkout, { input: updatedFields }));
    //console.log("<workoutServices><workoutUpdate>: Result: ", result);
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

    //console.log("<workoutServices><workoutDelete>: Result: ", result);
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