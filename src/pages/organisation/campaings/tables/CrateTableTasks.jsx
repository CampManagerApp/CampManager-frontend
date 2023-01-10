import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { organisationContex } from '../../../../context/OrganisationContex'
import { ListGroup } from 'react-bootstrap'
import {Button,Modal} from "react-bootstrap";
import { MessageContext } from "../../../../context/MessageContex";
import { UserStatusContext } from "../../../../context/UserStatusContext";

import * as image from "../../../../design/images";
import * as Icons from '../../../../design/icons.js';
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModalTaskTables(show, handleClose, handleSubmit, nameTask, setNameTask, minimum, setMinimum, maximum, setMaximum) {
	const { t } = useTranslation('common');
	return (
	<Modal show={show} centered>
		<Modal.Header><Modal.Title>{t('ADD_NEW_TABLE.ADD_ONE_TASK')}</Modal.Title></Modal.Header>
        <Modal.Body>
			<Form>
				<Form.Group>
				<Form.Label>{t('ADD_NEW_TABLE.NAME_TASK')}</Form.Label>
				<Form.Control type="text" value={nameTask} onChange={(e) => setNameTask(e.target.value)}/>
            	</Form.Group>
				<br/>
            	<Form.Group>
				<Row>
					<Col><Form.Label>{t('ADD_NEW_TABLE.MINIMUM')}</Form.Label>
						<Form.Control type="number" min={0} max={100} value={minimum} inputMode="numeric" onChange={(e) => setMinimum(e.target.value)}/>
					</Col>
					<Col><Form.Label>{t('ADD_NEW_TABLE.MAXIMUM')}</Form.Label>
						<Form.Control type="number" min={0} max={100} value={maximum} inputMode="numeric" onChange={(e) => setMaximum(e.target.value)}/>
					</Col>
			  	</Row>
            	</Form.Group>
          	</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
          <Button variant="success" onClick={handleSubmit}>{t('ADD_NEW_TABLE.ACCEPT_BUTTTON')}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default function CreateTableTasks() {
	const { t, i18n } = useTranslation('common');
    const navigate = useNavigate()
    const{create_campaign_table, get_campaign_counsellors, solve_campaign_table} = useContext(organisationContex)
    const { currentCamp, currentOrganisation } = useContext(UserStatusContext)
    const { showErrorMessage } = useContext(MessageContext)
    const [modalShow, setModalShow] = useState(false);
    function navigateToBack(){
        navigate(-1)
    }
  const [show, setShow] = useState(false);
  const [nameTask, setNameTask] = useState('');
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');
  const [items, setItems] = useState([]);
  function handleDelete(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
  setItems([...items, { nameTask, minimum, maximum }]);
  setNameTask('');
  setMinimum('');
  setMaximum('');
  handleClose();
}
    return (
    <React.Fragment>        
        <BannerImage bannerImage={image.backgroundOrg} />
        <TitlePage>{t('ADD_NEW_TABLE.ADD_TASKS')}</TitlePage>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formText">
                    <Row >
                        <Col className="d-flex justify-content-center"><Button variant="primary" onClick={handleShow}><Icons.AddUser/></Button>
                        {ModalTaskTables(show, handleClose, handleSubmit, nameTask, setNameTask, minimum, setMinimum, maximum, setMaximum)}
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <br/>
            <ListGroup>{items.map((item, index) => (
                <Row>
                    <Col className="col-10"><ListGroup.Item className="text-truncate" key={index}>{item.nameTask},{item.minimum},{item.maximum}</ListGroup.Item></Col>
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