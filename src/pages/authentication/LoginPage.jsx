import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/authentication/LoginForm"
import { loginRequest } from "../../services/Authentication";
import { useAsyncError } from '../../components/errors/Errors';
import { useState } from "react";

import './LoginPage.css'

export default function LoginPage ({goto}) {
    const navigate = useNavigate();
    const asyncError = useAsyncError()
    

    function handleSubmit(form) {
        loginRequest(form).then(() => {
            //navigate('/admin/panel')
            goto()
        }).catch(err => {
            asyncError(new Error(err))
        })
    }

    return (
        <div className="login-page-wrapper">
            <LoginForm handleSubmit={handleSubmit}/>
        </div>
    )
}