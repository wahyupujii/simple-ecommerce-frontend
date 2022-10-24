import axios from "./axios";
import users from "../constants/users";
import setAuthorizationHeader from "./setAuthorizationHeader";

export default (error) => {
    if (error) {
        let message;
        if (error.response) {
            const originalRequest = error.config;
            if (error.response.status === 500)
                message = "Something went terribly wrong";
            else if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const session = JSON.parse(sessionStorage.getItem("userLogin"));
                return users
                    .refresh({
                        refreshToken: session.refreshToken,
                        email: session.email,
                    })
                    .then((res) => {
                        if (res.data) {
                            setAuthorizationHeader(res.data.token);
                            
                            session.token = res.data.token;
                            session.refreshToken = res.data.refreshToken;
                            sessionStorage.setItem("userLogin", JSON.stringify(session));

                            originalRequest.headers.authorization = res.data.token;
                        
                            return axios(originalRequest);
                        
                        } else {
                            console.log("go login")
                        }
                    });
            } else message = error.response.data.message;

            if (typeof message === "string") console.error("message", message);

            return Promise.reject(error);
        }
    }
}