import { useEffect } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"

import { toCapitalLetter } from "../../utils"
import * as Icons from "../../design/icons"
import { useContext } from "react"
import { UserStatusContext } from "../../context/UserStatusContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ItemAddParticipant(props) {
    const [form, setForm] = useState({})
    const [parts, setParticipants] = useState([])
    const {get_current_participantsAdd, set_current_participantsAdd} = useContext(UserStatusContext)
    const navigate = useNavigate()
    function onUpdate(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }
    useEffect(()=> {
        setParticipants(get_current_participantsAdd())
    },)
    
    function handleSubmit(form) {   
        parts.push(form)
        set_current_participantsAdd(parts) 
    }

    return (
 
        <Form className='p-5 p-sm-3 rounded h-100' noValidate onSubmit={(e) => {
                e.stopPropagation()
                e.preventDefault()
                
                handleSubmit(form)
                navigate(-1)
            }}>
                {
                Object.keys(props.participants).map(function (key, index) {
                    return (
                        <Row key={index} className="mb-3">
                            <Form.Group as={Col} controlId={key}>
                                <Form.Label>{toCapitalLetter(props.participants[key])}</Form.Label>
                                <Form.Control onChange={onUpdate} placeholder={props.participants[key]} />
                            </Form.Group>
                        </Row>
                    )
                })
                }

                <div className="d-grid gap-2 " style={{paddingBottom:50+'px'}}>
                    <Button type="submit" className="btn btn-primary">
                    Add <Icons.AddUser />
                    </Button>
                </div>
            </Form>

    )
}