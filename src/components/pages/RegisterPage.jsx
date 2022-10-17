import { useNavigate } from "react-router-dom";
import RegisterForm from "../autentication/RegisterForm"

import './RegisterPage.css'


export default function RegisterPage () {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
       navigate('/admin')
    }
    
    return (
        <div className="register-page-wrapper">
            <RegisterForm handleSubmit={handleSubmit} />
        </div>
    )
}