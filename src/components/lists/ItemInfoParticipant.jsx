import { useEffect } from "react"
import { Col, Form, Modal, Row } from "react-bootstrap"

import { toCapitalLetter } from "../../utils"

export default function ItemInfoParticipant(props) {

    return (

        <Form className='form-padding scrollable-content' style={{height:'60vh'}}>
            {
                Object.keys(props.participant).map(function (key, index) {
                    return (
                        props.participant[key] != null
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
