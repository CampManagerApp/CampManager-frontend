import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"
import './ListOfOrganisationsPage.css'
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { UserStatusContext } from "../../context/UserStatusContext";



export default function OrganisationInfoPage() {
    const { t, i18n } = useTranslation('common');
    const { set_current_organisation } = useContext(UserStatusContext)
    const navigate = useNavigate()

    const handle = (choosed_organisation) => {
        set_current_organisation(choosed_organisation)
        navigate('/organisation')
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center display-1" style={{ textAlign: "center", marginBottom: "5%" }}> {t('SELECT_ORGANISATION.TITLE')}</h1>
            <Container style={{ height: "80%" }}>
                <Row><ListOfOrganisations handle={handle} /></Row>
            </Container>
        </div>
    )
}