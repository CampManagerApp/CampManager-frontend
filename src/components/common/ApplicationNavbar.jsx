import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as Icons from '../../design/icons'
import { CgProfile } from "react-icons/cg";
import { GrTask } from "react-icons/gr";
import { GiForestCamp } from "react-icons/gi";
import { VscOrganization } from "react-icons/vsc";
import { CgArrowsExchangeAlt } from "react-icons/cg";
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
        setExpand('sm')
    }

    return (
        <div>
            <Navbar expand={expand} className="mb-3">
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
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link href="#action1"><CgProfile/>{" "}My profile</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link href="#action1"><GrTask/>{" "}My tasks</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link href="#action1"><GiForestCamp/>{" "}My campaigns</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link href="#action1"><VscOrganization/>{" "}My organisations</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link href="#action1"><CgArrowsExchangeAlt/>{" "}Change organisation</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="container-fluid">
                                {/* <Nav.Link className='ms-auto' href="#pricing">Loggout</Nav.Link> */}
                                {!is_unAuthenticated() ?
                                    <Button variant="dark" className="ms-auto" onClick={logout}>
                                        Logout <Icons.Logout />
                                    </Button> : ''
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
            </Navbar>
        </div>
    )
}