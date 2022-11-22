import { useState } from "react";
import { createContext } from "react";
import { Organisations } from "../data/organisations";

export const UserOrganisationsContex = createContext()

export default function UserOrganisationsProvider(props) {
    const [orgUserList, setOrgUserList] = useState([Organisations[2], Organisations[3]])
    
    const orgList = orgUserList.map((org) => {
        return org
    })
    
    function addOrg(org) {
        setOrgUserList([...orgUserList, org])
    }

    return (
        <UserOrganisationsContex.Provider value={{orgList, addOrg}}>
            {props.children}
        </UserOrganisationsContex.Provider>
    )
}