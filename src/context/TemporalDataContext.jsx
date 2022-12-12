import { useState } from "react";
import { createContext } from "react";

export const TemporalDataContext = createContext()

export default function TemporalDataProvider(props) {

    const [campaign_data, set_campaign_data] = useState({ name: '', start: '', end: '', counsellors: [], participants: [] })

    function reset_campaign_data() {
        set_campaign_data({ name: '', start: new Date(), end: new Date(), counsellors: [], participants: [] })
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