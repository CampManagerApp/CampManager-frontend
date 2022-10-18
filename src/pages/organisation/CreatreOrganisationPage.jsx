import PageHeader from '../../components/common/PageHeader';
import OrganistationCreateForm from '../../components/organisation/OrganistationCreateForm';



export default function CreateOrganisationPage() {

    return (
        <div>
            <PageHeader title="Organisation panel" />
            <OrganizationTableList />
        </div>
    )

}