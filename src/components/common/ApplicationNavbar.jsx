import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import * as Icons from '../../design/icons'

export default function ApplicationNavbar() {
    const navigate = useNavigate()

    function logout() {
        navigate('/admin')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><img src={require('../../design/campmanager.png')} />{' '}
                    Camp Manager
                </Navbar.Brand>
                <Nav className="container-fluid">
                    {/* <Nav.Link className='ms-auto' href="#pricing">Loggout</Nav.Link> */}
                    <Button variant="dark" className="ms-auto" onClick={logout}>
                        Logout <Icons.Logout/>
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    )
}