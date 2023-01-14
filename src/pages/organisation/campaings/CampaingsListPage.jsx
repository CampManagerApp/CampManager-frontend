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
import { MessageContext } from "../../../context/MessageContex"


function CampaingContent({ item, onUpdate }) {
    const { isOrgAdmin } = useContext(UserStatusContext)
    return (
        isOrgAdmin
            ? <CampaignsAdminElement item={item} onUpdate={onUpdate} />
            : <CampaignMemberElement item={item} />
    )
}

function CampaignMemberElement({ item }) {
    return (
        <div className="d-flex justify-content-center align-items-center">
            {item.campaignName}
        </div>
    )
}

function CampaignsAdminElement({ item, onUpdate }) {
    const navigate = useNavigate()
    const { delete_campaign } = useContext(organisationContex)
    const { get_current_organisation, set_current_camp, set_current_participant, set_current_organisation } = useContext(UserStatusContext)
    const { showConfirmationModal } = useContext(MessageContext)

    function deleteElement(e) {
        // stop click propagation
        e.preventDefault()
        e.stopPropagation()

        // delete campaign
        const { id } = get_current_organisation()
        showConfirmationModal(() => {
            delete_campaign(id, item.campaignName).then(() => {
                onUpdate()
            })
        })
    }
    function editElement(e) {
        e.preventDefault()
        e.stopPropagation()
        set_current_camp(item)
        navigate('/admin/editcampaign')
    }

    return (
        <Row>
            <Col className="d-flex align-items-center">
                {item.campaignName}
            </Col>
            <Col className="d-flex justify-content-end">
                <Button variant="primary" onClick={editElement}><i className="bi bi-pen"></i></Button>
                <Button variant="danger" className="mx-1" onClick={deleteElement}><i className="bi bi-trash"></i></Button>
            </Col>
        </Row>
    )
}

export default function CampaingsListPage() {
    const [campaings, setCampaings] = useState([])
    const { get_campaings_list, create_campaign, delete_campaign, update_campaign } = useContext(organisationContex)
    const { set_current_camp, get_current_organisation, isOrgAdmin } = useContext(UserStatusContext)
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
        navigate('/admin/createcampaign')
    }


    async function updateCampaign() {
        const { id } = get_current_organisation()
        updateCampaign(id, "Test", "").then(() => {
            loadCampaigns()
        })
    }

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>Campaigns</TitlePage>
            <Container className="flex-container" >
                <ItemList max_height="40vh" items={campaings} template={CampaingContent} onClickItem={CampaignClick} onUpdate={loadCampaigns} />
            </Container>
            {isOrgAdmin &&
                <Container className="flex-item flex-container justify-content-end align-items-end">
                    <Row>
                        <Col className="flex-item  mb-4">
                            <Button className="" onClick={addCampaign}>+</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </React.Fragment>
    )
}