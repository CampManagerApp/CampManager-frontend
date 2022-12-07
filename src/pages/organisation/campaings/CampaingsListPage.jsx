import React, { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import BannerImage from "../../../components/common/BannerImage"
import TitlePage from "../../../components/common/TitlePage"
import ItemList from "../../../components/lists/ItemList"
import { organisationContex } from "../../../context/OrganisationContex"
import { UserStatusContext } from "../../../context/UserStatusContext"
import * as image from "../../../design/images";

function CampaingContent({ item }) {
    return (
        <div className="d-flex justify-content-center">
            {item.campaignName}
        </div>
    )

}

export default function CampaingsListPage() {
    const [campaings, setCampaings] = useState([])
    const { get_campaings_list } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)
    const { set_current_camp } = useContext(UserStatusContext)
    const navigate = useNavigate()

    useEffect(() => {
        loadCampaigns()
    }, [])

    function loadCampaigns() {
        get_campaings_list(get_current_organisation().id).then((campaigns_list) => {
            setCampaings(campaigns_list)
        })
    }

    function CampaignClick(item) {
        set_current_camp(item)
        navigate('/camp')
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>Campaigns</TitlePage>
            <Container>
                <ItemList items={campaings} template={CampaingContent} onClickItem={CampaignClick} />
            </Container>
        </React.Fragment>
    )
}