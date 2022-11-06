import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalOrganisation.css';

export default function ConfirmationModal(props) {

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
              props.onConfirmation()
              props.onHide()
            }
          } >Delete</Button>
          <Button variant="primary" onClick={props.onHide} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}