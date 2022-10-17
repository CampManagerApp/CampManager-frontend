import { API_URL } from "../../config"
import axios from "axios"

export const getOrganisationList = () => {
    return axios.get(`${API_URL}/organisation/`).then(res => res.data)
}

export const deleteOrganisation = (id) => {
    return axios.delete(`${API_URL}/organisation/${id}`).then(res => res.data)
}

export const addOrganisation = (form) => {
    return axios.post(`${API_URL}/organisation/`, form).then(res => res.data)
}