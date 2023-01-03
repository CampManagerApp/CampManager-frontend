import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { organisationContex } from '../../../../context/OrganisationContex'
import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import * as image from "../../../../design/images";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';

export default function CreateTableCounsellors() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    function navigateToBack(){
        navigate(-1)
    }
    const counsellors = ['Joel', 'Lazo', 'Mariona', 'Rafel', 'Alejandro', 'Phoenix', 'Juan Antonio Garcia de Leon', 'Pepe Diego', 'Dallas Review', 'Potato'];
    const [checkedCounsellors, setCheckedCounsellors] = useState([]);
    function handleChange(event) {
        const counsellor = event.value;
        if (checkedCounsellors.includes(counsellor)) {
          setCheckedCounsellors(checkedCounsellors.filter(c => c !== counsellor));
        } else {
          setCheckedCounsellors([...checkedCounsellors, counsellor]);
        }
      }

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
                    <MultiSelect style={{justifyContent: 'center' }} options={counsellors} onChange={(event) => setCheckedCounsellors(event.value)} value={checkedCounsellors} maxSelectedLabels={1}/>
                </Container>
                <br />
                <br />
                <Row className="align-items-center">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={navigateToBack}>{t('ADD_NEW_TABLE.CANCEL_BUTTON')}</Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" onClick={null}>{t('ADD_NEW_TABLE.ACCEPT_BUTTTON')}</Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}