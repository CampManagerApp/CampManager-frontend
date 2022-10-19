import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageHeader from '../../components/common/PageHeader';
import OrganistationForm from '../../components/organisation/OrganistationForm';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrganisationList, deleteOrganisation, addOrganisation } from '../../services/superadmin/getOrganisations';
import * as Icons from '../../design/icons.js'
import logoImg from '../../design/campmanager.png';

import './SuperAdminPage.css'
import { IconContext } from 'react-icons';
import ListTable from '../../components/tableList/ListTable';

function OrganizationTableList() {
    const navigate = useNavigate()
    const [organisations, setOrganisations] = useState([])
    const [update, setUpdate] = useState(true)
    
    function handleError(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    }

    function onAdd() {
        navigate('/admin/organisation/create', {replace: true})
    }

    function onUpdate(id) {
        navigate(`/admin/organisation/update/${id}`, {replace: true})
    }

    useEffect(() => {
        if (update) {
            getOrganisationList()
                .then(orgs_list => setOrganisations(orgs_list))
                .catch(handleError)
        }
        setUpdate(false)
    }, [update])

    return (
        <div>
            <ListTable list={organisations} onAdd={onAdd} onUpdate={onUpdate} onDelete={(id) => {
                deleteOrganisation(id).then(() => {
                    setUpdate(true)
                })
            }} />           
        </div>
    );
}

export default function SuperAdminPage() {
    return (
        <div>
            <PageHeader title="Organisation panel" />
            <OrganizationTableList />
        </div>
    )
} 