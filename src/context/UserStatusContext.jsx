import {createContext, useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';

export const UserStatusContext = createContext()

export const USER_STATUS = Object.freeze({
    UNAUTHENTICATED: 'is-unauth',
    SUPERADMIN: 'is-superadmin',
    USER: 'is_user'
})

export default function UserStatusProvider(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const {i18n } = useTranslation('common')
    const [status, setStatus] = useState(USER_STATUS.UNAUTHENTICATED)
    const [currentCamp, setCurrentCamp] = useState({in_camp:false})
    const [currentOrganisation, setCurrentOrganisation] = useState({ in_org: false })
    const [userInfo, setUserInfo] = useState({ username: '' })
    const [languageStatus, setLanguageStatus] = useState('en')
    const [currentParticipant, setCurrentParticipant] = useState({in_part:false})
    const [currentCounsellor, setCurrentCounsellor] = useState({in_part:false})
    const [currentTable, setCurrentTable] = useState({})
    const [currentParticipantsAdd, setParticipantsAdd] = useState([])


    useEffect (() => {
        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")
        if (location.pathname.includes('/login') && token) {
            navigate('/listoforganisations', {replace: true})
            set_username(username)
            setStatus(USER_STATUS.USER)
        } else if (!location.pathname.includes('/login') && !token) {
            navigate('/listoforganisations', {replace: true})
            setStatus(USER_STATUS.UNAUTHENTICATED)
            navigate('/login', {replace: true})
        }
    }, [location])

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
        localStorage.setItem("username", username)
    }

    const set_current_organisation = (org) => {
        setCurrentOrganisation(org)
    }

    const set_language = (lang) => {
        setLanguageStatus(lang)
        i18n.changeLanguage(lang) 
    } 

    const get_current_camp = () => {
        return currentCamp
    }

    const set_current_camp = (camp) => {
        setCurrentCamp(camp) 
    } 

    const get_current_participant = () => {
        return currentParticipant
    }

    const set_current_participant = (participant) => {
        setCurrentParticipant(participant) 
    } 

    const get_current_counsellor = () => {
        return currentCounsellor
    }

    const set_current_counsellor = (counsellor) => {
        setCurrentCounsellor(counsellor) 
    } 

    const get_current_participantsAdd = () => {
        return currentParticipantsAdd
    }

    const set_current_participantsAdd = (participantsAdd) => {
        setParticipantsAdd(participantsAdd) 
    } 

    const set_current_table = (table) => {
        setCurrentTable(table)
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
        get_current_camp,
        set_current_camp,
        currentCamp,
        userInfo,
        set_language,
        get_current_participant,
        set_current_participant,
        currentParticipant,
        get_current_counsellor,
        set_current_counsellor,
        currentCounsellor,
        get_current_participantsAdd,
        set_current_participantsAdd,
        currentParticipantsAdd,
        currentTable, 
        set_current_table    
    }

    return (
        <UserStatusContext.Provider value={operations}>
            {props.children}
        </UserStatusContext.Provider>
    )
}