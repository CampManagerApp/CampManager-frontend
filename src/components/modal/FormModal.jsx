import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';
import { toCapitalLetter } from "../../utils";
import { useTranslation } from "react-i18next";

export default function FormModal(props) {
    const { t, i18n } = useTranslation('common');
    const [form, setForm] = useState({})

    function onChange(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    function submit(e) {
        e.stopPropagation()
        e.preventDefault()
        props.onSubmit(form)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit} className='form-padding'>
                {
                    props.fields.map(function (field, key) {
                        return (
                            <Row key={key} className="mb-3">
                                <Form.Group  as={Col} controlId={field}>
                                    <Form.Label>{toCapitalLetter(field)}</Form.Label>
                                    <Form.Control onChange={onChange} placeholder={field} />
                                </Form.Group>
                            </Row>
                        )
                    })
                }
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                    {t('MODAL_ADD.ADD_BUTTON')}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}