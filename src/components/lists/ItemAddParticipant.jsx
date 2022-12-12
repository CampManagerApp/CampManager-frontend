import { useEffect } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"

import * as Icons from "../../design/icons"
import { useState } from "react"


export default function ItemAddParticipant({ handleSubmit = () => { } }) {
    const [form, setForm] = useState({})

    function onUpdate(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Form className='p-3 p-sm-3 rounded h-100' noValidate onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleSubmit(form)
        }}>
            <Form.Group className="mb-3" as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={onUpdate} placeholder="Put the name" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control onChange={onUpdate} placeholder="Put the full name" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control onChange={onUpdate} placeholder="Put the country" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="phoneNumberOne">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control onChange={onUpdate} placeholder="Put phone number" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="contactEmailOne">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control onChange={onUpdate} placeholder="Put the email" />
            </Form.Group>

            <Row>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                        Add <Icons.AddUser />
                    </Button>
                </div>
            </Row>
        </Form>

    )
}