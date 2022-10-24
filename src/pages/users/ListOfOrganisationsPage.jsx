import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"

import './ListOfOrganisationsPage.css'


const handle = (event) => {
    event.preventDefault();
    event.stopPropagation();
}
  

export default function OrganisationInfoPage () {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader title="Organisation panel" />
            <div className="container">
                <ListOfOrganisations />
                </div>
        </div>
    )
}