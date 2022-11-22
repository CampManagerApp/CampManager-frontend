import { Col, Container, Row } from "react-bootstrap";
import ApplicationNavbar from "./ApplicationNavbar";
import './ApplicationHeader.css'
import BackPage from "./BackPage";

export default function ApplicationHeader() {
    return (
        // <div>
            <div className="application-header">
                <Container>
                    <Row>
                        <Col xs={2} className='d-flex align-items-center'>
                            <BackPage />
                        </Col>
                        <Col className="d-flex align-items-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-2"><img src={require('../../design/campmanager.png')} />{' '}</div>
                                    <div className="col"><h4>CampManager</h4></div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={1} className="d-flex justify-content-end">
                            <ApplicationNavbar />
                        </Col>
                    </Row>
                </Container>
            </div>
        // </div>
    )
}