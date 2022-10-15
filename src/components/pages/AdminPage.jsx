import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function AdminPage() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Camp Manager</Navbar.Brand>
            <Nav className="container-fluid">
                {/* <Nav.Link className='ms-auto' href="#pricing">Loggout</Nav.Link> */}
                <Button  variant="dark" className="ms-auto">
                Logout
                </Button>
            </Nav>
            </Container>
      </Navbar>
    )
} 