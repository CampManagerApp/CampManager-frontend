import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { organisationContex } from '../../../../context/OrganisationContex'
import { MessageContext } from "../../../../context/MessageContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";

import * as Icons from '../../../../design/icons.js';
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import * as image from "../../../../design/images";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TemporalDataContext } from "../../../../context/TemporalDataContext";

export default function CreateTable() {
    const navigate = useNavigate()
    const { t } = useTranslation('common');
    const { create_campaign_table, get_campaign_counsellors, solve_campaign_table } = useContext(organisationContex)
    const { table_data, set_table_data } = useContext(TemporalDataContext)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)


    function navigateToCounsellors() {
        navigate('/camp/tables/createtable/counsellors')
    }
    function navigateToDays() {
        navigate('/camp/tables/createtable/days')
    }
    function navigateToTasks() {
        navigate('/camp/tables/createtable/tasks')
    }
    function navigateToBack() {
        navigate(-1)
    }

    // Save temporal data functions
    function saveTableName(name) {
        set_table_data({ ...table_data, ['name']: name })
    }

    //CHANGE THIS CODE AFTER IMPLEMENTATION
    const [xValues, setXValues] = useState('')
    const [yValues, setYValues] = useState('')
    const [values, setValuesName] = useState('')

    function solveTable(table_name) {
        solve_campaign_table(currentOrganisation.id, currentCamp.id, table_name).then(() => {
            navigate('/camp/tables/', { replace: true })
        })
    }

    async function createTable() {
        // navigate('/camp/tables');
        // get_campaign_counsellors(currentOrganisation.id, currentCamp.id).then((counsellors) => {
        //     const counsellors_name = counsellors.map((counsellor) => counsellor.fullName)
        //     const tableForm = {
        //         tableName: table_data.name,
        //         days: xValues,
        //         tasks: yValues,
        //         counsellors: counsellors_name.join(';')
        //     }
        //     create_campaign_table(currentOrganisation.id, currentCamp.id, tableForm).then((table) => {
        //         solveTable(table_data.name)
        //     })
        // })
        const { name, xValues, tasks, counsellors } = table_data
        const formated_tasks = tasks.map((task) => `${task.name},${task.minimum},${task.maximum}`)
        const counsellors_name = counsellors.map((counsellor) => counsellor.fullName)
        const tableForm = {
            tableName: table_data.name,
            days: xValues.join(';'),
            tasks: formated_tasks.join(';'),
            counsellors: counsellors_name.join(';')
        }
        create_campaign_table(currentOrganisation.id, currentCamp.id, tableForm).then((table) => {
            solveTable(table_data.name)
        })

    }
    //CHANGE THIS CODE AFTER IMPLEMENTATION

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>{t('ADD_NEW_TABLE.TITLE')}</TitlePage>
            <Container>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t('ADD_NEW_TABLE.TABLE_NAME')}</Form.Label>
                    <Form.Control type="text" value={table_data.name} onChange={(e) => saveTableName(e.target.value)} />
                    <br />
                    <Row>
                        <Col><Form.Label>{t('ADD_NEW_TABLE.COUNSELLORS')}</Form.Label></Col>
                        <Col className="text-end"><Button variant="primary" size="sm" onClick={navigateToCounsellors}><Icons.AddUser /></Button></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col><Form.Label>{t('ADD_NEW_TABLE.DAYS')}</Form.Label></Col>
                        <Col className="text-end"><Button variant="primary" size="sm" onClick={navigateToDays}><Icons.AddUser /></Button></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col><Form.Label>{t('ADD_NEW_TABLE.TASKS')}</Form.Label></Col>
                        <Col className="text-end"><Button variant="primary" size="sm" onClick={navigateToTasks}><Icons.AddUser /></Button></Col>
                    </Row>
                    <br />
                    {/* <Form.Label>{t('ADD_NEW_TABLE.X_VALUE')}</Form.Label>
                <Form.Control type="text" value={xValues} onChange={(e) => setXValues(e.target.value)}/>
                <Form.Label>{t('ADD_NEW_TABLE.Y_VALUE')}</Form.Label>
                <Form.Control type="text" value={yValues} onChange={(e) => setYValues(e.target.value)}/> */}
                </Form.Group>
                <Container>
                    <Row className="align-items-center">
                        <Col className="d-flex justify-content-center">
                            <Button variant="primary" onClick={navigateToBack}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button variant="success" onClick={createTable}>{t('ADD_NEW_TABLE.CREATE_BUTTON')}</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </React.Fragment>
    )
}