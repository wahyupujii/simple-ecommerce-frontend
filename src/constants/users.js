import {axios} from "../config";

export default {
    login: (credentials) => axios.post("/users/login", credentials),
    register: (credentials) => axios.post("/users/register", credentials),
    refresh: (payload) => axios.post("/users/refresh-token", {
        token: payload.refreshToken,
        email: payload.email
    })
}