import ProfilePage from "../../components/common/ProfilePage";
import ProfileInformation from "../../components/user/ProfileInformation";
import './ProfileUserPage.css'
import * as image from "../../design/images"

export default function(){
    const idVisible = 'hidden';
    return(
        
    <div className="scrollable-content">
        <ProfilePage ProfilePage profileName="Perfil de ejemplo" profileImg={image.profileImg} profileNick="Nick de ejemplo" backgroundImg={image.hiking} idVisible={idVisible} ></ProfilePage>
        <ProfileInformation></ProfileInformation>
    </div>
    );
}