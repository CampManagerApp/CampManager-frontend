import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";
import * as Icons from '../../design/icons.js';
import { Button, Col, Container, Row } from "react-bootstrap";

import './CampParticipantsSelect.css'
import { MessageContext } from "../../context/MessageContex";
import { useTranslation } from "react-i18next";
import { TemporalDataContext } from "../../context/TemporalDataContext";

export default function EditCampParticipantsSelect({ items = [], template: Template, onClickItem = () => { } }) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const { campaign_data, set_campaign_data } = useContext(TemporalDataContext)
    const { get_campaign_participants } = useContext(organisationContex)
    const { currentCamp, get_current_organisation } = useContext(UserStatusContext)

    const [update, setUpdate] = useState(true)
    const [item, setitem] = useState({});
    const { t, i18n } = useTranslation('common');

    const navigate = useNavigate()
    const { showConfirmationModal } = useContext(MessageContext)

    function participantContent({ item }) {
        return (
            <div >
                <Row>
                    <Col className="d-flex justify-content-center row-texto align-items-center" style={{ width: 80 + '%' }}>
                        <p>{item.name}</p>
                    </Col>
                    <Col className="row-del" style={{ width: 20 + '%' }}>
                        <button type="button" className="btn btn-danger button-delete bt-del" onClick={() => {
                            showConfirmationModal(() => { delete_item(item) })
                        }}><span className="d-none d-lg-inline d-print-flex">Delete</span><i className="bi bi-trash"></i></button>
                    </Col>
                </Row>
            </div>

        )

    }
    function onClickAdd(item) {
        navigate('/camp/participants/list/addpart');
    }

    function delete_item(item) {
        const restParticipants = campaign_data.participants.filter(participant => participant.fullName != item.fullName)
        set_campaign_data({ ...campaign_data, ['participants']: restParticipants })
    }

    return (
        <div>
            <ProfilePage profileName={t('PARTICIPANTS_SELECT.EDIT_TITLE')} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <Container>
                <ItemList items={campaign_data.participants} template={participantContent}></ItemList>
                <Button onClick={() => { navigate('/admin/editcampaign', { replace: true }) }} style={{ bottom: "10vh", position: "absolute" }}>
                    {t('PARTICIPANTS_SELECT.CONTINUE')}
                </Button>
                <Button className="bt-add" onClick={onClickAdd}>
                    <Icons.AddUser />
                </Button>
            </Container>

        </div>
    )
}