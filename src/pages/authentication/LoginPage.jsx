import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/authentication/LoginForm"

import './LoginPage.css'


const handle = (event) => {
    event.preventDefault();
    event.stopPropagation();
}
  

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