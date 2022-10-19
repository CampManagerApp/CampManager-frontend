import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react';

export default function OrganistationForm({onSubmit, onCancel, form_values = {}, isUpdate=false}) {
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


    function put_placeholder(field, default_placeholder) {
        return field in form ? form[field] : default_placeholder
    }

    return (
        <div className='container'>
            <Form onSubmit={(event) => {
                event.preventDefault();
                onSubmit(form)
            }}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Organisation Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" placeholder={put_placeholder("name", "Organisation Name")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="admin">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" placeholder={put_placeholder("admin", "Admin Name")} />
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