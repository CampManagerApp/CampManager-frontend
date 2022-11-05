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
        {Object.keys(props.item).map(function (key) {
                        return (
                          <Modal.Body>Are you sure you want to delete the user</Modal.Body>                   
                        )
                    })
                }  
        <Modal.Footer>
          <Button variant="danger" onClick={
            ()=>{props.onConfirmation(props.item.id)}} >Delete</Button>
          <Button variant="primary" >Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}