import { API_URL, loggedRequest } from "../../config"

export const get_organisation_by_code = async (code) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/code/?code=${code}`)
    return res.data
}

export const get_org_unclaimned_members = async (id) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/${id}/names`)
    return res.data
}

export const claim_org_member = async (username, orgname, fullname) => {
    const url = `${API_URL}/names/role/claim`
    const res = await loggedRequest.post(url, {
        username: username,
        orgname: orgname,
        fullname: fullname
    })
    return res.data
}

export const get_org_members = async (org_id) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/${org_id}/members`)
    return res.data
}