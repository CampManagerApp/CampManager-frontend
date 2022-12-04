import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';
import { toCapitalLetter } from "../../utils";
import { useTranslation } from "react-i18next";

export default function ModalSimple(props) {
    const { t, i18n } = useTranslation('common');
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {t('MODAL_INFORMATION.TITLE')}
                </Modal.Title>
            </Modal.Header>
            <Form className='form-padding'>
                {
                    Object.keys(props.item).map(function (key, index) {
                        return (
                            <Row key={index} className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{toCapitalLetter(key)}</Form.Label>
                                    <Form.Control placeholder={props.item[key]} disabled />
                                </Form.Group>
                            </Row>
                        )
                    })
                }  
            </Form>
        </Modal>
    );
}