import './AddNewUserOrganisationPage.css'

import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ConfirmationClaim from './ConfirmationClaim';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AddNewUserOrganisation() {
    const navigate = useNavigate();
    const [confirmationModalShow, setConfirmationModalShow] = useState(false)

    function claimUser() {
        setConfirmationModalShow(false)
        navigate('/listoforganisations/');
    }

    function cancelClaimUser() {
        setConfirmationModalShow(false)
    }

    return (
        <>
            <h1 className="d-flex justify-content-center display-4" style={{ textAlign: "center", marginBottom: "5%" }}> Add organisation</h1>
            <Container className='mb-5 mt-5'>
                <Row>
                    <Col>
                        <Form.Label htmlFor="basic-url">Organisation Code</Form.Label>
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-md-center">
                    <Col>
                        <Button className="mt-3">Search</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                <h5>Colònies Aina</h5>
                <hr style={{height:"12px"}}/>
                <ListGroup bsPrefix="user-list">
                    <ListGroup.Item onClick={()=>{setConfirmationModalShow(true)}}>Alejandro Clavera</ListGroup.Item>
                    <ListGroup.Item onClick={()=>{setConfirmationModalShow(true)}}>Fadil Aba</ListGroup.Item>
                    <ListGroup.Item onClick={()=>{setConfirmationModalShow(true)}}>Carlos Isaac</ListGroup.Item>
                    <ListGroup.Item onClick={()=>{setConfirmationModalShow(true)}}>Jordi Lazo</ListGroup.Item>
                    <ListGroup.Item onClick={()=>{setConfirmationModalShow(true)}}>Joel Aumedes</ListGroup.Item>
                </ListGroup>
            </Container>
            <ConfirmationClaim show={confirmationModalShow}
                onConfirmation={claimUser}
                onCancel={cancelClaimUser} />
        </>
    )
}