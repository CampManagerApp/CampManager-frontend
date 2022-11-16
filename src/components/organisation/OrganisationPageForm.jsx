import React from "react";
import ProfilePage from "../../components/common/ProfilePage";

export default function OrganistationPageForm(){
    const imagenPerfil = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
    const imagenFondo = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
    
    return(
        <React.Fragment>
            <ProfilePage profileName="Perfil de ejemplo" profileImg={imagenPerfil} profileNick="Nick de ejemplo" backgroundImg={imagenFondo}/> 

            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="list-image">
                        <p className='relative-text'>{}</p> 
                        <img src={require('../../design/nophotoimg.png')} class="img-fluid" />
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="list-image">
                        <p className='relative-text'>{}</p> 
                        <img src={require('../../design/nophotoimg.png')} class="img-fluid" />
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">  
                    <div className="list-image">
                        <p className='relative-text'>{}</p> 
                        <img src={require('../../design/nophotoimg.png')} class="img-fluid" />
                    </div>
                </li>
            </ul>
      </React.Fragment>
    )
}