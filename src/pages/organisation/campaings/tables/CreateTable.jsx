import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { organisationContex } from '../../../../context/OrganisationContex'
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import * as image from "../../../../design/images";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { MessageContext } from "../../../../context/MessageContex";


export default function CreateTable() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    const{create_table} = useContext(organisationContex)
    const [tableName, setTableName] = useState('')
    const [xValues, setXValues] = useState('')
    const [yValues, setYValues] = useState('')
    const [values, setValuesName] = useState('')
    const { showErrorMessage } = useContext(MessageContext)

    async function createTable(){
        // navigate('/camp/tables');
    }


    return (
    <React.Fragment>        
        <BannerImage bannerImage={image.backgroundOrg} />
        <TitlePage>{t('ADD_NEW_TABLE.TITLE')}</TitlePage>
        <Container>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('ADD_NEW_TABLE.TABLE_NAME')}</Form.Label>
                <Form.Control type="text" value={tableName} onChange={(e) => setTableName(e.target.value)}/>
                <Form.Label>{t('ADD_NEW_TABLE.X_VALUE')}</Form.Label>
                <Form.Control type="text" value={xValues} onChange={(e) => setXValues(e.target.value)}/>
                <Form.Label>{t('ADD_NEW_TABLE.Y_VALUE')}</Form.Label>
                <Form.Control type="text" value={yValues} onChange={(e) => setYValues(e.target.value)}/>
                <Form.Label>{t('ADD_NEW_TABLE.VALUES')}</Form.Label>
                <Form.Control type="text" value={values} onChange={(e) => setValuesName(e.target.value)}/>
            </Form.Group>
            <Container>
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary">{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
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