import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";
import * as Icons from '../../design/icons.js';
import { Button, Container, Row } from "react-bootstrap";

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

    const [participants, setParticipants] = new useState()

    const [modalShow, setModalShow] = useState(false);
    const { currentParticipants, set_current_participantsAdd, currentParticipantsAdd } = useContext(UserStatusContext)
    const navigate = useNavigate()
    const { showConfirmationModal } = useContext(MessageContext)

    function participantContent({ item }) {
        return (
            <div >
                <Row>
                    <Row className="d-flex justify-content-center row-texto" style={{ width: 80 + '%' }}>
                        <p>{item.name}</p>
                    </Row>
                    <Row className="row-del" style={{ width: 20 + '%' }}>
                        <button type="button" className="btn btn-danger button-delete bt-del" onClick={() => {
                            showConfirmationModal(() => { delete_item(participants.indexOf(item)) })
                        }}><span className="d-none d-lg-inline d-print-flex">Delete</span><i className="bi bi-trash"></i></button>
                    </Row>
                </Row>
            </div>

        )

    }
    function onClickAdd(item) {
        navigate('/camp/participants/list/addpart');
    }
    async function loadParticipants() {
        const participants = await get_campaign_participants(get_current_organisation().id, currentCamp.id)
        const participantsList = participants.map((participant) => {
            return { name: participant.fullName }
        })
        setParticipants(participantsList)
    }

    useEffect(() => {
        if (update) {
            setParticipants(currentParticipantsAdd)
            loadParticipants()
        }
        setUpdate(false)
    }, [update])

    function delete_item(id) {
        setParticipants(participants.filter(participant => participants.indexOf(participant) !== id))
        set_current_participantsAdd(participants.filter(participant => participants.indexOf(participant) !== id))
    }

    return (
        <div>
            <ProfilePage profileName={t('PARTICIPANTS_SELECT.EDIT_TITLE')} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <Container>
                <ItemList items={participants} template={participantContent}></ItemList>
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