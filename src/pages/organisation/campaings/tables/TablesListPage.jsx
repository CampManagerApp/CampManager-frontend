import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { organisationContex } from "../../../../context/OrganisationContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";

import * as image from "../../../../design/images.js";
import ProfilePage from "../../../../components/common/ProfilePage";
import ItemList from "../../../../components/lists/ItemList";


function TableContent({ item, onUpdate }) {
    const { isOrgAdmin } = useContext(UserStatusContext)
    return (
        isOrgAdmin
            ? <TableAdminContent item={item} onUpdate={onUpdate} />
            : <TableMemberContent item={item} />
    )

}

function TableAdminContent({ item }) {
    return (
        <Row>
            <Col className="d-flex align-items-center">
                {item.name}
            </Col>
            <Col className="d-flex justify-content-end">
                <button className="btn btn-danger" onClick={() => { }} >
                    <i className="bi bi-trash"></i>
                </button>
            </Col>
        </Row>
    )
}


function TableMemberContent({ item }) {
    return (
        <div className="d-flex justify-content-center">
            {item.name}
        </div>
    )

}


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
                <Col className="d-flex justify-content-end">
                    <Button onClick={createTable} >+</Button>
                </Col>
                <ItemList items={tables} onClickItem={onClickTable} template={TableContent}></ItemList>
            </Container>
        </div>
    )
}