import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import { Button, Col, Container, Row } from 'react-bootstrap';
import ItemList from '../../components/lists/ItemList';
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";

import './CampParticipantsPage.css'
import { useContext } from "react";

/* Para que tenga 0 padding la lista px-0 py-0*/
export default function CampParticipantsPage(){
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const navigate = useNavigate()
    const { currentCamp } = useContext(UserStatusContext)
    function submitParticipants(){
        navigate('/camp/participants/list');
    }
    function submitCounsellors(){
        navigate('/camp/counsellors/list');
    }
    return(
        <div className="div-page">
            <div>
                <ProfilePage profileName={currentCamp.name} profileImg={image.backgroundOrg} profileNick="Participants" backgroundImg={image.backgroundOrg}  includeProfileImage={includeProfileImage} /> 
            </div>
            <div className="list">
                <Col className="list-group"> 

                    <Row className="list-group-item justify-content-between align-items-center px-0 py-0 " onClick={submitParticipants}>
                        <div className="list-image" >
                            <p className="overlay-text">Participants</p> 
                            <img src={require('../../design/nophotoimg.jpg')} className="himage-list"  />
                        </div>
                    </Row>
                    <Row className="list-group-item justify-content-between align-items-center px-0 py-0 " onClick={submitCounsellors} >
                        <div className="list-image">
                            <p className="overlay-text">Counsellors</p> 
                            <img src={require('../../design/nophotoimg.jpg')} className="himage-list" />
                        </div>
                    </Row>               
                </Col>
            </div>
      </div>
    )
}