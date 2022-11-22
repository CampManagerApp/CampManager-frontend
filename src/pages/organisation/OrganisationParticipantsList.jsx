import { useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import { organisationContex } from "../../context/OrganisationContex";
import * as image from "../../design/images";

export default function OrganisationParticipantsList({ items=[], template:Template, onClickItem = ()=>{}}) {
    const idVisible = 'hidden';
    const includeProfileImage = 'none';
    const [participants, setParticipants] = new useState([])
    const [update, setUpdate] = useState(true)
    const id = ''
   
    const { get_org_unclaimed_users, get_org_by_code } = useContext(organisationContex)


    useEffect(() => {
        if (update) {
            const id = ''
            const users = get_org_unclaimed_users(id).map((item) => {return item.name})
            setParticipants(users)
        }
        setUpdate(false)
    }, [update])
    

    return (
        <div>
            <ProfilePage profileName="Esplai Xino-Xano" profileNick="Members" backgroundImg={image.Miembro}  includeProfileImage={includeProfileImage}  /> 
            <ItemList items={participants}></ItemList>
        </div>
    )
}