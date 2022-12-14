import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { CgOrganisation } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { isPlatform } from '@ionic/react';

import './AppFooter.css'
import { useNavigate } from 'react-router-dom';

export default function AppFooter() {
    const navigate = useNavigate()
    return (
        <div className='footerStyle' style={{paddingBottom: isPlatform('ios') ? '5vh' : 'none'}}>
        <Navbar expand="lg">
            <Container className="justify-content-center">
                <Nav.Link onClick={() => navigate('/listoforganisations', {relative:false})} className='navlink-left'><CgOrganisation/></Nav.Link>
                <Nav.Link ><AiFillHome/></Nav.Link>
                <Nav.Link className='navlink-right'><CgProfile/></Nav.Link>
            </Container>
        </Navbar>
        </div>
    );
}