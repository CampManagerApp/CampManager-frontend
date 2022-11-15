import { createContext } from "react";

export const organisationContex = createContext()

const unclaimed_users = [
    { name: 'Alejandro Clavera' },
    { name: 'Fadil Aba' },
    { name: 'Carlos Isaac' },
    { name: 'Jordi Lazo' },
    { name: 'Joel Aumedes' },
    { name: 'Random' },
]


export default function OrganisationProvider(props) {
    function get_org_unclaimed_users(org_id) {
        return unclaimed_users
    }

    
    return (
        <organisationContex.Provider value={{ get_org_unclaimed_users }}>
            {props.children}
        </organisationContex.Provider>
    )
}