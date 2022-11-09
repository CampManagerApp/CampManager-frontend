import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as Icons from '../../design/icons'

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserStatusContext, USER_STATUS } from '../../context/UserStatusContext';
import BackPage from './BackPage';


export default function ApplicationNavbar() {
    const navigate = useNavigate()
    const { update_state, is_unAuthenticated, is_superAdmin, is_user } = useContext(UserStatusContext)
    const [expand, setExpand] = useState('sm')

    function logout() {
        window.sessionStorage.removeItem("token")
        update_state(USER_STATUS.UNAUTHENTICATED)
        if (is_superAdmin()) {
            navigate('/superadmin')
        } else {
            navigate('/login')
        }
        setExpand(true)
    }


    return (
        <div>
            <Navbar expand={expand} className="mb-3">
                <Container>
                    <div className='navbar-brand'>
                        <img src={require('../../design/campmanager.png')} />{' '}
                        Camp Manager
                    </div>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="container-fluid" closeButton>
                                {/* <Nav.Link className='ms-auto' href="#pricing">Loggout</Nav.Link> */}
                                {!is_unAuthenticated() ?
                                    <Button variant="dark" className="ms-auto" onClick={logout}>
                                        Logout <Icons.Logout />
                                    </Button> : ''
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}