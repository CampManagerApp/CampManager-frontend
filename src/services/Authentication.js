import { API_URL, loggedRequest } from "../config"
import axios from "axios"

export const loginRequest = async (form) => {
    const res = await axios.post(`${API_URL}/api/login/`, form,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    loggedRequest.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
    return res.data
}
