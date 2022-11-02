import PageHeader from '../../components/common/PageHeader';
import OrganistationForm from '../../components/organisation/OrganistationForm';

import { addOrganisation } from '../../services/superadmin/Organisations';
import { useNavigate } from 'react-router-dom';

export default function CreateOrganisationPage() {

    const navigate = useNavigate()


    function onSubmit(form){
        addOrganisation(form).then(() => {
            navigate('/superadmin/panel')
        }).catch((error) => {
            alert(error.response)
        })
    }

    function onCancel() {
        navigate('/superadmin/panel')
    }

    return (
        <div>
            <PageHeader title="Organisation panel" />
            <OrganistationForm onSubmit={onSubmit} onCancel={onCancel}/>
        </div>
    )
}