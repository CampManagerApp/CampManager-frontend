import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { CgOrganisation } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";

import './Appfooter.css'

export default function AppFooter() {
    return (
        <div className='jordi'>
        <Navbar expand="lg">
            <Container className="justify-content-center">
                <Nav.Link className='navlink-left'><CgOrganisation/></Nav.Link>
                <Nav.Link ><AiFillHome/></Nav.Link>
                <Nav.Link className='navlink-right'><CgProfile/></Nav.Link>
            </Container>
        </Navbar>
        </div>
    );
}