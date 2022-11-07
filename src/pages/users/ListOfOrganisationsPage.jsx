import { useNavigate } from "react-router-dom";
import PageHeader from '../../components/common/PageHeader';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"

import './ListOfOrganisationsPage.css'
import UserOrganisationsProvider from "../../context/UserOrganisationsContex";


export default function OrganisationInfoPage() {
    const navigate = useNavigate();
    const handle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate('/admin/organisationusers/', { replace: true })
    }

  
    return (
        <UserOrganisationsProvider>
            <PageHeader title="Organisation panel" />
            <div className="list-of-organisations-page-wrapper">
                <ListOfOrganisations handle={handle} />
            </div>
        </UserOrganisationsProvider>
    )
}