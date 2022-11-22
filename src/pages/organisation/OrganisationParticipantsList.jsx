import { useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import ItemList from "../../components/lists/ItemList";
import { organisationContex } from "../../context/OrganisationContex";

export default function OrganisationParticipantsList({ items=[], template:Template, onClickItem = ()=>{}}) {
    const imagenPerfil = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
    const imagenFondo = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
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
            <ProfilePage profileName="Esplai Xino-Xano" profileImg={imagenPerfil} profileNick="Members" backgroundImg={imagenFondo}  includeProfileImage={includeProfileImage}  /> 
            <ItemList items={participants}></ItemList>
        </div>
    )
}