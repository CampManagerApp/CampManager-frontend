import {createContext, useEffect, useState} from 'react';

export const UserStatusContext = createContext()

export const USER_STATUS = Object.freeze({
    UNAUTHENTICATED: 'is-unauth',
    SUPERADMIN: 'is-superadmin',
    USER: 'is_user'
  })

export default function UserStatusProvider (props) {
    const [status, setStatus] = useState(USER_STATUS.UNAUTHENTICATED)

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

    return (
        <UserStatusContext.Provider value={{update_state, is_unAuthenticated, is_superAdmin, is_user}}>
            {props.children}
        </UserStatusContext.Provider>
    )
}