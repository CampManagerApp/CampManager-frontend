import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import * as image from "../../../../design/images";
import React, { useEffect, useState } from "react";
import './CreateCampaign.css'
import Container from 'react-bootstrap/Container';
import ItemList from "../../../../components/lists/ItemList"
import FormModal from '../../../../components/modal/FormModal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next";

function participantsList({ item }) {
    return (
        <div className="d-flex justify-content-center">
            {item.participantName}
        </div>
    )

}
export default function CreateCampaignParticipants(props) {
    const [modalShow, setModalShow] = useState(false);
    const [participants, setCampaings] = useState([]);
    const { t, i18n } = useTranslation('common');
    function showModal() {
        setModalShow(true)
    }
    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>Campaign name</TitlePage>
            <Container>
                <Button onClick={showModal}>+</Button>
                <Button>-</Button>
                <ItemList items={participants} template={participantsList} />
                <FormModal title={t('ADD_NEW_CAMPAIGN.ADD_NEW_PARTICIPANT_TITLE')} fields={[t('ADD_NEW_CAMPAIGN.PARTICIPANT_NAME'), t('ADD_NEW_CAMPAIGN.PARENT_EMAIL'),t('ADD_NEW_CAMPAIGN.NOTES')]} show={modalShow} onHide={() => setModalShow(false)} />
            </Container>
        </React.Fragment>
    )
}