import PageHeader from '../../components/PageHeader';
import OrganistationCreateForm from '../../components/organisation/OrganistationCreateForm';



export default function CreateOrganisationPage() {

    return (
        <div>
            <PageHeader title="Organisation panel" />
            <OrganizationTableList />
        </div>
    )

}