import { createContext } from "react";
import { Organisations } from "../data/organisations";

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

    function get_organisation(org_id) {
        console.log(org_id)
        const organisation = Organisations.filter((org) => {
            return org.id == org_id
        })
        return organisation[0]
    }


    function get_org_unclaimed_users(org_id) {
        //return unclaimed_users
        return get_organisation(org_id).members
    }

    
    function get_org_by_code(code) {
        //return {'id':0, name:'Colònies Aina'}
        const organisation = Organisations.filter((org) => {return org.code == code})
        return organisation[0]
    }


    function get_campaings_list(org_id) {
        return get_organisation(org_id).campaings
    }

    
    return (
        <organisationContex.Provider value={{ get_org_unclaimed_users, get_org_by_code, get_campaings_list}}>
            {props.children}
        </organisationContex.Provider>
    )
}