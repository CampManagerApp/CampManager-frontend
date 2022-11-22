import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as Icons from '../../design/icons'
import { IoPersonOutline } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { FaCampground } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
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
        setExpanded(false)
        if (is_superAdmin()) {
            navigate('/superadmin')
        } else {
            navigate('/login')
        }
    }

    function change_organisation() {
        setExpanded(false)
        navigate('listoforganisations', { replace: true })
    }


    return (
        <>
            <Navbar expanded={expanded} expand={false} onToggle={() => {
                setExpanded(expanded ? false : "expanded")
            }}>
                {/* <div className='navbar-brand'>
                    <img src={require('../../design/campmanager.png')} />{' '}
                    Camp Manager
                </div> */}
                <Navbar.Toggle />
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
                        <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><IoPersonOutline />{" "}My profile</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><BiTask />{" "}My tasks</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><AiFillHome />{" "}My home</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><FaCampground />{" "}My campaigns</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><CgOrganisation />{" "}My organisations</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Nav.Link onClick={change_organisation}><CgArrowsExchangeAlt />{" "}Change organisation</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Header>
                        {!is_unAuthenticated() ?
                            <Nav.Link onClick={logout}><Icons.Logout />{" "}Logout</Nav.Link> : ''
                        }
                    </Offcanvas.Header>
                </Navbar.Offcanvas>
            </Navbar>
        </>
    )
}