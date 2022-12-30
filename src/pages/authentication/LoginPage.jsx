import { loginRequest } from "../../services/Authentication";
import { useState, useContext } from "react";
import { USER_STATUS, UserStatusContext } from "../../context/UserStatusContext";

import './LoginPage.css'
import LoginForm from "../../components/authentication/LoginForm"
import Spinner from "../../components/common/spinner/Spinner";

export default function LoginPage({ goto, next_user_status = USER_STATUS.USER }) {
    const { update_state, set_username } = useContext(UserStatusContext)

    const [showError, setShowError] = useState({ invalid_credentials: false })
    const [showSpinner, setShowSpinner] = useState(false)

    function handleSubmit(form) {
        setShowSpinner(true)
        loginRequest(form).then(() => {
            update_state(next_user_status)
            set_username(form.username)
            goto()
        }).catch(err => {
            setShowSpinner(false)
            setShowError({ invalid_credentials: true })
        })
    }

    return (
        <div className="login-page-wrapper">
            {showSpinner
                ? <Spinner />
                : <LoginForm showInvalidMessage={showError.invalid_credentials} handleSubmit={handleSubmit} />
            }
        </div>
    )
}