import PageHeader from '../../components/common/PageHeader';
import OrganistationForm from '../../components/organisation/OrganistationForm';

import { addOrganisation, getOrganisation, updateOrganisation } from '../../services/superadmin/Organisations';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function UpdateOrganisationPage() {

    let params = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [organisationForm, setorganisationForm] = useState(true)
    
    function onSubmit(form){
        updateOrganisation(params.organisationId, form).then(() => {
            navigate('/superadmin/panel')
        }).catch((error) => {
            alert(error.response)
        })
    }

    function onCancel() {
        navigate('/superadmin/panel')
    }

    useEffect(() => {
        if(loading) {
            getOrganisation(params.organisationId).then((form) => {
                setorganisationForm(form)
                setLoading(false)
            })
        }
    }, [loading])


    return (
        <div>
            <PageHeader title="Organisation panel" />
            {!loading ?
                <OrganistationForm form_values={organisationForm} onSubmit={onSubmit} onCancel={onCancel}/>
                : ''
            }
        </div>
    )
}