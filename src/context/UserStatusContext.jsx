import {createContext, useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";

export const UserStatusContext = createContext()

export const USER_STATUS = Object.freeze({
    UNAUTHENTICATED: 'is-unauth',
    SUPERADMIN: 'is-superadmin',
    USER: 'is_user'
})

export default function UserStatusProvider(props) {
    const {i18n } = useTranslation('common')
    const [status, setStatus] = useState(USER_STATUS.UNAUTHENTICATED)
    const [currentOrganisation, setCurrentOrganisation] = useState({ in_org: false })
    const [userInfo, setUserInfo] = useState({ username: '' })
    const [languageStatus, setLanguageStatus] = useState('en')


    const update_state = (status) => {
        setStatus(status)
    }

    const is_unAuthenticated = () => {
        return status == USER_STATUS.UNAUTHENTICATED
    }

    const is_superAdmin = () => {
        return status == USER_STATUS.SUPERADMIN
    }

    const is_user = () => {
        return status == USER_STATUS.USER
    }

    const get_current_organisation = () => {
        return currentOrganisation
    }

    const set_username = (username) => {
        setUserInfo({...userInfo, ['username']:username})
    }

    const set_current_organisation = (org) => {
        setCurrentOrganisation(org)
    }

    const set_language = (lang) => {
        setLanguageStatus(lang)
        i18n.changeLanguage(lang) 
    } 

    const operations = {
        update_state,
        is_unAuthenticated,
        is_superAdmin,
        is_user,
        get_current_organisation,
        set_current_organisation,
        set_username,
        currentOrganisation,
        userInfo,
        set_language
    }

    return (
        <UserStatusContext.Provider value={operations}>
            {props.children}
        </UserStatusContext.Provider>
    )
}