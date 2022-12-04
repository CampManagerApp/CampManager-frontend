import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

export default function OrganisationForm({onSubmit, onCancel, form_values = {}, isUpdate=false}) {
    const [form, setForm] = useState({})
    const { t, i18n } = useTranslation('common');


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
                    <Form.Label>{t('ORGANISATION_EDIT_INFO.ORGANISATION_NAME')}</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" value={getValue("name")} placeholder="Organisation Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="manager">
                    <Form.Label>{t('ORGANISATION_EDIT_INFO.MANAGER')}</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" value={getValue("manager")} placeholder="Manager name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>{t('ORGANISATION_EDIT_INFO.DESCRIPTION')}</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" value={getValue("description")} placeholder="Description" />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                        {Object.keys(form_values).length === 0 ? t('ORGANISATION_EDIT_INFO.CREATE_BUTTON') : t('ORGANISATION_EDIT_INFO.UPDATE_BUTTON')}
                    </Button>
                    <Button variant="danger" className="btn btn-primary" onClick={cancel}>
                    {t('ORGANISATION_EDIT_INFO.CANCEL_BUTTON')}
                    </Button>
                </div>
            </Form>
        </div>
    )
}