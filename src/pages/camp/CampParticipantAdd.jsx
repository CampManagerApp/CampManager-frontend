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


export default function CampParticipantAdd() {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const [participant, setParticipant] = new useState({})
    const { t, i18n } = useTranslation('common');

    const [form, setForm] = useState({})
    const [items, setItems] = useState({})
    
    //const participants = [{email:'Email',name:'Nombre', apellido:'Apellido', gender:'Gender', birthday:'Birthday', PostalCode:'PostalCode'} ] 
    const ids = ['email', 'name', 'apellido', 'gender', 'Birthday', 'PostalCode' ] 
    const strings = ['Email', 'Nombre', 'Apellido', 'Gender', 'Birthday', 'PostalCode' ] 

    useEffect(()=> {
        if (update) {
            const participants = {email:t('PARTICIPANTS_ADD.EMAIL'), name:t('PARTICIPANTS_ADD.NAME') }
            console.log(participants)       
            setItems(participants) 
        }
        setUpdate(false)
    }, [update])


    return (
        <div className="div-form1 scrollable-content">
            <ProfilePage profileName={t('PARTICIPANTS_ADD.TITLE')} profileNick={participant.name} backgroundImg={image.hiking}  includeProfileImage={includeProfileImage}  />
            <div className='div-form' style={{'paddingBottom': 50+'px'}}>
                <ItemAddParticipant participants={items}></ItemAddParticipant>
            </div>    
        </div>
    )
}