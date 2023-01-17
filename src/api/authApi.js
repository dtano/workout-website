import axios from "./axios";

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";

export const register = async (body) => {
    const response = await axios.post(REGISTER_URL, body);
    return response;
}

export const login = async (body) => {
    const response = await axios.post(LOGIN_URL, body);
    return response;
}