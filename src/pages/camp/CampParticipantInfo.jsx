import React,{ useContext, useEffect, useState } from "react";
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

export default function CampParticipantInfo({ items=[], template:Template, onClickItem = ()=>{}}) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { get_campaign_participant} = useContext(organisationContex)
    const [item, setitem] = useState({});
    
    const [participant, setParticipant] = new useState({})
    const [modalShow, setModalShow] = useState(false);
    const { currentParticipant } = useContext(UserStatusContext)

    useEffect(()=> {
        if (update) {
            const participantInfo = get_campaign_participant(currentOrganisation.id, currentCamp.id, currentParticipant.id)
            setParticipant(participantInfo) 
        }
        setUpdate(false)
    }, [update])

    return (
        <div className="scrollable-content">
            <ProfilePage profileName="Participant information" profileNick={participant.name} backgroundImg={image.hiking}  includeProfileImage={includeProfileImage}  />
            <ItemInfoParticipant participant={participant}></ItemInfoParticipant>          
        </div>
    )
}