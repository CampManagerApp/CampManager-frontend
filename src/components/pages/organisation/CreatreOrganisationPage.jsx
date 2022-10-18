import PageHeader from '../../PageHeader';
import OrganistationCreateForm from '../../organisation/OrganistationCreateForm';



export default function CreateOrganisationPage() {

    return (
        <div>
            <PageHeader title="Organisation panel" />
            <OrganizationTableList />
        </div>
    )

}