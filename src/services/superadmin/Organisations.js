import { API_URL, loggedRequest } from "../../config"
import axios from "axios"



export const getOrganisationList = () => {
    return loggedRequest.get('/organisation/', {
    }).then(res => res.data)
}

export const deleteOrganisation = (id) => {
    return loggedRequest.delete(`${API_URL}/organisation/${id}`).then(res => res.data)
}

export const addOrganisation = (form) => {
    return loggedRequest.post(`${API_URL}/organisation/`, form).then(res => res.data)
}

export const updateOrganisation = (id, form) => {
    return loggedRequest.put(`${API_URL}/organisation/${id}`, form).then(res => res.data)
}

export const getOrganisation = (id) => {
    return loggedRequest.get(`${API_URL}/organisation/${id}`).then(res => res.data)
}