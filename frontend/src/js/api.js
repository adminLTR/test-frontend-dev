import axios from "axios";
// const SERVER_URL = "http://127.0.0.1:5000";
const SERVER_URL = "https://test-frontend-dev.onrender.com";

export function loginUser(username, password) {
    return axios.post(SERVER_URL + "/login", 
        {username, password}
    )
}

export function getModulos(token) {
    return axios.get(SERVER_URL + "/api/modulos", {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}