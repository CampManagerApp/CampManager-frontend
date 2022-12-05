import React,{ useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";

export default function CampParticipantsList({ items=[], template:Template, onClickItem = ()=>{}}) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { get_campaign_participants} = useContext(organisationContex)
    const [item, setitem] = useState({});
    
    const [participants, setParticipants] = new useState()
    const [modalShow, setModalShow] = useState(false);

    function participantContent({item}) {
        return (
            <div className="d-flex justify-content-center">
                {item.name}
            </div>
        )
        
    }

    function onClickParticipant(item){
        const itemSinID = { 'Participant Name':item.name, 'Parent Contact':item.contact, 'Notes':items.notes }
        setitem(itemSinID)  
        setModalShow(true)
    }

    useEffect(()=> {
        if (update) {
            const participantsList = get_campaign_participants(currentOrganisation.id, currentCamp.id)
            setParticipants(participantsList)
        }
        setUpdate(false)
    }, [update])

    return (
        <div>
            <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} />
            <ProfilePage profileName={currentCamp.name} profileNick="Participants" backgroundImg={image.hiking}  includeProfileImage={includeProfileImage}  /> 
            <ItemList items={participants} onClickItem={onClickParticipant} template={participantContent}></ItemList>
        </div>
    )
}