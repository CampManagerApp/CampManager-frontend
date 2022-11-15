import { Card, Container, ListGroupItem, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './ConfirmationClaim.css'

export default function ConfirmationClaim({user='' ,show = false, onConfirmation=()=>{}, onCancel=()=>{}}) {
    return (
        <Modal show={show} centered={true} >
            <Modal.Dialog>
                <Modal.Header >
                    <Modal.Title>Claim Name</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>You are about to claim the name</p>
                        <Card bsPrefix='confirmation-user-box'>
                            <Card.Body className='d-flex justify-content-center'>
                                {user}
                            </Card.Body>
                        </Card>
                    <p>Are you sure?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onConfirmation} >YES, PROCEED</Button>
                    <Button variant="danger" onClick={onCancel}>NO, CANCEL</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}