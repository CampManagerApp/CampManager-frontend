import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

import './AdminPage.css'


function AdminNavbar() {
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

function OrganizationList() {
    return (
        <ListGroup>
                <ListGroup.Item>No style</ListGroup.Item>
                <ListGroup.Item variant="primary">Primary</ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                    Secondary
                </ListGroup.Item>
                <ListGroup.Item action variant="success">
                    Success
                </ListGroup.Item>
                <ListGroup.Item action variant="danger">
                    Danger
                </ListGroup.Item>
                <ListGroup.Item action variant="warning">
                    Warning
                </ListGroup.Item>
                <ListGroup.Item action variant="info">
                    Info
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                    Light
                </ListGroup.Item>
                <ListGroup.Item action variant="dark">
                    Dark
                </ListGroup.Item>
        </ListGroup>
    )
}

function OrganizationTableList() {
    return (
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className='table table-bordered mb-0'>
                <thead >
                <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody >
                    {Array.from(Array(50)).map((x, i) => {
                        return(
                            <tr key={i}>
                                <td>{i}</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
  }

export default function AdminPage() {
    return (
        <div>
            <AdminNavbar />
            {/* <OrganizationList /> */}
            <OrganizationTableList />
        </div>

    )
} 