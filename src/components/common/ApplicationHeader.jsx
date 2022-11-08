import { Container } from "react-bootstrap";
import ApplicationNavbar from "./ApplicationNavbar";
import './ApplicationHeader.css'
import BackPage from "./BackPage";

export default function ApplicationHeader() {
    return (
        <div>
            <div className="application-header">
                <Container>
                    <ApplicationNavbar />
                </Container>
            </div>
            <Container>
                <BackPage />
            </Container>
        </div>
    )
}