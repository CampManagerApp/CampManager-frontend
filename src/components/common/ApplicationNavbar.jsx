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
    const [expanded, setExpanded] = useState(false);

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
            <Navbar expanded={expanded} expand={false}className="mb-3">
                    <div className='navbar-brand'>
                        <img src={require('../../design/campmanager.png')} />{' '}
                        Camp Manager
                    </div>
                    <Navbar.Toggle onClick={() => setExpanded(expanded ? true : "expanded")}/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expanded}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expanded}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expanded}`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><CgProfile/>{" "}My profile</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><GrTask/>{" "}My tasks</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")} href="#action1"><GiForestCamp/>{" "}My campaigns</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><VscOrganization/>{" "}My organisations</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header >
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><CgArrowsExchangeAlt/>{" "}Change organisation</Nav.Link>
                        </Offcanvas.Header>
                        <Offcanvas.Header>
                        {!is_unAuthenticated() ?
                            <Nav.Link onClick={logout}><Icons.Logout/>{" "}Logout</Nav.Link>:''
                        }
                        </Offcanvas.Header>
                        </Navbar.Offcanvas>
            </Navbar>
        </div>
    )
}