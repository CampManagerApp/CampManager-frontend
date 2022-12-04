import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';
import { useTranslation } from "react-i18next";

export default function ConfirmationModal(props) {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('MODAL_DELETE.TITLE')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('MODAL_DELETE.QUESTION')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
              props.onConfirmation()
              props.onHide()
            }
          } >{t('MODAL_DELETE.DELETE_BUTTON')}</Button>
          <Button variant="primary" onClick={props.onHide} >{t('MODAL_DELETE.CANCEL_BUTTON')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}