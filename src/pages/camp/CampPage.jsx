import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import { Button, Col, Container, Row } from 'react-bootstrap';
import ItemList from '../../components/lists/ItemList';

import './CampPage.css'
import { useContext } from "react";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images.js";

/* Para que tenga 0 padding la lista px-0 py-0*/
export default function CampPage(){
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const navigate = useNavigate()
    const { currentCamp } = useContext(UserStatusContext)

    function submit(){
        //navigate('/listoforganisations/');
        navigate('/camp/participants/list/add');
    }
    function participants(){
        navigate('/camp/participants/');
    }
    function tables(){
        navigate('/camp/tables/');
    }
    return(
        <div className="div-page scrollable-content">
            <div>
                <ProfilePage profileName={currentCamp.campaignName} profileNick={currentCamp.startDate + " - " + currentCamp.endDate} backgroundImg={image.backgroundOrgList}  includeProfileImage={includeProfileImage} /> 
            </div>
            <div className="list">
                <Col className="list-group"> 

                    <Row className="list-group-item justify-content-between align-items-center px-0 py-0 " onClick={participants}>
                        <div className="list-image" >
                            <p className="overlay-text">Participants</p> 
                            <img src={image.Participants} className="himage-list"  />
                        </div>
                    </Row>
                    <Row className=" list-group-horizontal  px-0 py-0 div-row" >
                        <Col className="list-group-item justify-content-between align-items-center  px-0 py-0 "  onClick={tables}>
                            <div className="list-image">
                                <p className="overlay-text">Tables</p> 
                                <img src={image.TablesButton} className="vimage-list" />
                            </div>
                        </Col>
                        <Col className="list-group-item justify-content-between align-items-center  px-0 py-0 " onClick={submit}>  
                            <div className="list-image">
                                <p className="overlay-text">Activities</p> 
                                <img src={image.ActivitiesButton} className="vimage-list" />
                            </div>
                        </Col>
                    </Row>               
                </Col>
            </div>
      </div>
    )
}