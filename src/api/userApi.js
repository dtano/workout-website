import axios from "./axios";

const USER_URL_WITH_ID = (id) => {return `/user/${id}`};

export const getUserInformation = async (userId) => {
    const response = await axios.get(USER_URL_WITH_ID(userId));
    return response;
}

export const updateUserInformation = async (userId, body) => {
    const response = await axios.put(USER_URL_WITH_ID(userId), body);
    return response;
}