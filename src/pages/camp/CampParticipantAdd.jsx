import React,{ useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import ParticipantModal from "../../components/modal/ParticipantModal";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";
import Col from 'react-bootstrap/Col';
import { Button, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { toCapitalLetter } from "../../utils";
import ItemInfoParticipant from "../../components/lists/ItemInfoParticipant";
import * as Icons from '../../design/icons.js';
import { IonItemSliding } from "@ionic/react";
import ItemAddParticipant from "../../components/lists/ItemAddParticipant";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"
import { TemporalDataContext } from "../../context/TemporalDataContext";
import './CampParticipantAdd.css'


export default function CampParticipantAdd() {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const [participant, setParticipant] = new useState({})
    const { t, i18n } = useTranslation('common');
    const navigate = useNavigate()

    const { campaign_data, set_campaign_data } = useContext(TemporalDataContext)

    useEffect(()=> {
        if (update) {
        }
        setUpdate(false)
    }, [update])
    function handleSubmit(form) {
        const participants = [...campaign_data.participants, form]
        set_campaign_data({...campaign_data, ['participants']: participants})
        navigate(-1)
    }


    return (
        <div className="div-form1 scrollable-content" style={{height:"80vh", display:"flex", flexDirection:"column"}}>
            <ProfilePage profileName={t('PARTICIPANTS_ADD.TITLE')} profileNick={participant.name} backgroundImg={image.hiking}  includeProfileImage={includeProfileImage}  />
            <div className='div-form'>
                <ItemAddParticipant handleSubmit={handleSubmit}/>
            </div>    
        </div>
    )
}