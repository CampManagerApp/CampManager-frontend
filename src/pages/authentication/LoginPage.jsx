import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/authentication/LoginForm"

import './LoginPage.css'


  

export default function LoginPage () {
    const navigate = useNavigate();

    function handleSubmit(event) {
       navigate('/admin/panel')
    }

    return (
        <div className="login-page-wrapper">
            <LoginForm handleSubmit={handleSubmit}/>
        </div>
    )
}