import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import PageHeader from '../../components/common/PageHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListOfOrganisations from "../../components/lists/ListOfOrganisations"
import './ListOfOrganisationsPage.css'
import UserOrganisationsProvider from "../../context/UserOrganisationsContex";
import { useContext, useEffect } from "react";
import { UserStatusContext } from "../../context/UserStatusContext";



export default function OrganisationInfoPage() {
    const { set_current_organisation } = useContext(UserStatusContext)
    const navigate = useNavigate()

    const handle = (choosed_organisation) => {
        set_current_organisation(choosed_organisation)
        navigate('/organisation')
    }

    return (
        <div>
            {/* <PageHeader title="Organisation panel" /> */}
            <h1 className="d-flex justify-content-center display-1" style={{ textAlign: "center", marginBottom: "5%" }}> Select <br /> organisation</h1>
            <Container style={{ height: "80%" }}>
                <Row><ListOfOrganisations handle={handle} /></Row>
            </Container>
        </div>
    )
}