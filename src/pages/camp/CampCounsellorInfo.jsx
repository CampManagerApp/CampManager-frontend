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
import ItemInfoCounsellor from "../../components/lists/ItemInfoCounsellor";

export default function CampCounsellorInfo({ items = [], template: Template, onClickItem = () => { } }) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { get_campaign_counsellor } = useContext(organisationContex)
    const [item, setitem] = useState({});

    const [counsellor, setCounsellor] = new useState({})
    const [modalShow, setModalShow] = useState(false);
    const { currentCounsellor } = useContext(UserStatusContext)

    useEffect(() => {
        loadCounsellor()
    }, [])

    async function loadCounsellor() {
        const counsellor_info = await get_campaign_counsellor(currentOrganisation.id, currentCamp.id, currentCounsellor.fullName)
        delete counsellor_info.id
        setCounsellor(counsellor_info)
    }

    return (
        <div className="scrollable-content">
            <ProfilePage profileName="Counsellor information" profileNick={counsellor.name} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <ItemInfoCounsellor counsellor={counsellor}></ItemInfoCounsellor>
        </div>
    )
}