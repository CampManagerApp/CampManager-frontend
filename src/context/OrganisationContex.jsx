import { start } from "@popperjs/core";
import { useContext } from "react";
import { createContext } from "react";
import { useTranslation } from "react-i18next";
import { Organisations } from "../data/organisations";
import { add_org_campaign_counsellor, claim_org_member, create_org_campaign, delete_org_campaign, delete_org_member, delete_org_unclaimed_user, get_organisation_by_code, get_organisation_by_name, get_org_campaigns, get_org_claimed_members, get_org_members, get_org_unclaimed_members, get_org_unclaimed_user_role, get_org_unclaimned_members, registry_org_member, update_org_campaign, update_org_member, update_org_unclaimed_user } from "../services/organisation/Organisation"
import { MessageContext } from "./MessageContex";


export const organisationContex = createContext()

export default function OrganisationProvider(props) {

    const { showErrorMessage } = useContext(MessageContext)
    const { t, i18n } = useTranslation('common');

    function get_organisation(org_id) {
        console.log(org_id)
        const organisation = Organisations.filter((org) => {
            return org.id == org_id
        })
        return organisation[0]
    }


    async function get_org_unclaimed_users(org_id) {
        try {
            return await get_org_unclaimned_members(org_id);
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
        }
    }

    async function get_org_by_code(code) {
        try {
            const data = await get_organisation_by_code(code);
            const org = { ...Organisations[0], ['name']: data.name, ['id']: data.id }
            return org
        } catch (error) {
            if (!error.response) {
                showErrorMessage(t("ERRORS.CONEXION_ERROR.ERROR_MODAL_TITLE"), t("ERRORS.CONEXION_ERROR.ERROR_MODAL_BODY"))
            } else if (error.response.status == 404) {
                throw new { not_found: true }
            }
        }
    }

    async function get_by_name(name) {
        try {
            const org = await get_organisation_by_name(name);
            return org
        } catch (error) {
            if (!error.response) {
                showErrorMessage(t("ERRORS.CONEXION_ERROR.ERROR_MODAL_TITLE"), t("ERRORS.CONEXION_ERROR.ERROR_MODAL_BODY"))
            } else if (error.response.status == 404) {
                throw new { not_found: true }
            }
        }
    }

    async function get_claimed_members(org_id) {
        try {
            const members = await get_org_claimed_members(org_id)
            return members
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
        }
    }

    async function get_members_list(org_id, org_name = '') {
        try {
            const members = await get_org_members(org_id)
            const members_list = await Promise.all(members.map(async (member) => {
                if (member.organisations != null) {
                    return member
                }
                const name_member = await get_org_unclaimed_user_role(org_name, member.full_name)
                return { ...member, ['is_admin']: name_member.is_admin }
            }))
            return members_list
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
            return []
        }
    }

    async function registry_new_member(orgname, fullname, is_admin, is_member) {
        try {
            await registry_org_member(orgname, fullname, is_admin, is_member)
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
            if (error.response.status == 403)
                alert("Forbbiden")
        }
    }

    async function delete_member(orgname, username, is_claimed = true) {
        try {
            if (is_claimed) {
                await delete_org_member(orgname, username)
            } else {
                await delete_org_unclaimed_user(orgname, username)
            }
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
            if (error.response.status == 403)
                alert("Forbbiden")
        }
    }

    async function update_member(orgname, name, is_admin, is_member, is_claimed = true) {
        try {
            if (is_claimed) {
                await update_org_member(orgname, name, is_admin, is_member)
            } else {
                await update_org_unclaimed_user(orgname, name, is_admin, is_member)
            }
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
            if (error.response.status == 403)
                alert("Forbbiden")
        }
    }

    async function get_campaings_list(org_id) {
        try {
            const campaigns_list = await get_org_campaigns(org_id)
            return campaigns_list.map((campaing) => {
                const startDate = new Date(campaing.startDate).toLocaleDateString('es')
                const endDate = new Date(campaing.endDate).toLocaleDateString('es')
                return { ...campaing, ['startDate']: startDate, ['endDate']: endDate }
            })
        } catch (error) {
            if (error.response.status == 404)
                throw new Error('Not found')
            if (error.response.status == 403)
                alert("Forbbiden")
        }

    }

    async function create_campaign(org_id, campaign_name, start, end) {
        try {
           return await create_org_campaign(org_id, campaign_name, start, end)
        } catch (error) {
            if (!error.response) {
                showErrorMessage(t("ERRORS.CONEXION_ERROR.ERROR_MODAL_TITLE"), t("ERRORS.CONEXION_ERROR.ERROR_MODAL_BODY"))
            } else if (error.response.status == 404) {
                throw { not_found: true }
            } else if (error.response.status == 400) {
                const message = error.response.data
                if (message.includes('Duplicated'))
                     throw { duplicated: true }
            } 
        }
    }

    async function add_campaign_counsellors(org_id, campaing_id, counsellors) {
        try {
            await Promise.all(counsellors.forEach(async counsellor => {
                await add_org_campaign_counsellor(org_id, campaing_id, counsellor)
            }))
        } catch (error) {
            console.log(error)
            if (!error.response) {
                showErrorMessage(t("ERRORS.CONEXION_ERROR.ERROR_MODAL_TITLE"), t("ERRORS.CONEXION_ERROR.ERROR_MODAL_BODY"))
            } else if (error.response.status == 404) {
                throw { not_found: true }
            } else if (error.response.status == 400) {
                const message = error.response.data
                if (message.includes('Duplicated'))
                     throw { duplicated: true }
            } 
        }
    }

    async function delete_campaign(org_id, campaign_name) {
        try {
            await delete_org_campaign(org_id, campaign_name)
        } catch (error) {
            if (!error.response) {
                showErrorMessage(t("ERRORS.CONEXION_ERROR.ERROR_MODAL_TITLE"), t("ERRORS.CONEXION_ERROR.ERROR_MODAL_BODY"))
            } else if (error.response.status == 404) {
                throw new { not_found: true }
            }
        }
    }

    async function update_campaign(org_id, campaign_name, end) {
        try {
            await update_org_campaign(org_id, campaign_name, end)
        } catch (error) {
            if (!error.response) {
                showErrorMessage(t("ERRORS.CONEXION_ERROR.ERROR_MODAL_TITLE"), t("ERRORS.CONEXION_ERROR.ERROR_MODAL_BODY"))
            } else if (error.response.status == 404) {
                throw new { not_found: true }
            }
        }
    }

    function get_campaign_participants(org_id, camp_id) {
        const campaign = get_campaign(org_id, camp_id)
        return campaign.participants
    }

    function get_campaign_counsellors(org_id, camp_id) {
        const campaign = get_campaign(org_id, camp_id)
        return campaign.counsellors
    }

    function get_campaign_tables(org_id, camp_id) {
        const campaign = get_campaign(org_id, camp_id)
        return campaign.tables
    }

    function get_campaign(org_id, camp_id) {
        const campaigns = get_campaings_list(org_id)
        const campaign = campaigns.filter((camp) => {
            return camp.id == camp_id
        })
        return campaign[0]
    }

    async function claim_member(username, orgname, full_name) {
        try {
            const data = await claim_org_member(username, orgname, full_name)
            console.log(data)
        } catch (error) {
            throw new Error('Error')
        }
    }

    const operations = {
        get_org_unclaimed_users,
        get_org_by_code,
        get_by_name,
        claim_member,
        get_claimed_members,
        get_members_list,
        registry_new_member,
        delete_member,
        update_member,
        get_campaings_list,
        create_campaign,
        delete_campaign,
        update_campaign,
        get_campaign_participants,
        get_campaign_counsellors
    }

    return (
        <organisationContex.Provider value={operations}>
            {props.children}
        </organisationContex.Provider>
    )
}