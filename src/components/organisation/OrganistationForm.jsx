import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react';

export default function OrganisationForm({onSubmit, onCancel, form_values = {}, isUpdate=false}) {
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

    useEffect(() => {
        setForm(form_values)
    }, [])


    function getValue(field) {
        return field in form ? form[field] : ''
    }

    return (
        <div className='container'>
            <Form onSubmit={(event) => {
                event.preventDefault();
                onSubmit(form)
            }}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Organisation Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" value={getValue("name")} placeholder="Organisation Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="manager">
                    <Form.Label>Manager</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" value={getValue("manager")} placeholder="Manager name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" value={getValue("description")} placeholder="Description" />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                        {Object.keys(form_values).length === 0 ? "Create" : "Update"}
                    </Button>
                    <Button variant="danger" className="btn btn-primary" onClick={cancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}