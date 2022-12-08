import BannerImage from "../../../../components/common/BannerImage"
import TitlePage from "../../../../components/common/TitlePage";
import * as image from "../../../../design/images";
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";

import { Calendar } from 'primereact/calendar';



export default function CreateCampaign() {
    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <React.Fragment>
            <BannerImage bannerImage={image.backgroundOrg} />
            <TitlePage>Create campaigns</TitlePage>
            <><Form.Label>Campaign name:</Form.Label><Form.Control type="text" aria-describedby="passwordHelpBlock" /></>
            <><Form.Label>Duration:</Form.Label></>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            <Calendar value={startDate} onChange={(e) => setStartDate(e.value)}></Calendar>
        </React.Fragment>
    )
}