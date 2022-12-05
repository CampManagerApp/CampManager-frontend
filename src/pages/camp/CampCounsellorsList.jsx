import React,{ useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";

export default function CampCounsellorsList({ items=[], template:Template, onClickItem = ()=>{}}) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { get_campaign_counsellors} = useContext(organisationContex)
    const [item, setitem] = useState({});
    
    const [counsellors, setCounsellors] = new useState()
    const [modalShow, setModalShow] = useState(false);

    function counsellorContent({item}) {
        return (
            <div className="d-flex justify-content-center">
                {item.name}
            </div>
        )  
    }

    function onClickCounsellor(item){
        const itemSinID = { 'Counsellor Name':item.name, 'Parent Contact':item.contact, 'Notes':items.notes }
        setitem(itemSinID)  
        setModalShow(true)
    }

    useEffect(()=> {
        if (update) {
            const counsellorsList = get_campaign_counsellors(currentOrganisation.id, currentCamp.id)
            setCounsellors(counsellorsList)
        }
        setUpdate(false)
    }, [update])

    return (
        <div>
            <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} />
            <ProfilePage profileName={currentCamp.name} profileNick="Counsellors" backgroundImg={image.hiking}  includeProfileImage={includeProfileImage}  /> 
            <ItemList items={counsellors} onClickItem={onClickCounsellor} template={counsellorContent}></ItemList>
        </div>
    )
}