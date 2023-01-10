import { useState } from "react";
import { createContext } from "react";

export const TemporalDataContext = createContext()

export default function TemporalDataProvider(props) {

    const [campaign_data, setCampaignData] = useState({ name: '', start: '', end: '', counsellors: [], participants: [] })

    function reset_campaign_data() {
        setCampaignData({ name: '', start: '', end: '', counsellors: [], participants: [], updated:false })
    }

    function set_campaign_data(campaingDataUpdate, update=true) {
        const data = {...campaingDataUpdate, updated: update}
        setCampaignData(data)
    }

    const temporalData = {
        campaign_data,
        set_campaign_data,
        reset_campaign_data
    }

    return (
        <TemporalDataContext.Provider value={temporalData}>
            {props.children}
        </TemporalDataContext.Provider>
    )


}