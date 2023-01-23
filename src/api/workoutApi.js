import axios from "./axios";

const WORKOUT_URL = "/workout";
const WORKOUT_URL_WITH_ID = (id) => `/workout/${id}`;

export const getAllWorkouts = async () => {
    const response = await axios.get(WORKOUT_URL);
    return response;
}

export const getWorkoutById = async (id) => {
    const response = await axios.get(WORKOUT_URL_WITH_ID(id));
    return response;
}