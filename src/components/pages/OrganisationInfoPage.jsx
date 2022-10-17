import { useNavigate } from "react-router-dom";
import OrganisationInfo from "../organisation/OrganisationInfo"

import './OrganisationInfoPage.css'


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
            <OrganisationInfo handleSubmit={handleSubmit}/>
        </div>
    )
}