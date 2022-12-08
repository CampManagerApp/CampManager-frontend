import { API_URL, loggedRequest } from "../../config"

export const get_usr_organisations = async (username) => {
    const res = await loggedRequest.get(`${API_URL}/users/memberships/?username=${username}`)
    return res.data
}