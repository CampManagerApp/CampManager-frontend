import {createContext, useEffect, useState} from 'react';

export const UserStatusContext = createContext()

export const USER_STATUS = Object.freeze({
    UNAUTHENTICATED: 'is-unauth',
    SUPERADMIN: 'is-superadmin',
    USER: 'is_user'
  })

export default function UserStatusProvider (props) {
    const [status, setStatus] = useState(USER_STATUS.UNAUTHENTICATED)
    const [currentOrganisation, setCurrentOrganisation] = useState({in_org:false})
    const [currentCamp, setCurrentCamp] = useState({in_camp:false})

    const update_state = (status) => {
        setStatus(status)
    }

    const  is_unAuthenticated = () => {
        return status == USER_STATUS.UNAUTHENTICATED
    } 

    const  is_superAdmin = () => {
        return status == USER_STATUS.SUPERADMIN
    } 

    const  is_user = () => {
        return status == USER_STATUS.USER
    }

    const get_current_organisation = () => {
        return currentOrganisation
    }

    const set_current_organisation = (org) => {
        setCurrentOrganisation(org) 
    } 

    const get_current_camp = () => {
        return currentCamp
    }

    const set_current_camp = (camp) => {
        setCurrentCamp(camp) 
    } 

    const operations = {
        update_state, 
        is_unAuthenticated, 
        is_superAdmin, 
        is_user, 
        get_current_organisation, 
        set_current_organisation, 
        currentOrganisation,
        get_current_camp,
        set_current_camp,
        currentCamp,
    }

    return (
        <UserStatusContext.Provider value={operations}>
            {props.children}
        </UserStatusContext.Provider>
    )
}