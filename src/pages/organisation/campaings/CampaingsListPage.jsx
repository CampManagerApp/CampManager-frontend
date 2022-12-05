import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import BannerImage from "../../../components/common/BannerImage"
import ProfilePage from "../../../components/common/ProfilePage"
import TitlePage from "../../../components/common/TitlePage"
import ItemList from "../../../components/lists/ItemList"
import { organisationContex } from "../../../context/OrganisationContex"
import { UserOrganisationsContex } from "../../../context/UserOrganisationsContex"
import { UserStatusContext } from "../../../context/UserStatusContext"
import * as image from "../../../design/images";

function CampaingContent({item}) {
    return (
        <div className="d-flex justify-content-center">
            {item.name}
        </div>
    )
    
}

export default function CampaingsListPage() {
    const { get_campaings_list } = useContext(organisationContex)
    const { currentOrganisation } = useContext(UserStatusContext)
    const { set_current_camp } = useContext(UserStatusContext)
    const navigate = useNavigate()
    function CampaignClick(item){
        set_current_camp(item)
        navigate('/camp')
    }
    
    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg}/>
            <TitlePage>Campaings</TitlePage>
            <ItemList items={get_campaings_list(currentOrganisation.id)} template={CampaingContent} onClickItem={CampaignClick} />
        </React.Fragment>
    )
}