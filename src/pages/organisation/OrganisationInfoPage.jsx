import { useNavigate } from "react-router-dom";
import OrganisationInfo from "../../components/organisation/OrganisationInfo"
import PageHeader from '../../components/common/PageHeader';

import './OrganisationInfoPage.css'


const handle = (event) => {
    event.preventDefault();
    event.stopPropagation();
}
  

export default function OrganisationInfoPage () {
    const navigate = useNavigate();

    function handleSubmit(event) {
       navigate('/admin/panel')
    }

    return (
        <div>
            <PageHeader title="Organisation panel" />
            <div className="organisationInfo-page-wrapper">
                <OrganisationInfo handleSubmit={handleSubmit}/>
                </div>
        </div>
    )
}