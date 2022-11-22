import React, { useContext } from "react"
import BannerImage from "../../../components/common/BannerImage"
import ProfilePage from "../../../components/common/ProfilePage"
import TitlePage from "../../../components/common/TitlePage"
import ItemList from "../../../components/lists/ItemList"
import { organisationContex } from "../../../context/OrganisationContex"
import { UserOrganisationsContex } from "../../../context/UserOrganisationsContex"
import { UserStatusContext } from "../../../context/UserStatusContext"


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
    const imagenPerfil = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
    const imagenFondo = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"

    
    return (
        <React.Fragment>
            <BannerImage bannerImage={imagenFondo}/>
            <TitlePage>Campaigns</TitlePage>
            <ItemList items={get_campaings_list(currentOrganisation.id)} template={CampaingContent}/>
        </React.Fragment>
    )
}