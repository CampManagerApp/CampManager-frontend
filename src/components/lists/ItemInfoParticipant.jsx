import { useEffect } from "react"
import { Col, Form, Modal, Row } from "react-bootstrap"

import { toCapitalLetter } from "../../utils"

export default function ItemInfoParticipant(props) {

    return (
 
        <Form className='form-padding'>
            {
                Object.keys(props.participant).map(function (key, index) {
                    return (
                        <Row key={index} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>{toCapitalLetter(key)}</Form.Label>
                                <Form.Control placeholder={props.participant[key]} disabled />
                            </Form.Group>
                        </Row>
                    )
                })
            }  
        </Form>

    )
}
