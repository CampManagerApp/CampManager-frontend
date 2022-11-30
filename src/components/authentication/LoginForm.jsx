import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Icons from '../../design/icons.js'
import './LoginForm.css'

export default function LoginForm({ showInvalidMessage, handleSubmit }) {

    const { t, i18n } = useTranslation('common');
    const [form, setForm] = useState({})

    function onUpdate(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className='login-form'>
            <h3 className='login-form-title'>{t('LOGIN.TITLE')}</h3>
            <Form className='p-5 p-sm-3 rounded h-100' noValidate onSubmit={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleSubmit(form)
            }}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>{t('LOGIN.EMAIL_ADDRESS')}</Form.Label>
                    <Form.Control onChange={onUpdate} type="email" placeholder={t('LOGIN.EMAIL_ADDRESS_PLACEHOLDER')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>{t('LOGIN.PASSWORD')}</Form.Label>
                    <Form.Control onChange={onUpdate} type="password" placeholder={t('LOGIN.PASSWORD_PLACEHOLDER')} />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    {showInvalidMessage ? <p class="text-danger">{t('LOGIN.ERROR')}</p> : ''}
                    <Button type="submit" className="btn btn-primary">
                    {t('LOGIN.SUBMIT')} <Icons.Login />
                    </Button>
                </div>
            </Form>
        </div>
    )
}