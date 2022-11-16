import OrganisationPageForm from "../../components/organisation/OrganisationPageForm";
import ProfileInformation from "../../components/user/ProfileInformation";
import './ProfileUserPage.css'

export default function(){
    return(
    <div className="scrollable-content">
        <ProfileHeader></ProfileHeader>
        <ProfileInformation></ProfileInformation>
    </div>
    );
}