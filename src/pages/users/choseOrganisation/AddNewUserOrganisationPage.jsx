import './AddNewUserOrganisationPage.css'

import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ConfirmationClaim from './ConfirmationClaim';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { organisationContex } from '../../../context/OrganisationContex';
import { UserOrganisationsContex } from '../../../context/UserOrganisationsContex';
import ItemList from '../../../components/lists/ItemList';
import TitlePage from '../../../components/common/TitlePage';

function UserItem({ item: user }) {
    return <div className='d-flex justify-content-center'>{user}</div>
}

export default function AddNewUserOrganisation() {
    const navigate = useNavigate();
    const [confirmationModalState, setConfirmationModalState] = useState({ user: '', show: false })
    const [code, setCode] = useState('')
    const [usersToClaim, setUsersToClaim] = new useState([])
    const [organisation, setOrganisation] = new useState({ name: '' })
    const { get_org_unclaimed_users, get_org_by_code } = useContext(organisationContex)
    const { addOrg } = useContext(UserOrganisationsContex)

    function claimUser() {
        setConfirmationModalState({ user: '', show: false })
        addOrg({ name: 'Colònies Aina' })
        navigate('/listoforganisations/', { replace: true });
    }

    function cancelClaimUser() {
        setConfirmationModalState({ user: '', show: false })
    }

    function load_users_to_claim() {
        console.log(code)
        const org = get_org_by_code(code)
        const users = get_org_unclaimed_users(org.id).map((item) => { return item.name })
        setOrganisation(org)
        setUsersToClaim(users)
    }

    function showClaimModal(user) {
        setConfirmationModalState({ user: user, show: true })
    }

    return (
        <div className='scrollable-content'>
            <TitlePage>Add organisation</TitlePage>
            <Container className='mb-5 mt-5'>
                <Row>
                    <Col>
                        <Form.Group controlId="code">
                            <Form.Label >Organisation Code</Form.Label>
                            <Form.Control placeholder="Organisation code" type="text" onChange={(e) => { setCode(e.target.value) }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="mt-3" onClick={load_users_to_claim}>Search</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                {/* <h5>Colònies Aina</h5> */}
                <h5>{organisation.name}</h5>
                <hr style={{ height: "12px" }} />
                <ItemList items={usersToClaim} template={UserItem} onClickItem={showClaimModal} />
            </Container>
            <ConfirmationClaim show={confirmationModalState.show}
                user={confirmationModalState.user}
                onConfirmation={claimUser}
                onCancel={cancelClaimUser} />
        </div>
    )
}