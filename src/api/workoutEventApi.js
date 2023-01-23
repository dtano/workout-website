import axios from "./axios";

const WORKOUT_EVENT_WITH_USER_ID_URL = (userId) => `/workout/event/${userId}`;

export const getAllUserWorkouts = async (userId) => {
    const userWorkoutsResponse = await axios.get(WORKOUT_EVENT_WITH_USER_ID_URL(userId));
    return userWorkoutsResponse;
}

export const createUserWorkoutEvent = async (userId, body) => {
    const userWorkoutEventResponse = await axios.post(WORKOUT_EVENT_WITH_USER_ID_URL(userId), body);
    return userWorkoutEventResponse;
}