import Form from 'react-bootstrap/Form';
import '../../index.js'
import './RegisterForm.css';
import { useTranslation } from "react-i18next";
import * as Icons from '../../design/icons.js'

const state = {
    contra: "",
    repContra: ""
};

export default function RegisterForm ({handleSubmit}) {   
    const { t, i18n } = useTranslation('common');
    return (
        <div className='register-form'>
            <h3 className='register-form-title'>{t('REGISTER_FORM.TITLE')}</h3>
            <Form className='p-5 p-sm-3 rounded' noValidate onSubmit={handleSubmit} >

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>{t('REGISTER_FORM.NAME')}</Form.Label>
                    <Form.Control type="username" placeholder={t('REGISTER_FORM.NAME_PLACEHOLDER')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>{t('REGISTER_FORM.FIRST_NAME')}</Form.Label>
                    <Form.Control type="username" placeholder={t('REGISTER_FORM.FIRST_NAME_PLACEHOLDER')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>{t('REGISTER_FORM.LAST_NAME')}</Form.Label>
                    <Form.Control type="username" placeholder={t('REGISTER_FORM.LAST_NAME_PLACEHOLDER')} />
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formUser">
                    <Form.Label>{t('REGISTER_FORM.USERNAME')}</Form.Label>
                    <Form.Control type="username" placeholder={t('REGISTER_FORM.USERNAME_PLACEHOLDER')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t('REGISTER_FORM.EMAIL_ADDRESS')}</Form.Label>
                    <Form.Control type="email" placeholder={t('REGISTER_FORM.EMAIL_ADDRESS_PLACEHOLDER')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{t('REGISTER_FORM.PASSWORD')}</Form.Label>
                    <Form.Control
                        ref={ref => { state.contra = ref; }}
                        type="password" placeholder={t('REGISTER_FORM.PASSWORD_PLACEHOLDER')} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>{t('REGISTER_FORM.REPEAT_PASSWORD')}</Form.Label>
                    <Form.Control 
                         type="password" placeholder={t('REGISTER_FORM.REPEAT_PASSWORD_PLACEHOLDER')}/>
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <button type="submit" className="btn btn-primary">{t('REGISTER_FORM.SUBMIT_BUTTON')}<Icons.Login/>
                    </button>
                </div>
            </Form>
        </div>
    )
}