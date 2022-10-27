import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"

import './ListOfOrganisationsPage.css'

export default function OrganisationInfoPage () {
    const navigate = useNavigate();
    const handle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate('/admin/organisationusers/', { replace: true })
    }
      
    return (
        <div>
            <PageHeader title="Organisation panel" />
            <div className="list-of-organisations-page-wrapper">
                <ListOfOrganisations handle={handle} />
                </div>
        </div>
    )
}