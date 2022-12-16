import { isPlatform } from "@ionic/react"
import axios from "axios"

//export const API_URL='http://localhost:8080'
export const API_URL = 'http://localhost:8080' 
// Axios logged instance configuration
const token = localStorage.getItem('token')
export const loggedRequest = axios.create({
    baseURL: isPlatform('android') ? 'http://10.0.2.2:8080' : 'http://localhost:8080'  // provisional
    //baseURL: API_URL
})

loggedRequest.defaults.headers.common['Authorization'] = 'Bearer ' + token