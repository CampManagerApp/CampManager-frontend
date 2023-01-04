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


export default function CreateTableDays() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    const{create_campaign_table, get_campaign_counsellors, solve_campaign_table} = useContext(organisationContex)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)
    function navigateToBack(){
        navigate(-1)
    }
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setItems([...items, text]);
    setText('');
  }
  function handleDelete(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }
    return (
    <React.Fragment>        
        <BannerImage bannerImage={image.backgroundOrg} />
        <TitlePage>{t('ADD_NEW_TABLE.ADD_DAYS')}</TitlePage>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formText">
                <Form.Label>{t('ADD_NEW_TABLE.WRITE_DAYS')}</Form.Label>
                    <Row >
                        <Col className="col-10"><Form.Control type="text" value={text} onChange={handleChange} /></Col>
                        <Col className="col-2"><Button variant="primary" type="submit"><Icons.AddUser/></Button></Col>
                    </Row>
                </Form.Group>
            </Form>
            <br/>
            <ListGroup>{items.map((item, index) => (
                <Row>
                    <Col className="col-10"><ListGroup.Item className="text-truncate" key={index}>{item}</ListGroup.Item></Col>
                    <Col className="col-2"><Button variant="danger" onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></Button></Col>
                </Row>))}
            </ListGroup>
            <br/>
            <Container>
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={navigateToBack}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" onClick={null}>{t('ADD_NEW_TABLE.ACCEPT_BUTTTON')}</Button>
                    </Col>
                </Row>
            </Container>
      </Container>
        </React.Fragment>
    )
}