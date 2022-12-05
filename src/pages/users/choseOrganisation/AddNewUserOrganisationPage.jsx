import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useContext } from 'react';
import { organisationContex } from '../../../context/OrganisationContex';
import { UserOrganisationsContex } from '../../../context/UserOrganisationsContex';

import Form from 'react-bootstrap/Form';
import ConfirmationClaim from './ConfirmationClaim';
import ItemList from '../../../components/lists/ItemList';
import TitlePage from '../../../components/common/TitlePage';


import './AddNewUserOrganisationPage.css'
import { UserStatusContext } from '../../../context/UserStatusContext';

function UserItem({ item: user }) {
    return <div className='d-flex justify-content-center'>{user}</div>
}

export default function AddNewUserOrganisation() {
    const { t, i18n } = useTranslation('common');
    const navigate = useNavigate();

    // states definitons
    const [confirmationModalState, setConfirmationModalState] = useState({ user: '', show: false })
    const [showError, setShowError] = useState({ notFound: false })
    const [code, setCode] = useState('')
    const [usersToClaim, setUsersToClaim] = new useState([])
    const [organisation, setOrganisation] = new useState({ name: '' })

    // context operations extraction
    const { get_org_unclaimed_users, get_org_by_code, claim_member } = useContext(organisationContex)
    const { addOrg } = useContext(UserOrganisationsContex)
    const { userInfo } = useContext(UserStatusContext)


    function claimUser() {
        const username = userInfo.username
        const orgname = organisation.name
        const full_name = confirmationModalState.user
        claim_member(username, orgname, full_name).then(() => {
            addOrg(organisation)
            navigate('/listoforganisations/', { replace: true });
        }).catch((error) => {
            console.log('error to claim')
            setConfirmationModalState({ user: '', show: false })
        })
    }

    function cancelClaimUser() {
        setConfirmationModalState({ user: '', show: false })
    }

    function load_users_to_claim() {
        setOrganisation({name:''})
        setUsersToClaim([])
        const org = get_org_by_code(code).then((org) => {
            // load the list of unclaimed users
            get_org_unclaimed_users(org.id).then((users) => {
                //setUsersToClaim(users)
                setOrganisation(org)
                console.log(users)
                const members = users.map((member) => {return member.full_name})
                setUsersToClaim(members)
            }).catch((error) => {
                console.log('ni caso')
            })
        }).catch((error) => {
            setShowError({ ...showError, ['notFound']: true })
        })
    }

    function showClaimModal(user) {
        setConfirmationModalState({ user: user, show: true })
    }

    return (
        <div className='scrollable-content'>
            <TitlePage>{t("ADD_NEW_USR_ORG.ADD_ORG")}</TitlePage>
            <Container className='mb-5 mt-5'>
                <Row>
                    <Col>
                        <Form.Group controlId="code">
                            <Form.Label >{t("ADD_NEW_USR_ORG.ORG_CODE_LABEL")}</Form.Label>
                            <Form.Control placeholder={t("ADD_NEW_USR_ORG.ORG_CODE_PLACEHOLDER")} type="text" onChange={(e) => { setCode(e.target.value) }} />
                        </Form.Group>
                        {showError.notFound ? <p className='text-danger'>{t("ADD_NEW_USR_ORG.ORG_NOT_FOUND")}</p> : ''}
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="mt-3" onClick={load_users_to_claim}>{t("ADD_NEW_USR_ORG.SEARCH")}</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                <h5>{organisation.name}</h5>
                <hr style={{ height: "12px" }} />
                {usersToClaim.length == 0 ? <p>{t("ADD_NEW_USR_ORG.ANY_MEMBER_TO_CLAIM")}</p> : '' }
                <ItemList items={usersToClaim} template={UserItem} onClickItem={showClaimModal} />
            </Container>
            <ConfirmationClaim show={confirmationModalState.show}
                user={confirmationModalState.user}
                onConfirmation={claimUser}
                onCancel={cancelClaimUser} />
        </div>
    )
}