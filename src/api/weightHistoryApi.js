import axios from "./axios";

const WEIGHT_URL_WITH_ID = (id) => {return `/weight/${id}`}

export const getCurrentWeight = async (userId) => {
    const response = await axios.get(WEIGHT_URL_WITH_ID(userId));
    return response;
}

export const updateWeight = async (userId, weightData) => {
    const response = await axios.post(WEIGHT_URL_WITH_ID(userId), weightData);
    return response;
}

export const getWeightHistory = async (userId) => {
    const response = await axios.get(`${WEIGHT_URL_WITH_ID(userId)}/history`);
    return response;
}