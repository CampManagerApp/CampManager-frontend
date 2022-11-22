import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import { Button, Col, Container, Row } from 'react-bootstrap';
import ItemList from '../../components/lists/ItemList';

import './OrganisationPageForm.css'

/* Para que tenga 0 padding la lista px-0 py-0*/
export default function OrganistationPageForm(){
    const imagenPerfil = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
    const imagenFondo = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const navigate = useNavigate()
    function goto_campaings_list(){
        navigate('/organisation/campaings');
    }
    function members(){
        navigate('/organisation/members/list');
    }
    
    return(
        <div className="div-all scrollable-content">
            <div>
                <ProfilePage profileName="Esplai Xino-Xano" profileImg={imagenPerfil} profileNick="Nick de ejemplo" backgroundImg={imagenFondo} idVisible={idVisible}/> 
            </div>
            <div className="list ">
                <Col className="list-group"> 

                    <Row className="list-group-item justify-content-between align-items-center px-0 py-0 " onClick={goto_campaings_list}>
                        <div className="list-image" >
                            <p className="overlay-text">Campaigns</p> 
                            <img src={require('../../design/nophotoimg.jpg')} className="image-list"  />
                        </div>
                    </Row>
                    <Row className="list-group-item justify-content-between align-items-center  px-0 py-0 "  onClick={members}>
                        <div className="list-image">
                            <p className="overlay-text">Members</p> 
                            <img src={require('../../design/nophotoimg.jpg')} className="image-list" />
                        </div>
                    </Row>
                    <Row className="list-group-item justify-content-between align-items-center  px-0 py-0 "  onClick={goto_campaings_list}>  
                        <div className="list-image">
                            <p className="overlay-text">Social Page</p> 
                            <img src={require('../../design/nophotoimg.jpg')} className="image-list" />
                        </div>
                    </Row>
                </Col>
            </div>
      </div>
    )
}