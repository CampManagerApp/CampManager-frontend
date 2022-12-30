import React, { useContext, useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';
import { Button, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { organisationContex } from "../../../../context/OrganisationContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import { useTranslation } from "react-i18next";
import { exportTableAsCSV } from "../../../../services/filesystem/filesystem";
import { export_org_campaign_table } from "../../../../services/organisation/Organisation";

import * as image from "../../../../design/images.js";
import ItemTableList from "../../../../components/lists/ItemTableList";
import ProfilePage from "../../../../components/common/ProfilePage";

export default function ShowTableList({ items = [], template: Template, onClickItem = () => { } }) {
  const idVisible = 'hidden';
  const includeProfileImage = 'none';
  const navigate = useNavigate()
  const toast = useRef(null)

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


  async function downloadTable() {
    try {
      // download csv from backend
      const table_content_csv = await export_org_campaign_table(
        get_current_organisation().id,
        currentCamp.id,
        currentTable.name
      )
      // store csv
      await exportTableAsCSV(get_current_organisation().name, currentTable.name, table_content_csv)
      toast.current.show({severity: 'success', summary: 'Exported', detail: 'Table exported'});
    } catch (err) {
      console.log(err)
      toast.current.show({severity: 'error', summary: 'Error', detail: 'Error to export the table'});
    }
  }

  return (
    <div>
      {/* <ParticipantModal item={item} show={modalShow} onHide={() => setModalShow(false)} /> */}
      <ProfilePage profileName={currentCamp.campaignName} profileNick={t('TABLES_LIST.TITLE') + ' : ' + currentTable.name} backgroundImg={image.hiking} includeProfileImage={includeProfileImage} />
      <Toast ref={toast} />
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