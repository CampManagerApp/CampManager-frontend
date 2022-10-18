import Form from 'react-bootstrap/Form';
import '../../index.js'
import './RegisterForm.css';

import * as Icons from '../../design/icons.js'

const state = {
    contra: "",
    repContra: ""
};

/*function onSubmit  (event)  {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target[5].value);
    console.log(event);
};*/ 

export default function RegisterForm ({handleSubmit}) {   

    return (
        <div className='register-form'>
            <h3 className='register-form-title'>Register</h3>
            <Form className='p-5 p-sm-3 rounded' noValidate onSubmit={handleSubmit} >

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="username" placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="username" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="username" placeholder="Enter last name" />
                </Form.Group>

                 <Form.Group className="mb-3" controlId="formUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        ref={ref => { state.contra = ref; }}
                        type="password" placeholder="Password" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control 
                         type="password" placeholder="Repeat Password" 
                    />
                </Form.Group>

                <div className="d-grid gap-2 ">
                    <button type="submit" className="btn btn-primary">
                    Submit <Icons.Login/>
                    </button>
                </div>
            </Form>
        </div>
    )
}