import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { organisationContex } from '../../../../context/OrganisationContex'
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';
import { UserStatusContext } from "../../../../context/UserStatusContext";

import * as image from "../../../../design/images";
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TemporalDataContext } from "../../../../context/TemporalDataContext";



export default function CreateTableCounsellors() {
    const navigate = useNavigate()
    const { t } = useTranslation('common');
    const { get_campaign_counsellors } = useContext(organisationContex)
    const { currentCamp, get_current_organisation } = useContext(UserStatusContext)
    const { table_data, set_table_data } = useContext(TemporalDataContext)

    // const counsellors = ['Joel', 'Lazo', 'Mariona', 'Rafel', 'Alejandro', 'Phoenix', 'Juan Antonio Garcia de Leon', 'Pepe Diego', 'Dallas Review', 'Potato'];
    const [counsellors, setCounsellors] = useState([])
    const [checkedCounsellors, setCheckedCounsellors] = useState([]);


    function handleCancel() {
        setChoosedCounsellors([])
        navigate(-1)
    }

    function handleAcept() {
        navigate(-1)
    }

    function setChoosedCounsellors(counsellors) {
        set_table_data({ ...table_data, ['counsellors']: counsellors })
    }

    function loadCounsellors() {
        const { id } = get_current_organisation()
        const id_campaign = currentCamp.id
        get_campaign_counsellors(id, id_campaign).then((counsellors) => {
            setCounsellors(counsellors.map((counsellor) => {
                return { fullName: counsellor.fullName }
            }))
        })
    }


    useEffect(() => {
        loadCounsellors()
    }, [])

    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>{t('ADD_NEW_TABLE.ADD_COUNSELLORS')}</TitlePage>
            <Container>
                {/* <Container> ALEJANDRO DESCOMENTAR ESTO PARA VER LA OTRA VERSION IMPLEMENTADA
                    {counsellors.map(counsellor => (
                    <div key={counsellor} style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                        inputId={counsellor}
                        value={counsellor}
                        onChange={handleChange}
                        checked={checkedCounsellors.includes(counsellor)}/>
                        <span style={{ marginLeft: '8px' }}>{counsellor}</span>
                    </div>))}
                </Container> */}
                <br />
                <Container className="d-flex justify-content-center">
                    <MultiSelect optionLabel="fullName" showClear={true}
                        style={{ justifyContent: 'center' }} maxSelectedLabels={1}
                        value={table_data.counsellors} options={counsellors}
                        onShow={loadCounsellors}
                        onChange={(e) => setChoosedCounsellors(e.value)} />
                </Container>
                <br />
                <br />
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={handleCancel}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" onClick={handleAcept}>{t('ADD_NEW_TABLE.ACCEPT_BUTTTON')}</Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}