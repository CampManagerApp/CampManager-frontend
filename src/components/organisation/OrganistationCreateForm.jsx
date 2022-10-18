import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';

import { useState } from 'react';

export default function OrganistationCreateForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({})


    function onUpdate(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    function cancel() {
        setForm({})
        onCancel()
    }

    return (
        <div className='container'>
            <Form onSubmit={(event) => {
                event.preventDefault();
                onSubmit(form)
            }}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" placeholder="Organisation Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="admin">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" placeholder="Admin name" />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                        Create
                    </Button>
                    <Button variant="danger" className="btn btn-primary" onClick={cancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}