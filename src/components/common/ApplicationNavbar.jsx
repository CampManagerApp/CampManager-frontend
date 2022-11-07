import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import * as Icons from '../../design/icons'

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserStatusContext, USER_STATUS } from '../../context/UserStatusContext';


export default function ApplicationNavbar() {
    const navigate = useNavigate()
    const { update_state, is_unAuthenticated, is_superAdmin, is_user } = useContext(UserStatusContext)

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
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><img src={require('../../design/campmanager.png')} />{' '}
                        Camp Manager
                    </Navbar.Brand>
                    <Nav className="container-fluid">
                        {/* <Nav.Link className='ms-auto' href="#pricing">Loggout</Nav.Link> */}
                        {!is_unAuthenticated() ?
                            <Button variant="dark" className="ms-auto" onClick={logout}>
                                Logout <Icons.Logout />
                            </Button> : ''
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}