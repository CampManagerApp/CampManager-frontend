import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { organisationContex } from '../../../../context/OrganisationContex'
import { UserStatusContext } from "../../../../context/UserStatusContext";
import { toBackendFormat } from "../../../../utils";
import { MessageContext } from "../../../../context/MessageContex";
import { TemporalDataContext } from "../../../../context/TemporalDataContext";

import * as image from "../../../../design/images";
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from "../../../../components/common/spinner/Spinner";
import './CreateCampaign.css'
import { add_org_campaign_counsellor, delete_org_campaign_counsellor } from "../../../../services/organisation/Organisation";

export default function EditCampaign() {
    const navigate = useNavigate()
    const { t } = useTranslation('common');
    const { get_claimed_members, add_campaign_counsellors, delete_campaign_counsellors, get_campaign_participants, add_campaign_participants, delete_campaign_participants } = useContext(organisationContex)
    const { get_campaign_counsellors, update_campaign} = useContext(organisationContex)
    const { currentCamp, get_current_organisation } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)
    const { campaign_data, set_campaign_data, reset_campaign_data } = useContext(TemporalDataContext)

    const [getCounsellors] = new useState()
    const [members, setMembers] = useState([])
    const [creating, setCreating] = useState(false)

    function setName(name) {
        set_campaign_data({ ...campaign_data, ['name']: name })
    }

    function setStartDate(date) {
        set_campaign_data({ ...campaign_data, ['start']: date })
    }

    function setEndDate(date) {
        set_campaign_data({ ...campaign_data, ['end']: date })
    }


    function setCounsellors(counsellors) {
        set_campaign_data({ ...campaign_data, ['counsellors']: counsellors })
    }

    function setParticipants(counsellors) {
        set_campaign_data({ ...campaign_data, ['participants']: counsellors })
    }

    function navigateToParticipants() {
        navigate('/admin/editcampaign/participants/list/add');
    }
    function cancelButton() {
        reset_campaign_data()
        console.log(campaign_data)
        navigate(-1)
    }

    function loadMembers() {
        const { id } = get_current_organisation()
        get_claimed_members(id).then((members) => {
            const members_options = members.map((member) => {
                return { fullName: member.full_name }
            })
            setMembers(members_options)
        })
    }

    useEffect(() => {
        loadMembers()
        loadCampaignData()
    }, [])


    async function loadCampaignData() {
        const { campaignName, startDate, endDate } = currentCamp
        const [startDay, startMonth, startYear] = startDate.split('/');
        const startDateCalendar = `${startYear}-${startMonth}-${startDay}`;
        const [endDay, endMonth, endYear] = endDate.split('/');
        const endDateCalendar = `${endYear}-${endMonth}-${endDay}`;

        const counsellorsList = await get_campaign_counsellors(get_current_organisation().id, currentCamp.id)
        const counsellorsOptions = counsellorsList.map((counsellor) => {
            return { fullName: counsellor.fullName }
        })
        // load participantsList
        const participantsList = (campaign_data.updated
            ? campaign_data.participants 
            : await get_campaign_participants(get_current_organisation().id, currentCamp.id)
        )
        // store the current values in temporal data
        set_campaign_data({ 
            name: campaignName, 
            start: new Date(startDateCalendar), 
            end: new Date(endDateCalendar), 
            counsellors: counsellorsOptions,
            participants: participantsList
        })
    }

    async function updateCampaign() {
        const { id } = get_current_organisation()
        const { campaignName } = currentCamp
        const newCampaignName  = campaign_data.name
        const start = toBackendFormat(campaign_data.start)
        const end = toBackendFormat(campaign_data.end)

        try {
            await update_campaign(id, campaignName, newCampaignName, start, end)
            updateCounsellors(campaign_data.counsellors)
            updateParticipants(campaign_data.participants)
            reset_campaign_data()
            navigate('/organisation/campaings', { replace: true })
        } catch (error) {
            showErrorMessage('Traduce', 'Traduce')
        }
    }

    async function updateCounsellors(newCounsellors) {
        const { id } = get_current_organisation()
        const { id: campaignId } = currentCamp
        const currentCounsellors = await get_campaign_counsellors(id, campaignId)
        // processs newCounsellors in function of the state
        if (newCounsellors === null && currentCounsellors.length == 0) {
            return
        } else if(newCounsellors === null){
            newCounsellors = []
        }
        // get the list of counsellors to delete
        const counsellorsToDelete = currentCounsellors.filter((counsellor) => {
            return !newCounsellors.some(newCounsellor => newCounsellor.fullName == counsellor.fullName)
        })
        // get the list of counsellors to add
        const counsellorsToAdd = newCounsellors.filter((newCounsellor) => {
            return !currentCounsellors.some(currentCounellor => currentCounellor.fullName == newCounsellor.fullName)
        })    
        // update campaing counsellors list 
        await delete_campaign_counsellors(id, campaignId, counsellorsToDelete)
        await add_campaign_counsellors(id, campaignId, counsellorsToAdd)  
    }

    async function updateParticipants(newParticipants) {
        const { id } = get_current_organisation()
        const { id: campaignId } = currentCamp
        const currentParticipants = await get_campaign_participants(id, campaignId)
        console.log(newParticipants)
        // processs newCounsellors in function of the state
        if (newParticipants === null && currentParticipants.length == 0) {
            return
        } else if(newParticipants === null){
            newParticipants = []
        }
        // get the list of counsellors to delete
        const participantsToDelete = currentParticipants.filter((participant) => {
            return !newParticipants.some(newParticipant => newParticipant.fullName == participant.fullName)
        })
        // get the list of counsellors to add
        const participantsToAdd = newParticipants.filter((newParticipant) => {
            return !currentParticipants.some(currentParticipant => currentParticipant.fullName == newParticipant.fullName)
        })    

        console.log('To delete')
        console.log(participantsToDelete)
        // update campaing counsellors list 
        await delete_campaign_participants(id, campaignId, participantsToDelete)
        await add_campaign_participants(id, campaignId, participantsToAdd)  
    }

    return (
        creating ?
            <Spinner />
            : <div className="div-all scrollable-content" style={{ height: "80vh" }}>
                <BannerImage bannerImage={image.backgroundOrg} />
                <TitlePage>{t('ADD_NEW_CAMPAIGN.EDIT_TITLE')}</TitlePage>
                <Container className="mb-4">
                    <Form.Group controlId="name">
                        <Form.Label>{t('ADD_NEW_CAMPAIGN.CAMPAIGN_NAME')}:</Form.Label>
                        {" "}
                        <Form.Control type="text" aria-describedby="passwordHelpBlock" value={campaign_data.name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Row>
                        <Col>
                            <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.CAMPAIGN_START_DATE')}:</Form.Label></>
                            <Calendar dateFormat="dd/mm/yy" value={new Date(campaign_data.start)} onChange={(e) => setStartDate(e.value)} showIcon={true} touchUI={true}></Calendar>
                        </Col>
                        <Col>
                            <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.CAMPAIGN_END_DATE')}:</Form.Label></>
                            <Calendar dateFormat="dd/mm/yy" value={new Date(campaign_data.end)} onChange={(e) => setEndDate(e.value)} showIcon={true} touchUI={true}></Calendar>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            {/* <p>Counsellors:</p> */}
                            <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.COUNSELLORS')}:</Form.Label></>
                            <MultiSelect optionLabel="fullName" showClear={true} maxSelectedLabels={1} value={campaign_data.counsellors} options={members} onShow={loadMembers} onChange={(e) => setCounsellors(e.value)} />
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
                                <Button variant="primary" onClick={cancelButton}>{t('ADD_NEW_CAMPAIGN.CANCEL_BUTTON')}</Button>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <Button variant="success" onClick={updateCampaign}>{t('ADD_NEW_CAMPAIGN.UPDATE_BUTTON')}</Button>
                            </Col>
                        </Row>
                    </Container>

                </Container>
            </div>
    )
}