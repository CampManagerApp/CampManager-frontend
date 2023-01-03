import React, { useState,useEffect } from "react";
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
import { UserStatusContext } from "../../../../context/UserStatusContext";
import { toBackendFormat } from "../../../../utils";
import { MessageContext } from "../../../../context/MessageContex";
import { TemporalDataContext } from "../../../../context/TemporalDataContext";
import Spinner from "../../../../components/common/spinner/Spinner";

export default function EditCampaign() {
    const navigate = useNavigate()
    const { t } = useTranslation('common');
    const { get_claimed_members, create_campaign, add_campaign_counsellors, add_campaign_participants } = useContext(organisationContex)
    const { get_campaign_counsellors } = useContext(organisationContex)
    const { get_current_camp,get_current_organisation,currentCamp } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)
    const { campaign_data, set_campaign_data, reset_campaign_data } = useContext(TemporalDataContext)
    const [getCounsellors] = new useState()
    const [members, setMembers] = useState([])
    const [creating, setCreating] = useState(false)
    const { campaignName,startDate,endDate } = get_current_camp()
    const [startDay, startMonth, startYear] = startDate.split('/');
    const startDateCalendar = `${startYear}-${startMonth}-${startDay}`;
    const [endDay, endMonth, endYear] = endDate.split('/');
    const endDateCalendar = `${endYear}-${endMonth}-${endDay}`;

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


    function navigateToParticipants() {
        navigate('/admin/editcampaign/participants/list/add');
    }
    function cancelButton() {
        navigate('/organisation/campaings')
    }

    function loadMembers() {
        const { id } = get_current_organisation()
        get_claimed_members(id).then((members) => {
            const members_options = members.map((member) => {
                return { label: member.full_name }
            })
            setMembers(members_options)
        })
    }
    useEffect(() => {
        loadCounsellors()
    }, [])
    console.log("lazo",campaign_data.counsellors)

    async function loadCounsellors() {
        const counsellorsList = await get_campaign_counsellors(get_current_organisation().id, currentCamp.id)
        console.log("jordi",counsellorsList)
        getCounsellors(counsellorsList)
    }

    async function createCampaing() {
        const { id } = get_current_organisation()
        const start = toBackendFormat(campaign_data.start)
        const end = toBackendFormat(campaign_data.end)
        var campaign_id = ''
        // create a campaing
        setCreating(true)
        try {
            const campaign = await create_campaign(id, campaign_data.name, start, end)
            campaign_id = campaign.id
        } catch (error) {
            reset_campaign_data()
            if (error.duplicated) {
                showErrorMessage(t('ADD_NEW_CAMPAIGN.ERRORS.ERROR_TITLE'), t('ADD_NEW_CAMPAIGN.ERRORS.DUPLICATED_ERROR'))
            }
            return
        }

        try {
            // check if must be add counsellors to the campaing
            if (campaign_data.counsellors.length != 0) {
                // transform the counsellor object
                const counsellors = campaign_data.counsellors.map((counsellor) => {
                    return { fullName: counsellor.label }
                })
                // add counsellors
                await add_campaign_counsellors(id, campaign_id, counsellors)
            }
        } catch (error) {
            console.log(error)
            if (error.duplicated) {
                showErrorMessage(t('ADD_NEW_CAMPAIGN.ERRORS.ERROR_TITLE'), t('ADD_NEW_CAMPAIGN.ERRORS.DUPLICATED_ERROR'))
            }
            reset_campaign_data()
            return
        }

        try {
            await add_campaign_participants(id, campaign_id, campaign_data.participants)
        } catch (error) {
            console.log(error)
            if (error.duplicated) {
                showErrorMessage(t('ADD_NEW_CAMPAIGN.ERRORS.ERROR_TITLE'), t('ADD_NEW_CAMPAIGN.ERRORS.DUPLICATED_ERROR'))
            }
            reset_campaign_data()
            return
        }
        reset_campaign_data()
        navigate('/organisation/campaings', { replace: true })
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
                        <Form.Control type="text" aria-describedby="passwordHelpBlock" value={campaignName} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Row>
                        <Col>
                            <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.CAMPAIGN_START_DATE')}:</Form.Label></>
                            <Calendar dateFormat="dd/mm/yy" value={new Date(startDateCalendar)} onChange={(e) => setStartDate(e.value)} showIcon={true} touchUI={true}></Calendar>
                        </Col>
                        <Col>
                            <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.CAMPAIGN_END_DATE')}:</Form.Label></>
                            <Calendar dateFormat="dd/mm/yy" value={new Date(endDateCalendar)} onChange={(e) => setEndDate(e.value)} showIcon={true} touchUI={true}></Calendar>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            {/* <p>Counsellors:</p> */}
                            <><Form.Label className="formLabel">{t('ADD_NEW_CAMPAIGN.COUNSELLORS')}:</Form.Label></>
                            <MultiSelect showClear={true} defaultValue={['Mariona Villaró']} maxSelectedLabels={1} value={campaign_data.counsellors} options={members} onShow={loadMembers} onChange={(e) => setCounsellors(e.value)} />
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
                                <Button variant="success" onClick={createCampaing}>{t('ADD_NEW_CAMPAIGN.UPDATE_BUTTON')}</Button>
                            </Col>
                        </Row>
                    </Container>

                </Container>
            </div>
    )
}