import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"
import './ListOfOrganisationsPage.css'
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { UserStatusContext } from "../../context/UserStatusContext";
import { organisationContex } from "../../context/OrganisationContex";



export default function OrganisationInfoPage() {
    const { t, i18n } = useTranslation('common');
    const { set_current_organisation } = useContext(UserStatusContext)
    const { get_by_name } = useContext(organisationContex)
    const navigate = useNavigate()

    const handle = (choosed_organisation) => {
        get_by_name(choosed_organisation.name).then((org) => {
            set_current_organisation(org)
            navigate('/organisation')
        })
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center display-1" style={{ textAlign: "center", marginBottom: "5%" }}> {t('SELECT_ORGANISATION.TITLE')}</h1>
            <Container className="scrollable-content" style={{ height: "60vh" }}> 
                <ListOfOrganisations handle={handle} />
            </Container>
        </div>
    )
}