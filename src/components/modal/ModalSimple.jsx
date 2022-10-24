import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';

export default function ModalSimple(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Organisation details
                </Modal.Title>
            </Modal.Header>
            <Form className='form-padding'>
                {
                    Object.keys(props.item).map(function (key, index) {
                        return (
                            <Form.Group as={Col}>
                                <Form.Label>{key}</Form.Label>
                                <Form.Control placeholder={props.item[key]} disabled />
                            </Form.Group>
                        )
                    })
                }
                {/*         
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Index</Form.Label>
                    <Form.Control placeholder={props.item.i} disabled />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Organisation name</Form.Label>
                    <Form.Control placeholder={props.item.name} disabled />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>ID</Form.Label>
                    <Form.Control placeholder={props.item.id} disabled/>
                </Form.Group>
            <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Admin</Form.Label>
                <Form.Control placeholder={props.item.admin} disabled />
            </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" placeholder="Comment" disabled />
            </Form.Group> */}
            </Form>
        </Modal>
    );
}