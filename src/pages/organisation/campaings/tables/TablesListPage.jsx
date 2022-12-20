import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../../../components/common/ProfilePage";
import ItemList from "../../../../components/lists/ItemList";
import { organisationContex } from "../../../../context/OrganisationContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import * as image from "../../../../design/images.js";

export default function TablesListPage({ items = [], template: Template, onClickItem = () => { } }) {
    const navigate = useNavigate()
    const idVisible = 'hidden';
    const includeProfileImage = 'none';

    const [update, setUpdate] = useState(true)
    const { currentCamp, currentOrganisation, currentTable, set_current_table } = useContext(UserStatusContext)
    const { get_campaign_tables } = useContext(organisationContex)
    const [item, setitem] = useState({});
    const { t, i18n } = useTranslation('common');

    const [tables, setTables] = new useState()

    function tableContent({ item }) {
        return (
            <div className="d-flex justify-content-center">
                {item.name}
            </div>
        )

    }

    function onClickTable(item) {
        //const itemSinID = { 'Participant Name':item.name, 'Parent Contact':item.contact, 'Notes':items.notes }
        //setitem(itemSinID)  
        set_current_table(item)
        navigate('/camp/tables/info')
    }

    function createTable() {
        navigate('/camp/tables/createtable')
    }

    useEffect(() => {
        loadTables()
    }, [])


    function loadTables() {

        get_campaign_tables(currentOrganisation.id, currentCamp.id).then((tables) => {
            const tables_list = tables.map((table) => {
                return { ...tables, name: table.tableName }
            })
            setTables(tables_list)
        })

    }

    return (
        <div>
            <ProfilePage profileName={currentCamp.campaignName} profileNick={t('TABLES_LIST.TITLE')} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <Container>
                <Button onClick={createTable} >+</Button>
                <ItemList items={tables} onClickItem={onClickTable} template={tableContent}></ItemList>
            </Container>
        </div>
    )
}