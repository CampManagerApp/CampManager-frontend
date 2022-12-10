import React, { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Container } from "react-bootstrap"
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
    const { get_campaings_list, create_campaign, delete_campaign, update_campaign } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)
    const { set_current_camp } = useContext(UserStatusContext)
    const navigate = useNavigate()

    useEffect(() => {
        loadCampaigns()
    }, [])

    function loadCampaigns() {
        // const { id } = get_current_organisation()
        const id = 2
        get_campaings_list(id).then((campaigns_list) => {
            setCampaings(campaigns_list)
        })
    }

    function CampaignClick(item) {
        set_current_camp(item)
        navigate('/camp')
    }

    async function addCampaign() {
        //const { id } = get_current_organisation()
        // const id = 2
        // create_campaign(id, "Test", "10-7-2022 09:00:00", "24-7-2022 17:00:00").then(() => {
        //     loadCampaigns()
        // })
        navigate('/admin/createcampaign')
    }

    async function deleteCampaign() {
        //const { id } = get_current_organisation()
        const id = 2
        delete_campaign(id, "Test").then(() => {
            loadCampaigns()
        })
    }

    async function updateCampaign() {
        //const { id } = get_current_organisation()
        const id = 2
        updateCampaign(id, "Test", "").then(() => {
            loadCampaigns()
        })
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>Campaigns</TitlePage>
            <Container>
                <Button onClick={addCampaign}>+</Button>
                <Button onClick={deleteCampaign} >-</Button>
                <ItemList items={campaings} template={CampaingContent} onClickItem={CampaignClick} />
            </Container>
        </React.Fragment>
    )
}