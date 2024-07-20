import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';


const WorkoutCard = ({ workout , onSelect }) => {

    console.log("<WorkoutCard>: Executing ...");
    //console.log("<WorkoutCard>: Event: ", workout);

     // Correctly format the date using moment
     const formattedWorkoutDateTime = workout.WorkoutDateTime ? moment(workout.WorkoutDateTime).format("DD/MM/YYYY HH:mm") : 'Invalid Date';

    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.workoutCard}>
            <Text>Type: {workout.WorkoutType}</Text>
                <Text style={styles.title}>{workout.WorkoutDescription}</Text>
                <Text>{formattedWorkoutDateTime}</Text>
                <Text>Distance: {workout.WorkoutDistance} km</Text>
                {workout.workoutTime && <Text>Time: {workout.WorkoutTime} min</Text>}
                {workout.workoutPace && <Text>Pace: {workout.WorkoutPace} min/km</Text>}
                {workout.workoutAverageHeartRate && <Text>Average Heart Rate: {workout.WorkoutAverageHeartRate} bpm</Text>}

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    workoutCard: {



        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        // Shadows for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        // Shadows for Android
        elevation: 3,
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    }
});

export default WorkoutCard;

