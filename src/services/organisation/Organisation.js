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


export const delete_org_unclaimed_user = async (orgname, fullname) => {
    const url = `${API_URL}/names/role/`
    const res = await loggedRequest.delete(url, {
        data: {
            orgname: orgname,
            fullname: fullname,
        }
    })
    return res.data
}


export const update_org_unclaimed_user = async (orgname, fullname, is_admin, is_member) => {
    const url = `${API_URL}/names/role/`
    const res = await loggedRequest.put(url, {
        orgname: orgname,
        fullname: fullname,
        is_admin: is_admin,
        is_member: is_member
    })
    return res.data
}

export const registry_org_member = async (orgname, fullname, is_admin, is_member) => {
    const url = `${API_URL}/names/role/`
    const res = await loggedRequest.post(url, {
        orgname: orgname,
        fullname: fullname,
        is_admin: is_admin,
        is_member: is_member
    })
    return res.data
}

export const delete_org_member = async (orgname, username) => {
    const url = `${API_URL}/users/role/`
    const res = await loggedRequest.delete(url, {
        data: {
            orgname: orgname,
            username: username,
        }
    })
    return res.data
}

export const update_org_member = async (orgname, username, is_admin, is_member) => {
    const url = `${API_URL}/users/role/`
    const res = await loggedRequest.put(url, {
        orgname: orgname,
        username: username,
        is_admin: is_admin,
        is_member: is_member
    })
    return res.data
}

export const get_org_members = async (org_id) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/${org_id}/members`)
    return res.data
}


export const get_org_claimed_members = async (org_id) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/${org_id}/users`)
    return res.data
} 

export const get_org_unclaimed_members = async (org_id) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/${org_id}/names`)
    return res.data
}


export const get_org_unclaimed_user_role = async (orgname, fullname) => {
    const url = `${API_URL}/names/role/?orgname=${orgname}&fullname=${fullname}`
    const res = await loggedRequest.get(url, {
        data: {
            orgname: orgname,
            fullname: fullname,
        }
    })
    return res.data
}

/************************************
*   Campaigns endpoints requests    *
************************************/
export const get_org_campaigns = async (org_id) => {
    const res = await loggedRequest.get(`${API_URL}/organisation/${org_id}/campaign/all/`)
    return res.data
}

export const create_org_campaign = async (org_id, campaign_name, start, end) => {
    const res = await loggedRequest.post(`${API_URL}/organisation/${org_id}/campaign/`, {
        campaign_name: campaign_name,
        start: start,
        end: end
    })
    return res.data
}

export const delete_org_campaign = async (org_id, campaign_name) => {
    const res = await loggedRequest.delete(`${API_URL}/organisation/${org_id}/campaign/`, {
        data: {
            campaign_name: campaign_name,
        }
    })
    return res.data
}

export const update_org_campaign = async (org_id, campaign_name, end) => {
    const res = await loggedRequest.put(`${API_URL}/organisation/${org_id}/campaign/`, {
        campaign_name: campaign_name,
        end: end
    })
    return res.data
}