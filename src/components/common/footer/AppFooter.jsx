import { CgOrganisation } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { isPlatform } from '@ionic/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './AppFooter.css'

const DISABLED_LOCATIONS = [
    '/login',
    '/listoforganisations',
    '/listoforganisations/',
    '/user/listoforganisations/add/',
]

export default function AppFooter() {
    const navigate = useNavigate()
    const location = useLocation()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(!DISABLED_LOCATIONS.includes(location.pathname))
    }, [location])

    return (
        <div className='footerStyle' style={{ paddingBottom: isPlatform('ios') ? '3vh' : 'none' }}>
            {visible ?
                <Navbar expand="lg">
                    <Container className="justify-content-center">
                        <Nav.Link onClick={() => navigate('/listoforganisations', { relative: false })} className='navlink-left'><CgOrganisation /></Nav.Link>
                        <Nav.Link ><AiFillHome /></Nav.Link>
                        <Nav.Link className='navlink-right'><CgProfile /></Nav.Link>
                    </Container>
                </Navbar>
                : ''
            }

        </div>
    );
}