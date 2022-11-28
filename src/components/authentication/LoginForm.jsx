import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import {useTranslation} from "react-i18next";
import * as Icons from '../../design/icons.js'
import './LoginForm.css'

export default function LoginForm ({handleSubmit}) {

    const [form, setForm] = useState({})

    function onUpdate(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }
    const {t, i18n} = useTranslation('common');

    return (
        <div className='login-form'>
            <h3 className='login-form-title'>Login</h3>
            <Form className='p-5 p-sm-3 rounded' noValidate onSubmit={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleSubmit(form)
            }}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={onUpdate} type="email" placeholder={t('LOGIN.ENTER_EMAIL')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onUpdate} type="password" placeholder="Password" />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                    Submit <Icons.Login/>
                    </Button>
                </div>
            </Form>
        </div>
    )
}