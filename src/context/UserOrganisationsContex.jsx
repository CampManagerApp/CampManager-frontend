import { useState } from "react";
import { createContext } from "react";

export const UserOrganisationsContex = createContext()

export default function UserOrganisationsProvider(props) {
    const [orgUserList, setOrgUserList] = useState([
        {
            name:'organisation 1'
        },
        {
            name:'organisation 2'
        },
        {
            name:'organisation 3'
        },
        {
            name:'organisation 4'
        },
    ])

    
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