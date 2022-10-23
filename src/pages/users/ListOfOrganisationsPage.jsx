import { useNavigate } from "react-router-dom";
import PageHeader from '../../components/common/PageHeader';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"

import './ListOfOrganisationsPage.css'


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
        <div className="list-of-organisations-page-wrapper">
            <ListOfOrganisations handleSubmit={handleSubmit}/>
        </div>
        </div>
    )
}