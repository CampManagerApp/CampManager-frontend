import { useEffect, useState } from "react";
import { createContext } from "react";
import { Organisations } from "../data/organisations";
import { get_usr_organisations } from "../services/users/Users";

export const UserOrganisationsContex = createContext()

export default function UserOrganisationsProvider(props) {
    const [orgUserList, setOrgUserList] = useState([])
    
    const orgList = orgUserList.map((org) => {
        return org
    })

    async function get_organisations(username) {
        try {
            const organisations_list = await get_usr_organisations(username)
            const organisations = organisations_list.map((organisation) => {
                return {...organisation, ['name']: organisation.organisationName}
            } )
            return organisations
        } catch (error) {
            console.log(error)
        }
    }

    function addOrg(org) {
        setOrgUserList([...orgUserList, org])
    }

    return (
        <UserOrganisationsContex.Provider value={{orgList, addOrg, get_organisations}}>
            {props.children}
        </UserOrganisationsContex.Provider>
    )
}