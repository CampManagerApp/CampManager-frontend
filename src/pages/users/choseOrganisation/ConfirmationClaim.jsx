import { Card, Container, ListGroupItem, Row } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './ConfirmationClaim.css'

export default function ConfirmationClaim({user='' ,show = false, onConfirmation=()=>{}, onCancel=()=>{}}) {
    const { t, i18n } = useTranslation('common');

    return (
        <Modal show={show} centered={true} >
            <Modal.Dialog>
                <Modal.Header >
                    <Modal.Title>{t("ADD_NEW_USR_ORG.CLAIM_CONFIRMATION.CLAIM_MODAL_TITLE")}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{t("ADD_NEW_USR_ORG.CLAIM_CONFIRMATION.ACTION_INFORMATION")}</p>
                        <Card bsPrefix='confirmation-user-box'>
                            <Card.Body className='d-flex justify-content-center'>
                                {user}
                            </Card.Body>
                        </Card>
                    <p>{t("ADD_NEW_USR_ORG.CLAIM_CONFIRMATION.CONFIRMATION_MESSAGE")}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onConfirmation} >{t("ADD_NEW_USR_ORG.CLAIM_CONFIRMATION.CONFIRMATION")}</Button>
                    <Button variant="danger" onClick={onCancel}>{t("ADD_NEW_USR_ORG.CLAIM_CONFIRMATION.CANCEL")}</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}