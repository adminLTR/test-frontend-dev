import axios from "axios";
const SERVER_URL = "http://127.0.0.1:5000";

export function loginUser(username, password) {
    return axios.post(SERVER_URL + "/login", 
        {username, password}
    )
}