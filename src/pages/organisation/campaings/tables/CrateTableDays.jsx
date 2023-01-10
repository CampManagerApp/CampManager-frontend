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
import { ListGroup } from 'react-bootstrap';
import { MessageContext } from "../../../../context/MessageContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import * as Icons from '../../../../design/icons.js';
import { TemporalDataContext } from "../../../../context/TemporalDataContext";


export default function CreateTableDays() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    const {table_data, set_table_data} = useContext(TemporalDataContext)

   
    const [text, setText] = useState('');
    //const [items, setItems] = useState([]);

    function handleChange(event) {
        setText(event.target.value);
    }

    function handleAppend(event) {
        event.preventDefault();
        const xValues = [...table_data.xValues, text]
        set_table_data({...table_data, ['xValues']: xValues})
        setText('');
    }

    function handleDelete(index) {
        const xValues = [...table_data.xValues];
        xValues.splice(index, 1);
        set_table_data({...table_data, ['xValues']: xValues})
    }


    function handleSubmit(event) {
        navigate(-1)
    }

    function handleCancel() {
        set_table_data({...table_data, ['xValues']: []})
        navigate(-1)
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>{t('ADD_NEW_TABLE.ADD_DAYS')}</TitlePage>
            <Container>
                <Form onSubmit={handleAppend}>
                    <Form.Group controlId="formText">
                        <Form.Label>{t('ADD_NEW_TABLE.WRITE_DAYS')}</Form.Label>
                        <Row >
                            <Col className="col-10"><Form.Control type="text" value={text} onChange={handleChange} /></Col>
                            <Col className="col-2"><Button variant="primary" type="submit"><Icons.AddUser /></Button></Col>
                        </Row>
                    </Form.Group>
                </Form>
                <br />
                <ListGroup>{table_data.xValues.map((item, index) => (
                    <Row>
                        <Col className="col-10"><ListGroup.Item className="text-truncate" key={index}>{item}</ListGroup.Item></Col>
                        <Col className="col-2"><Button variant="danger" onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></Button></Col>
                    </Row>))}
                </ListGroup>
                <br />
                <Container>
                    <Row className="align-items-center">
                        <Col className="d-flex justify-content-center">
                            <Button variant="primary" onClick={handleCancel}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button variant="success" onClick={handleSubmit}>{t('ADD_NEW_TABLE.ACCEPT_BUTTTON')}</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </React.Fragment>
    )
}