import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageHeader from '../../PageHeader';
import OrganistationCreateForm from '../../organisation/OrganistationCreateForm';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrganisationList, deleteOrganisation, addOrganisation } from '../../../services/superadmin/getOrganisations';

import './SuperAdminPage.css'

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
                    <Button variant="dark" className="ms-auto" onClick={logout}>
                        Logout
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    )
}


function OrganisationForm({onSubmit , onCancel}) {
    const [form, setForm] = useState({})


    function onUpdate(e) {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    function cancel() {
        setForm({})
        onCancel()
    }

    return (
        <div className='container'>
            <Form onSubmit={(event) => {
                event.preventDefault();
                onSubmit(form)
            }}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" placeholder="Organisation Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="admin">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onUpdate} type="text" placeholder="Admin name" />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <Button type="submit" className="btn btn-primary">
                        Create
                    </Button>
                    <Button variant="danger" className="btn btn-primary" onClick={cancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}


function ListTable({ list, onDelete, onAdd }) {
    return (
        <div className='container '>
            <div className="scrollable-table">
                <table className="table table-hover" id="job-table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col"  >Index</th>
                            <th scope="col" >Organization Name</th>
                            <th scope="col" >ID</th>
                            <th scope="col" >Admin</th>
                            <th scope="col" >Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center tableBody">
                        {list.map((org, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i}</th>
                                    <td >{org.name}</td>
                                    <td>{org.id}</td>
                                    <td>{org.admin}</td>
                                    <td>
                                        <Button type="button" className="btn btn-danger" onClick={() => {
                                            onDelete(org.id)
                                        }}>Delete</Button>
                                        <Button type="button" className="btn btn-primary">Edit</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={() => {
                    onAdd()
                }}>Add</button>
            </div>
        </div>
    )
}

function OrganizationTableList() {

    const [organisations, setOrganisations] = useState([])
    const [update, setUpdate] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    function onSubmit(form) {
        //event.preventDefault();
        addOrganisation(form).then(() => {
            setShowAlert(false)
        })
    }

    function onCancel(form) {
        setShowAlert(false)
    }


    function showAddAlert() {
        setShowAlert(true)
    }

    useEffect(() => {
        if (!showAlert || update) {
            getOrganisationList()
                .then(orgs_list => setOrganisations(orgs_list))
                .catch(err => alert('Error'))
        }
        setUpdate(false)
    }, [update, showAlert])

    return (
        <div>
            {!showAlert ?
                <ListTable list={organisations} onAdd={showAddAlert} onDelete={(id) => {
                    deleteOrganisation(id)
                    setUpdate(true)
                }} /> 
                : <OrganistationCreateForm onSubmit={onSubmit} onCancel={onCancel} />}
        </div>
    );
}

export default function SuperAdminPage() {
    return (
        <div>
            <AdminNavbar />
            <PageHeader title="Organisation panel" />
            <OrganizationTableList />
        </div>
    )
} 