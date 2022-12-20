import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/Authentication";
import { useAsyncError } from '../../components/errors/Errors';
import { useState, useContext } from "react";
import { USER_STATUS, UserStatusContext } from "../../context/UserStatusContext";

import LoginForm from "../../components/authentication/LoginForm"
import './LoginPage.css'

export default function LoginPage({ goto, next_user_status = USER_STATUS.USER }) {
    const navigate = useNavigate();
    const asyncError = useAsyncError()
    const [ showError, setShowError ] = useState({ invalid_credentials: false })
    const { update_state, set_username } = useContext(UserStatusContext)

    function handleSubmit(form) {
        loginRequest(form).then(() => {
            update_state(next_user_status)
            set_username(form.username)
            goto()
        }).catch(err => {
            //asyncError(new Error(err))
            setShowError({ invalid_credentials: true })
        })
    }

    return (
        <div className="login-page-wrapper">
            <LoginForm showInvalidMessage={showError.invalid_credentials} handleSubmit={handleSubmit} />
        </div>
    )
}