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
    const { get_campaign_tables } = useContext(organisationContex)
    const [item, setitem] = useState({});

    const [tables, setTables] = new useState()
    const [modalShow, setModalShow] = useState(false);
    const { set_current_counsellor } = useContext(UserStatusContext)
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');

    useEffect(() => {
        loadTables()
    }, [])


    async function loadTables() {
        const tablesList = await get_campaign_tables(get_current_organisation().id, currentCamp.id)
        setTables(tablesList)
        console.log(tablesList)
    }

    return (
        <div>
            <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} />
            <ProfilePage profileName={currentCamp.name} profileNick={t('TABLES_LIST.TITLE')} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
            <Container>
                <ItemTableList table={tables}></ItemTableList>
            </Container>
        </div>
    )
}