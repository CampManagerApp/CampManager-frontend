import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";

export default function CampParticipantsList({ items = [], template: Template, onClickItem = () => { } }) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, get_current_organisation } = useContext(UserStatusContext)
    const { get_campaign_participants } = useContext(organisationContex)
    const [item, setitem] = useState({});

    const [participants, setParticipants] = new useState()
    const [modalShow, setModalShow] = useState(false);

    function participantContent({ item }) {
        return (
            <div className="d-flex justify-content-center">
                {item.name}
            </div>
        )

    }

    function onClickParticipant(item) {
        const itemSinID = { 'Participant Name': item.name, 'Parent Contact': item.contact, 'Notes': items.notes }
        setitem(itemSinID)
        setModalShow(true)
    }

    useEffect(() => {
        loadParticipants()
    }, [])

    async function loadParticipants() {
        const participants = await get_campaign_participants(get_current_organisation().id, currentCamp.id)
        const participantsList = participants.map((participant) => {
            return { name: participant.fullName }
        })
        setParticipants(participantsList)
    }

    return (
        <div>
            <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} />
            <ProfilePage profileName={currentCamp.name} profileNick="Participants" backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <Container>
                <ItemList items={participants} onClickItem={onClickParticipant} template={participantContent}></ItemList>
            </Container>
        </div>
    )
}