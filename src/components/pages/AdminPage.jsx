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

function OrganizationTableList(){
    return(
        <div class="container py-5">
            <div class="row">
                <div class="col-12 mx-auto bg-white rounded shadow">
                    <div class="table-responsive">
                        <table class="table table-fixed">
                            <thead>
                                <tr class="text-center">
                                    <th scope="col" class="col-3">Number</th>
                                    <th scope="col" class="col-3">Organization Name</th>
                                    <th scope="col" class="col-3">ID</th>
                                    <th scope="col" class="col-3">Admin</th>
                                    {/* <th scope="col" class="col-3">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                {Array.from(Array(20)).map((x, i) => {
                                    return(
                                    <tr key={i}>
                                        <th scope="row" class="col-3">{i}</th>
                                        <td class="col-3"  >AMELL</td>
                                        <td class="col-3"  >478900E</td>
                                        <td class="col-3"  >Alejandro Clavera</td>
                                        {/* <td class="col-3"  >Alejandro Clavera</td> */}
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Jordi(){
    return(
    <div class="table-jordi">
        <table class="table table-hover" id="job-table">
            <thead>
                <tr class="text-center">
                <th scope="col"  >Number</th>
                <th scope="col" >Organization Name</th>
                <th scope="col" >ID</th>
                <th scope="col" >Admin</th>
                <th scope="col" >Actions</th>
                </tr>
            </thead>
      <tbody class="text-center tableBody">
        {Array.from(Array(20)).map((x, i) => {
            return(
            <tr key={i}>
                <th scope="row">{i}</th>
                <td>AMELL</td>
                <td>478900E</td>
                <td>Alejandro Clavera</td>
                <td>
                    <button type="button" class="btn btn-danger">Delete</button>
                    <button type="button" class="btn btn-primary">View</button>
                </td>
                </tr>
                )})}
      </tbody>
    </table>
  </div>

    );
}

export default function AdminPage() {
    return (
        <div>
            <AdminNavbar />
            <OrganizationTableList />
            <Jordi />
        </div>

    )
} 