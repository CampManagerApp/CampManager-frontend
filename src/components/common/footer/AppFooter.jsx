import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { CgOrganisation } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import './Appfooter.css'

export default function AppFooter() {
    return (
        <Navbar expand="lg" className='application-header'>
            <Container className="justify-content-center">
                <Nav.Link className='test'><CgOrganisation/></Nav.Link>
                <Nav.Link ><AiFillHome/></Nav.Link>
                <Nav.Link className='test2'><CgProfile/></Nav.Link>
            </Container>
        </Navbar>
    );
}