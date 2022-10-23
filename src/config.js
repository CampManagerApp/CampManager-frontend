import axios from "axios"

export const API_URL='http://127.0.0.1:8080'

// Axios logged instance configuration
const token = window.sessionStorage.getItem('token')
export const loggedRequest = axios.create({
    baseURL: API_URL
})
loggedRequest.defaults.headers.common['Authorization'] = 'Bearer ' + token