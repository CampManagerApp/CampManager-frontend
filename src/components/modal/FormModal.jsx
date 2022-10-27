import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';
import { toCapitalLetter } from "../../utils";

export default function FormModal(props) {

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
            <Form className='form-padding'>
                {
                    props.fields.map(function (field) {
                        return (
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{toCapitalLetter(field)}</Form.Label>
                                    <Form.Control placeholder={field} />
                                </Form.Group>
                            </Row>
                        )
                    })
                }
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                        Submit
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}