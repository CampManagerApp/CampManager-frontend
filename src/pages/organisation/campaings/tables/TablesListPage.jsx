import React,{ useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProfilePage from "../../../../components/common/ProfilePage";
import ItemList from "../../../../components/lists/ItemList";
import { organisationContex } from "../../../../context/OrganisationContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import * as image from "../../../../design/images.js";

export default function TablesListPage({ items=[], template:Template, onClickItem = ()=>{}}) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { get_campaign_tables} = useContext(organisationContex)
    const [item, setitem] = useState({});
    const { t, i18n } = useTranslation('common');
    
    const [tables, setTables] = new useState()

    function tableContent({item}) {
        return (
            <div className="d-flex justify-content-center">
                {item.name}
            </div>
        )
        
    }

    function onClickTable(item){
        //const itemSinID = { 'Participant Name':item.name, 'Parent Contact':item.contact, 'Notes':items.notes }
        //setitem(itemSinID)  
    }

    useEffect(()=> {
        if (update) {
            console.log(currentCamp)
            //const tablesList = get_campaign_tables(currentOrganisation.id, currentCamp.id)
            const tablesList = [
                {id:0, name:'Roda de Serveis Monis'}, 
                {id:1, name:'Roda de Serveis Nens'},
             ]
            setTables(tablesList)
        }
        setUpdate(false)
    }, [update])

    return (
        <div>
            <ProfilePage profileName={currentCamp.campaignName} profileNick={t('TABLES_LIST.TITLE')} backgroundImg={image.hiking}  includeProfileImage={includeProfileImage}  /> 
            <ItemList items={tables} onClickItem={onClickTable} template={tableContent}></ItemList>
        </div>
    )
}