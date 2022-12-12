import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { organisationContex } from '../../../../context/OrganisationContex'
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import * as image from "../../../../design/images";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { UserStatusContext } from "../../../../context/UserStatusContext";
import { toBackendFormat } from "../../../../utils";
import { MessageContext } from "../../../../context/MessageContex";


export default function CreateTable() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    const { get_claimed_members, create_campaign, add_campaign_counsellors } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [name, setName] = useState('')
    const [counsellors, setCounsellorsOptions] = useState([]);
    const [selectedCounsellors, setCounsellors] = useState([])


    function navigateToParticipants() {
        navigate('/admin/createcampaign/participants');
    }

    function loadMembers() {
        const { id } = get_current_organisation()
        get_claimed_members(id).then((members) => {
            const members_options = members.map((member) => {
                return { label: member.full_name }
            })
            setCounsellorsOptions(members_options)
        })
    }

    async function createCampaing() {
        const { id } = get_current_organisation()
        const start = toBackendFormat(startDate)
        const end = toBackendFormat(endDate)
        var campaign_id = ''
        // create a campaing
        try {
            const campaign = await create_campaign(id, name, start, end)
            campaign_id = campaign.id
        } catch (error) {
            if (error.duplicated) {
                showErrorMessage(t('ADD_NEW_CAMPAIGN.ERRORS.ERROR_TITLE'), t('ADD_NEW_CAMPAIGN.ERRORS.DUPLICATED_ERROR'))
                return
            }
        }
        // check if must be add counsellors to the campaing
        if (selectedCounsellors.length == 0)
            return
        // add counsellors
        try {
            // transform the counsellor object
            const counsellors = selectedCounsellors.map((counsellor) => {
                return { full_name: counsellor.label }
            })
            const campaign = await add_campaign_counsellors(id, campaign_id, counsellors)
            navigate('/organisation/campaings', { replace: true })
        } catch (error) {
            console.log(error)
            if (error.duplicated) {
                showErrorMessage(t('ADD_NEW_CAMPAIGN.ERRORS.ERROR_TITLE'), t('ADD_NEW_CAMPAIGN.ERRORS.DUPLICATED_ERROR'))
            }
        }
    }

    return (
    <React.Fragment>        
        <BannerImage bannerImage={image.backgroundOrg} />
        <TitlePage>{t('ADD_NEW_TABLE.TITLE')}</TitlePage>
        <Container>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('ADD_NEW_TABLE.TABLE_NAME')}</Form.Label>
                <Form.Control type="text" />
                <Form.Label>{t('ADD_NEW_TABLE.X_VALUE')}</Form.Label>
                <Form.Control type="text" />
                <Form.Label>{t('ADD_NEW_TABLE.Y_VALUE')}</Form.Label>
                <Form.Control type="text" />
                <Form.Label>{t('ADD_NEW_TABLE.VALUES')}</Form.Label>
                <Form.Control type="text" />
            </Form.Group>
            <Container>
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary">{t('ADD_NEW_CAMPAIGN.CANCEL_BUTTON')}</Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" onClick={createCampaing}>{t('ADD_NEW_CAMPAIGN.CREATE_BUTTON')}</Button>
                    </Col>
                </Row>
            </Container>
      </Container>
        </React.Fragment>
    )
}