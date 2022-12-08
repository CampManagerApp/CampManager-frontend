import { useEffect, useState } from "react";
import { createContext } from "react";
import { Organisations } from "../data/organisations";
import { get_usr_organisations } from "../services/users/Users";

export const UserOrganisationsContex = createContext()

export default function UserOrganisationsProvider(props) {
    const [orgUserList, setOrgUserList] = useState([])

    useEffect(() => {
        loadUserOrganisation()
    }, [])
    
    const orgList = orgUserList.map((org) => {
        return org
    })

    async function loadUserOrganisation() {
        try {
            const organisations = await get_usr_organisations('admin')
            setOrgUserList(organisations)
        } catch (error) {
            
        }
    }

    
    function addOrg(org) {
        setOrgUserList([...orgUserList, org])
    }

    return (
        <UserOrganisationsContex.Provider value={{orgList, addOrg}}>
            {props.children}
        </UserOrganisationsContex.Provider>
    )
}