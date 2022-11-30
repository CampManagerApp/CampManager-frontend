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
import { HiLanguage } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserStatusContext, USER_STATUS } from '../../context/UserStatusContext';
import './ApplicationNavbar.css'
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ApplicationNavbar() {
    const { t, i18n } = useTranslation('common');
    const navigate = useNavigate()
    const { update_state, is_unAuthenticated, is_superAdmin, is_user,set_language } = useContext(UserStatusContext)
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
    function changeLanguageCa(){
        set_language("ca")
    }
    function changeLanguageEn(){
        set_language("en")
    }
    function changeLanguageEs(){
        set_language("es")
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
                    <Offcanvas.Header bsPrefix='navbar-header' closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expanded}`}>
                            <Container>{t('NAVBAR.MENU')}</Container>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><IoPersonOutline />{" "}{t('NAVBAR.PROFILE')}</Nav.Link>
                        </Container>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><BiTask />{" "}{t('NAVBAR.TASKS')}</Nav.Link>
                        </Container>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><AiFillHome />{" "}{t('NAVBAR.HOME')}</Nav.Link>
                        </Container>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><FaCampground />{" "}{t('NAVBAR.CAMPAIGNS')}</Nav.Link>
                        </Container>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Nav.Link onClick={() => setExpanded(expanded ? false : "expanded")}><CgOrganisation />{" "}{t('NAVBAR.ORGANISATIONS')}</Nav.Link>
                        </Container>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Nav.Link onClick={change_organisation}><CgArrowsExchangeAlt />{" "}{t('NAVBAR.CHANGE_ORGANISATION')}</Nav.Link>
                        </Container>
                    </Offcanvas.Header>
                    <Offcanvas.Header >
                        <Container>
                            <Row xs="auto">
                                <Col>
                                    <Nav.Link className="ms-auto"><HiLanguage />{" "}{t('NAVBAR.LANGUAGE')}</Nav.Link>
                                </Col>
                                <Col>
                                    <Form.Select size="sm">
                                        <option value="EN" onClick={changeLanguageEn}>🇬🇧&emsp;EN</option>
                                        <option value="ES" onClick={changeLanguageEs}>🇪🇸&emsp;ES</option>
                                        <option value="CA" onClick={changeLanguageCa}>🇪🇸&emsp;CA</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Container>

                    </Offcanvas.Header>
                    <Offcanvas.Header>
                        <Container>
                            {!is_unAuthenticated() ?
                                <Nav.Link onClick={logout}><Icons.Logout />{" "}Logout</Nav.Link> : ''
                            }
                        </Container>
                    </Offcanvas.Header>
                </Navbar.Offcanvas>
            </Navbar>
        </>
    )
}