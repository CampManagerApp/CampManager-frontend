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
import {Button,Modal} from "react-bootstrap";
import { MessageContext } from "../../../../context/MessageContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";
import * as Icons from '../../../../design/icons.js';
import { ListGroup } from 'react-bootstrap';

function MyModal(props) {
    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default function CreateTableTasks() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    const{create_campaign_table, get_campaign_counsellors, solve_campaign_table} = useContext(organisationContex)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)
    const [modalShow, setModalShow] = useState(false);
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
        <TitlePage>{t('ADD_NEW_TABLE.ADD_TASKS')}</TitlePage>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formText">
                    <Row >
                        <Col className="d-flex justify-content-center"><Button variant="primary" onClick={() => setModalShow(true)}><Icons.AddUser/></Button></Col>
                        <MyModal show={modalShow} onHide={() => setModalShow(false)} />
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