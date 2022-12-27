import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { organisationContex } from "../../../context/OrganisationContex"
import { UserStatusContext } from "../../../context/UserStatusContext"
import { Button, Col, Container, Row } from "react-bootstrap"

import * as image from "../../../design/images"
import BannerImage from "../../../components/common/BannerImage"
import TitlePage from "../../../components/common/TitlePage"
import ItemList from "../../../components/lists/ItemList"


function CampaingContent({ item, onUpdate }) {
    return (
        <CampaignsAdminElement item={item} onUpdate={onUpdate} />
    )

}


function CampaignMemberElement({ item }) {
    return (
        <div className="d-flex justify-content-center">
            {item.campaignName}
        </div>
    )
}

function CampaignsAdminElement({ item, onUpdate }) {
    const navigate = useNavigate()
    const { delete_campaign } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)

    function deleteElement(e) {
        // stop click propagation
        e.preventDefault()
        e.stopPropagation()

        // delete campaign
        const { id } = get_current_organisation()
        delete_campaign(id, item.campaignName).then(() => {
            onUpdate()
        })
    }

    return (
        <Row>
            <Col>
                {item.campaignName}
            </Col>
            <Col className="d-flex justify-content-end">
                <button className="btn btn-danger" onClick={deleteElement} >
                    <i className="bi bi-trash"></i>
                </button>
            </Col>
        </Row>
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
        const { id } = get_current_organisation()
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


    async function updateCampaign() {
        const { id } = get_current_organisation()
        updateCampaign(id, "Test", "").then(() => {
            loadCampaigns()
        })
    }

    function updateList() {
        loadCampaigns()
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>Campaigns</TitlePage>
            <Container>
                <Button onClick={addCampaign}>+</Button>
                <ItemList items={campaings} template={CampaingContent} onClickItem={CampaignClick} onUpdate={loadCampaigns} />
            </Container>
        </React.Fragment>
    )
}