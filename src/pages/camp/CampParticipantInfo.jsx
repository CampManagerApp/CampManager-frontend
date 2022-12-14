import React, { useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";
import Col from 'react-bootstrap/Col';
import { Row } from "react-bootstrap";
import { Form } from "react-router-dom";
import { toCapitalLetter } from "../../utils";
import ItemInfoParticipant from "../../components/lists/ItemInfoParticipant";


export default function CampParticipantInfo({ items = [], template: Template, onClickItem = () => { } }) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { get_campaign_participant } = useContext(organisationContex)
    const [notFound, setNotFound] = useState(false);

    const [participant, setParticipant] = new useState({})
    const { currentParticipant } = useContext(UserStatusContext)

    useEffect(() => {
        loadParticipant()
    }, [])

    async function loadParticipant() {
        try {
            const participantInfo = await get_campaign_participant(currentOrganisation.id, currentCamp.id, currentParticipant.name)
            // delete field
            delete participantInfo.id
            setParticipant(participantInfo)
        } catch (error) {
            if (error.not_found) {
                setNotFound(true)
            }
        }
    }

    return (
        <div className="scrollable-content">
            <ProfilePage profileName="Participant information" profileNick={participant.name} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            {notFound
                ? <p>Not found</p>
                : <ItemInfoParticipant participant={participant} />
            }

        </div>
    )
}