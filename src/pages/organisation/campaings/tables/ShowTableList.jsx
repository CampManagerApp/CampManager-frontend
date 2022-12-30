import React, { useContext, useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ItemTableList from "../../../../components/lists/ItemTableList";
import ProfilePage from "../../../../components/common/ProfilePage";
import { organisationContex } from "../../../../context/OrganisationContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import { useTranslation } from "react-i18next";
import { writeTestFile } from "../../../../services/filesystem/filesystem";

import * as image from "../../../../design/images.js";


export default function ShowTableList({ items = [], template: Template, onClickItem = () => { } }) {
  const idVisible = 'hidden';
  const includeProfileImage = 'none';
  const navigate = useNavigate()

  const { t, i18n } = useTranslation('common');
  const { currentCamp, get_current_organisation, currentTable } = useContext(UserStatusContext)
  const { get_campaign_table } = useContext(organisationContex)
  const [item, setitem] = useState({});

  const [table, setTable] = useState([])
  const [showMessage, setShowMessage] = useState(false)


  useEffect(() => {
    loadTables()
  }, [])


  async function loadTables() {
    const loadedTable = await get_campaign_table(get_current_organisation().id, currentCamp.id, currentTable.name)
    if (loadedTable.status === "CREATED") {
      setShowMessage(true)
    } else {
      const formatedTable = parseResponse(loadedTable)
      setTable(formatedTable)
    }
  }

  function parseResponse(response) {
    const parsedResponse = Object.fromEntries(response.days.map((day) => [day, { name: day, tasks: [] }]))
    Object.entries(response.grid).forEach(([key, participantsList]) => {
      const [day, taskName] = key.split(':')
      const participants = participantsList.map((participant) => {
        return { name: participant }
      })
      const task = { description: taskName, participants: participants }
      parsedResponse[day].tasks.push(task)
    })
    return Object.values(parsedResponse)
  }


  function downloadTable() {
    writeTestFile()
  }

  return (
    <div>
      {/* <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} /> */}
      <ProfilePage profileName={currentCamp.campaignName} profileNick={t('TABLES_LIST.TITLE') + ' : ' + currentTable.name} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
      <Container>
        <Col className="d-flex justify-content-end">
          <Button onClick={downloadTable} >{t('TABLES_LIST.DOWNLOAD')}</Button>
        </Col>
        {
          showMessage
            ? <p>{t('TABLES_LIST.TABLE_NOT_AVALIABLE')}</p>
            : <ItemTableList max_height="44vh" table={table}></ItemTableList>
        }
      </Container>

    </div>
  )
}