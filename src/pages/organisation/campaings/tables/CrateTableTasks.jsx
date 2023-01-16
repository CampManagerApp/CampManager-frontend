import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { organisationContex } from '../../../../context/OrganisationContex'
import { ListGroup } from 'react-bootstrap'
import { Button, Modal } from "react-bootstrap";
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
import { TemporalDataContext } from "../../../../context/TemporalDataContext";

function ItemElement({ item }) {
    return (
        <ListGroup.Item className="text-truncate">
            {/* {item.name},{item.minimum},{item.maximum} */}
            <Row>
                <Col className="d-flex justify-content-center align-items-center">{item.name}</Col>
                <Col>
                    <Row className="border">
                        <Col className="border-right">
                            Min
                        </Col>
                        <Col>
                            {item.minimum}
                        </Col>
                    </Row>

                    <Row className="border">
                        <Col className="border-right">
                            Max
                        </Col>
                        <Col>
                            {item.maximum}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

function ModalTaskTables(task, show, handleClose, handleSubmit, setNameTask, setMinimum, setMaximum) {
    const { t } = useTranslation('common');
    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>{t('ADD_NEW_TABLE.ADD_ONE_TASK')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>{t('ADD_NEW_TABLE.NAME_TASK')}</Form.Label>
                        <Form.Control type="text" value={task.name} onChange={(e) => setNameTask(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col><Form.Label>{t('ADD_NEW_TABLE.MINIMUM')}</Form.Label>
                                <Form.Control type="number" min={0} max={100} value={task.minimum} inputMode="numeric" onChange={(e) => setMinimum(e.target.value)} />
                            </Col>
                            <Col><Form.Label>{t('ADD_NEW_TABLE.MAXIMUM')}</Form.Label>
                                <Form.Control type="number" min={0} max={100} value={task.maximum} inputMode="numeric" onChange={(e) => setMaximum(e.target.value)} />
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
    const { table_data, set_table_data } = useContext(TemporalDataContext)

    const [show, setShow] = useState(false);
    // const [nameTask, setNameTask] = useState('');
    // const [minimum, setMinimum] = useState('');
    // const [maximum, setMaximum] = useState('');
    const [items, setItems] = useState([]);
    const [task, setTask] = useState({ name: '', minimum: '', maximum: '' })


    function setName(name) {
        setTask({ ...task, ['name']: name })
    }

    function setMinimum(minimum) {
        setTask({ ...task, ['minimum']: minimum })
    }

    function setMaximum(maximum) {
        setTask({ ...task, ['maximum']: maximum })
    }

    function handleDelete(index) {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        set_table_data({ ...table_data, ['tasks']: newItems })
    }
    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        //setItems([...items, { nameTask, minimum, maximum }]);
        const tasks = [...table_data.tasks, task]
        set_table_data({ ...table_data, ['tasks']: tasks })
        setTask({ name: '', minimum: '', maximum: '' })
        handleClose();
    }

    function handleCancel() {
        set_table_data({ ...table_data, ['tasks']: [] })
        navigate(-1)
    }

    function handleAccept() {
        navigate(-1)
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>{t('ADD_NEW_TABLE.ADD_TASKS')}</TitlePage>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formText">
                        <Row >
                            <Col className="d-flex justify-content-center"><Button variant="primary" onClick={handleShow}><Icons.AddUser /></Button>
                                {ModalTaskTables(task, show, handleClose, handleSubmit, setName, setMinimum, setMaximum)}
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <br />
                <div className='scrollable-content' style={{ height: '30vh' }}>
                    <ListGroup>{table_data.tasks.map((item, index) => (
                        <Row key={index}>
                            {/* <Col className="col-10"><ListGroup.Item className="text-truncate" key={index}>{item.name},{item.minimum},{item.maximum}</ListGroup.Item></Col> */}
                            <Col className="col-10"><ItemElement item={item} /></Col>
                            <Col className="col-2"><Button variant="danger" onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></Button></Col>
                        </Row>))}
                    </ListGroup>
                </div>
                <br />
            </Container>
            <Container className="flex-item flex-container justify-content-end align-center-end mb-4">
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={handleCancel}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" onClick={handleAccept}>{t('ADD_NEW_TABLE.ACCEPT_BUTTTON')}</Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}