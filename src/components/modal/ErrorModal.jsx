import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';
import { useTranslation } from "react-i18next";

export default function ErrorModal({ error_title = 'Error', error_message = '', ...rest}) {
    const { t, i18n } = useTranslation('common');

    return (
        <>
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{error_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error_message}</Modal.Body>
            </Modal>
        </>
    );
}