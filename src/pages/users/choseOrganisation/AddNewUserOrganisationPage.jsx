import './AddNewUserOrganisationPage.css'

import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ConfirmationClaim from './ConfirmationClaim';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { organisationContex } from '../../../context/OrganisationContex';
import { UserOrganisationsContex } from '../../../context/UserOrganisationsContex';


export default function AddNewUserOrganisation() {
    const navigate = useNavigate();
    const [confirmationModalState, setConfirmationModalState] = useState({user:'', show:false})
    const [usersToClaim, setUsersToClaim] = new useState([])
    const { get_org_unclaimed_users } = useContext(organisationContex)
    const { addOrg } = useContext(UserOrganisationsContex)

    function claimUser() {
        setConfirmationModalState({user:'', show:false})
        addOrg({name:'Colònies Aina'})
        navigate('/listoforganisations/');
    }

    function cancelClaimUser() {
        setConfirmationModalState({user:'', show:false})
    }

    function load_users_to_claim() {
        const users = get_org_unclaimed_users()
        setUsersToClaim(users)
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
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="mt-3" onClick={load_users_to_claim}>Search</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                <h5>Colònies Aina</h5>
                <hr style={{ height: "12px" }} />
                <ListGroup bsPrefix="user-list">
                    {
                        usersToClaim.map((user, key) => {
                            return <ListGroup.Item key={key} onClick={() => { setConfirmationModalState({user:user.name, show:true}) }}>{user.name}</ListGroup.Item>
                        })  
                    }
                </ListGroup>
            </Container>
            <ConfirmationClaim show={confirmationModalState.show} 
                user={confirmationModalState.user}
                onConfirmation={claimUser}
                onCancel={cancelClaimUser} />
        </>
    )
}