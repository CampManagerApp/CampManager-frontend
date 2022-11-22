import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/authentication/LoginForm"
import { loginRequest } from "../../services/Authentication";
import { useAsyncError } from '../../components/errors/Errors';
import { useState, useContext } from "react";
import { USER_STATUS, UserStatusContext } from "../../context/UserStatusContext";


import './LoginPage.css'


export default function LoginPage ({goto, next_user_status=USER_STATUS.USER}) {
    const navigate = useNavigate();
    const asyncError = useAsyncError()
    const {update_state} = useContext(UserStatusContext)
    

    function handleSubmit(form) {
        // loginRequest(form).then(() => {
        //     //navigate('/admin/panel')
        //     update_state(next_user_status)
        //     goto()
        // }).catch(err => {
        //     asyncError(new Error(err))
        // })
        update_state(next_user_status)
        goto()
    }

    return (
        <div className="login-page-wrapper">
            <LoginForm handleSubmit={handleSubmit}/>
        </div>
    )
}