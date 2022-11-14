import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import PageHeader from '../../components/common/PageHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <div>
            {/* <PageHeader title="Organisation panel" /> */}
            <h1 className="d-flex justify-content-center display-1" style={{textAlign:"center", marginBottom:"5%"}}> Select <br/> organisation</h1>
            <Container style={{height:"80%"}}>
                <Row><ListOfOrganisations handle={handle} /></Row>
            </Container>
        </div>
    )
}