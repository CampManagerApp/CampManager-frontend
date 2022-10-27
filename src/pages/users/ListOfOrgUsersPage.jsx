import PageHeader from '../../components/common/PageHeader';


import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getOrganisationList, deleteOrganisation, addOrganisation } from '../../services/superadmin/Organisations';
import { IconContext } from 'react-icons';
import { useAsyncError } from '../../components/errors/Errors';
import { UserContext } from '../../context/usersContext'
import UserContextProvider from '../../context/usersContext';

import * as Icons from '../../design/icons.js'
import logoImg from '../../design/campmanager.png';

import './ListOfOrgUsersPage.css'
import TableHeaderItem from '../../components/tableList/TableHeaderItem';
import FormModal from '../../components/modal/FormModal';
import ListTable from '../../components/tableList/ListTable';





function ListOfOrgUsers() {
    const usersList = [
        { name: 'Jordi', role: 'Admin', status: 'online' },
        { name: 'Joel', role: 'Admin', status: 'online' },
    ]

    const navigate = useNavigate()
    const [users, setUsers] = useState(usersList)
    const [modalShow, setModalShow] = useState(false)
    const [update, setUpdate] = useState(true)
    const asyncError = useAsyncError()
    const { users_list } = useContext(UserContext)


    function onAdd() {
        //navigate('/admin/organisationusers/adduser', { replace: true })
        setModalShow(true)
    }

    function onUpdate(id) {
        navigate(`/admin/organisationusers/update/${id}`, { replace: true })
    }

    useEffect(() => {
        
    }, [update])

    return (
        <div>
            <FormModal title="Add new member" fields={['name', 'role']} show={modalShow} onHide={() => setModalShow(false)} />
            <ListTable list={users_list} onAdd={onAdd} onUpdate={onUpdate} onDelete={(id) => {
                deleteOrganisation(id).then(() => {
                    setUpdate(true)
                })
            }}>
                <TableHeaderItem>Name</TableHeaderItem>
                <TableHeaderItem>Status</TableHeaderItem>
                <TableHeaderItem>Role</TableHeaderItem>
            </ListTable>
        </div>
    );
}

export default function ListOfOrgUsersPage() {
    return (
        <div>
            <PageHeader title="Organisation users panel" />
            <UserContextProvider>
                <ListOfOrgUsers />
            </UserContextProvider>
        </div>
    )
} 