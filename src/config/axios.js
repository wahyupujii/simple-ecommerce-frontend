import axios from "axios"
import errorHandler from "./errorHandler";

const instance = axios.create({
    baseURL: "http://localhost:3000",
})

instance.interceptors.response.use(
    response => {
        // console.log("response", response.data)
        return response.data
    }, 
    error => {
        console.log(error)
        return errorHandler(error)
    }
)

export default instance;