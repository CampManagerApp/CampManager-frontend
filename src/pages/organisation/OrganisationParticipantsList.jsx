import { useContext, useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import { organisationContex } from "../../context/OrganisationContex";
import { UserStatusContext } from "../../context/UserStatusContext";
import * as image from "../../design/images";

export default function OrganisationParticipantsList({ items = [], template: Template, onClickItem = () => { } }) {
    const navigate = useNavigate()
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [participants, setParticipants] = new useState([])
    const [update, setUpdate] = useState(true)
    const id = ''

    const { get_org_unclaimed_users, get_claimed_members } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)


    useEffect(() => {
        loadOrganisationParticipants()
    }, [])

    function loadOrganisationParticipants() {
        const { id } = get_current_organisation()
        get_claimed_members(id).then((participants_list) => {
            const participants = participants_list.map((participant) => {
                return participant.username
            })
            setParticipants(participants)
        })
    }

    function updateParticipants() {
        navigate("/admin/organisationusers")
    }


    return (
        <>
            <ProfilePage profileName="Esplai Xino-Xano" profileNick="Members" backgroundImg={image.Miembro} includeProfileImage={includeProfileImage} />
            <Container className="flex-item flex-container">
                <ItemList  max_height="70%" items={participants}></ItemList>

                <Col className="d-flex justify-content-end align-items-end mb-4">
                    <Button onClick={updateParticipants}>Update members</Button>
                </Col>
            </Container>
        </>
    )
}