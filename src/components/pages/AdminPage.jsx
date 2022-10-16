import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import './AdminPage.css'


function AdminNavbar() {

    const navigate = useNavigate()

    function logout() {
        navigate('/admin')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Camp Manager</Navbar.Brand>
            <Nav className="container-fluid">
                {/* <Nav.Link className='ms-auto' href="#pricing">Loggout</Nav.Link> */}
                <Button  variant="dark" className="ms-auto" onClick={logout}>
                Logout
                </Button>
            </Nav>
            </Container>
      </Navbar>
    )
}

function OrganizationTableList(){
    return(
    <div className='container '>
    <div className="table-jordi">
        <table className="table table-hover" id="job-table">
            <thead>
                <tr className="text-center">
                <th scope="col"  >Number</th>
                <th scope="col" >Organization Name</th>
                <th scope="col" >ID</th>
                <th scope="col" >Admin</th>
                <th scope="col" >Actions</th>
                </tr>
            </thead>
      <tbody className="text-center tableBody">
        {Array.from(Array(50)).map((x, i) => {
            return(
            <tr key={i}>
                <th scope="row">{i}</th>
                <td>AMELL</td>
                <td>478900E</td>
                <td>Alejandro Clavera</td>
                <td>
                    <Button type="button" className="btn btn-danger">Delete</Button>
                    <Button type="button" className="btn btn-primary">Edit</Button>
                </td>
                </tr>
                )})}
      </tbody>
    </table>
  </div>
    <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-primary">Add</button>
    </div>
  </div>
    
    );
}

export default function AdminPage() {
    return (
        <div>
            <AdminNavbar />
            <div className='container page-header'>
                <h3>Organisations panel</h3>
                <hr />
            </div>
            <OrganizationTableList />
        </div>
    )
} 