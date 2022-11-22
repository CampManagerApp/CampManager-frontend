import React, { useContext } from "react"
import BannerImage from "../../../components/common/BannerImage"
import ProfilePage from "../../../components/common/ProfilePage"
import TitlePage from "../../../components/common/TitlePage"
import ItemList from "../../../components/lists/ItemList"
import { organisationContex } from "../../../context/OrganisationContex"
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
    
    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrgList}/>
            <TitlePage>Campaings</TitlePage>
            <ItemList items={get_campaings_list()} template={CampaingContent}/>
        </React.Fragment>
    )
}