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

    function get_org_by_code(code) {
        return {'id':0, name:'Colònies Aina'}
    }


    function get_campaings_list(org_id) {
        return [{id:0, name:'2021-2022'}, {id:1, name:'2022-2023'}]
    }

    
    return (
        <organisationContex.Provider value={{ get_org_unclaimed_users, get_org_by_code, get_campaings_list}}>
            {props.children}
        </organisationContex.Provider>
    )
}