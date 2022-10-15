import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import './LoginForm.css'

export default function LoginForm ({handleSubmit}) {
    return (
        <div className='login-form'>
            <h3 className='login-form-title'>Login</h3>
            <Form className='p-5 p-sm-3 rounded' noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                    Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}