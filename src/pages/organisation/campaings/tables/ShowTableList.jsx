import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ItemTableList from "../../../../components/lists/ItemTableList";
import ProfilePage from "../../../../components/common/ProfilePage";
import ItemList from "../../../../components/lists/ItemList";
import ParticipantModal from "../../../../components/modal/ParticipantModal";
import { organisationContex } from "../../../../context/OrganisationContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import * as image from "../../../../design/images.js";

export default function ShowTableList({ items = [], template: Template, onClickItem = () => { } }) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, get_current_organisation, get_current_camp } = useContext(UserStatusContext)
    const { get_campaign_counsellors } = useContext(organisationContex)
    const [item, setitem] = useState({});

    const [tables, setTables] = new useState()
    const [modalShow, setModalShow] = useState(false);
    const { set_current_counsellor } = useContext(UserStatusContext)
    const navigate = useNavigate()
    const dia1 = {id:0, name :"dia1", items:[{id:0, descripcion:"sadge"},{id:1, descripcion:"bedge"}]}


    function tableContent({ item }) {
        return (
            <div className="d-flex justify-content-center">
                {item.description}
            </div>
        )
    }

    function onClickTable(item){
        const itemSinID = { 'Counsellor Name':item.name, 'Parent Contact':item.contact, 'Notes':items.notes }
        set_current_counsellor(item)
        setitem(itemSinID)  
        console.log(item)
        navigate('/camp/counsellors/list/counsellor');
    }

    useEffect(() => {
        loadCounsellors()
    }, [])


    async function loadCounsellors() {
        const counsellorsList = await get_campaign_counsellors(get_current_organisation().id, currentCamp.id)
        setTables(counsellorsList)
        console.log(counsellorsList)
    }

    return (
        <div>
            <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} />
            <ProfilePage profileName={currentCamp.name} profileNick="Tables" backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <Container>
                <ItemTableList table={dia1} onClickItem={onClickTable} ></ItemTableList>
            </Container>
        </div>
    )
}