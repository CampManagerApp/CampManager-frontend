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
import './CreateCampaign.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CreateCampaignParticipants from "./CreateCampaignParticipants";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import { Alert } from "react-bootstrap";
import { toBackendFormat } from "../../../../utils";


export default function CreateCampaign() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    const { get_claimed_members, create_campaign } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [name, setName] = useState('')
    const [counsellors, setCounsellorsOptions] = useState([]);


    /*--------DELETE AFTER IMPLEMENTATION--------*/
    const [selectedCounsellors, setCounsellors] = useState([])
    const [participants, setParticipantsOptions] = useState([
        { label: "Alejandro Clavera", value: "NY" },
        { label: "Rome", value: "RM" },
        { label: "London", value: "LDN" },
        { label: "Istanbul", value: "IST" },
        { label: "Paris", value: "PRS" },
        { label: "Madrid", value: "MAD" },
        { label: "Lleida", value: "LLE" },
        { label: "Barcelona", value: "BCN" }
    ]);
    /*--------DELETE AFTER IMPLEMENTATION--------*/

    const handleCampaignName = event => {
        // setMessage(event.target.value);
    }

    function navigateToParticipants() {
        navigate('/admin/createcampaign/participants');
    }

    function loadMembers() {
        // const { id } = get_current_organisation()
        const id = 2
        get_claimed_members(id).then((members) => {
            const members_options = members.map((member) => {
                return { label: member.full_name }
            })
            setCounsellorsOptions(members_options)
        })
    }

    async function createCampaing() {
        //const { id } = get_current_organisation()
        const id = 2
        const start = toBackendFormat(startDate)
        const end = toBackendFormat(endDate)
        await create_campaign(id, name, start, end)
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>{t('ADD_NEW_CAMPAIGN.TITLE')}</TitlePage>
            <Container>
                <Form.Group controlId="name">
                    <Form.Label>{t('ADD_NEW_CAMPAIGN.CAMPAIGN_NAME')}:</Form.Label>
                    {" "}
                    <Form.Control type="text" aria-describedby="passwordHelpBlock" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <br />
                <Row>
                    <Col>
                        <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.CAMPAIGN_START_DATE')}:</Form.Label></>
                        <Calendar dateFormat="dd/mm/yy" value={startDate} onChange={(e) => setStartDate(e.value)} showIcon={true} touchUI={true}></Calendar>
                    </Col>
                    <Col>
                        <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.CAMPAIGN_END_DATE')}:</Form.Label></>
                        <Calendar dateFormat="dd/mm/yy" value={endDate} onChange={(e) => setEndDate(e.value)} showIcon={true} touchUI={true}></Calendar>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        {/* <p>Counsellors:</p> */}
                        <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.COUNSELLORS')}:</Form.Label></>
                        <MultiSelect showClear={true} maxSelectedLabels={1} value={selectedCounsellors} options={counsellors} onShow={loadMembers} onChange={(e) => setCounsellors(e.value)} />
                        {/* <p>Participants:</p> */}
                        <br />
                        <br />
                        <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.PARTICIPANTS')}:</Form.Label></>
                        <Button onClick={navigateToParticipants} variant="success">{t('ADD_NEW_CAMPAIGN.PARTICIPANTS_BUTTON')}</Button>
                    </Col>
                </Row>
                <br />
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