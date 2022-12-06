import { createContext } from "react";
import { Organisations } from "../data/organisations";
import { claim_org_member, get_organisation_by_code, get_org_members, get_org_unclaimned_members } from "../services/organisation/Organisation"

export const organisationContex = createContext()

export default function OrganisationProvider(props) {

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
            if (error.response.status == 404)
                throw new Error('Not found')
        }
    }


    async function get_members_list(org_id) {
        try {
            const members = await get_org_members(org_id)
            const members_info = members.map((member) => {
                // apply filter to get member org info
                if (member.organisations == null) {
                    return {...member, ['organisation_status']: undefined}
                }
                const org_info = member.organisations[0]
                return {...member, ['organisation_status']: org_info}
            })
            return members_info 
        } catch (error) {
            console.log(error)
            if (error.response.status == 404)
                throw new Error('Not found')
        }
    }


    function get_campaings_list(org_id) {
        return get_organisation(org_id).campaigns
    }

    function get_campaign_participants(org_id, camp_id){
        const campaign = get_campaign(org_id, camp_id)
        return campaign.participants
    }

    function get_campaign_counsellors(org_id, camp_id){
        const campaign = get_campaign(org_id, camp_id)
        return campaign.counsellors
    }

    function get_campaign_tables(org_id, camp_id){
        const campaign = get_campaign(org_id, camp_id)
        return campaign.tables
    }

    function get_campaign(org_id, camp_id){
        const campaigns = get_campaings_list(org_id)
        const campaign = campaigns.filter((camp) =>{
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
        get_campaings_list, 
        claim_member,
        get_members_list,
        get_campaign_participants, 
        get_campaign_counsellors
    }

    return (
        <organisationContex.Provider value={operations}>
            {props.children}
        </organisationContex.Provider>
    )
}