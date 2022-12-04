import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as image from "../../design/images.js";
import { useTranslation } from "react-i18next";
import './OrganisationPageForm.css'
import { useContext } from "react";
import { UserStatusContext } from "../../context/UserStatusContext";

/* Para que tenga 0 padding la lista px-0 py-0*/
export default function OrganistationPageForm() {
    const { t, i18n } = useTranslation('common');
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const navigate = useNavigate()
    const { currentOrganisation } = useContext(UserStatusContext)
    function goto_campaings_list() {
        navigate('/organisation/campaings');
    }

    function goto_members_list() {
        navigate('/admin/organisationusers');
    }
    return (
        <div className="div-all scrollable-content">
            <div>
                <ProfilePage profileName={currentOrganisation.name} profileImg={image.hikingProf} profileNick="Nick de ejemplo" backgroundImg={image.backgroundOrg} idVisible={idVisible} />
            </div>
            <div className="list">
                <Col className="list-group">

                    <Row className="list-group-item justify-content-between align-items-center px-0 py-0 " onClick={goto_campaings_list}>
                        <div className="list-image" >
                            <p className="overlay-text">{t('ORGANISATION_PAGE.CAMPAIGNS')}</p>
                            <img src={require('../../design/nophotoimg.jpg')} className="image-list" />
                        </div>
                    </Row>
                    <Row className="list-group-item justify-content-between align-items-center  px-0 py-0 " onClick={goto_members_list}>
                        <div className="list-image">
                            <p className="overlay-text">{t('ORGANISATION_PAGE.MEMBERS')}</p>
                            <img src={require('../../design/nophotoimg.jpg')} className="image-list" />
                        </div>
                    </Row>
                    <Row className="list-group-item justify-content-between align-items-center  px-0 py-0 " onClick={()=>{}}>
                        <div className="list-image">
                            <p className="overlay-text">{t('ORGANISATION_PAGE.SOCIAL_PAGE')}</p>
                            <img src={require('../../design/nophotoimg.jpg')} className="image-list" />
                        </div>
                    </Row>
                </Col>
            </div>
        </div>
    )
}