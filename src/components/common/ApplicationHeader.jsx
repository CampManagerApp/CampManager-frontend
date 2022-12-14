import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPlatform } from '@ionic/react';
import { useTranslation } from "react-i18next";

import ApplicationNavbar from "./ApplicationNavbar";
import './ApplicationHeader.css'
import BackPage from "./BackPage";

const DISABLED_LOCATIONS = [
    '/login',
    '/listoforganisations',
    '/listoforganisations/',
    '/organisation',
    '/superadmin',
    '/superadmin/panel'
]

export default function ApplicationHeader() {
    const { t, i18n } = useTranslation('common');
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        setVisible(!DISABLED_LOCATIONS.includes(location.pathname))
    }, [location])

    return (
        <div className="application-header">
            <Container className={isPlatform('ios') ? 'ios-header' : null}>
                <Row>
                    {visible &&
                        <Col xs={2} className='d-flex align-items-center'>
                            <BackPage />
                        </Col>
                    }
                    <Col className="d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-2"><img src={require('../../design/campmanager.png')} />{' '}</div>
                                <div className="col"><h4>{t('HEADER.TITLE')}</h4></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={1} className="d-flex justify-content-end">
                        <ApplicationNavbar />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}