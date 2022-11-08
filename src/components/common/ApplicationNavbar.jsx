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
    const [expand, setExpand] = useState(false)

    function logout() {
        window.sessionStorage.removeItem("token")
        update_state(USER_STATUS.UNAUTHENTICATED)
        if (is_superAdmin()) {
            navigate('/superadmin')
        } else {
            navigate('/login')
        }
    }

    return (
        <div>
            <Navbar expand={expand}>
                <Container fluid>
                    <Navbar.Brand href="#">CampManager</Navbar.Brand>
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
                            

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}