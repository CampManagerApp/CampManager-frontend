import { useEffect } from "react"
import { Col, Form, Modal, Row } from "react-bootstrap"

import { toCapitalLetter } from "../../utils"

export default function ItemInfoParticipant(props) {

    function showFiled(field) {
        if (field == null) {
            return false
        } else if(!isNaN(field)) {
            return field > 0 // provsional
        }
        return true
    }

    return (

        <Form className='form-padding scrollable-content' style={{ height: '60vh' }}>
            {
                Object.keys(props.participant).map(function (key, index) {
                    return (
                        showFiled(props.participant[key])
                            ? <Row key={index} className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{toCapitalLetter(key)}</Form.Label>
                                    <Form.Control placeholder={props.participant[key]} disabled />
                                </Form.Group>
                            </Row>
                            : ''
                    )
                })
            }
        </Form>

    )
}
