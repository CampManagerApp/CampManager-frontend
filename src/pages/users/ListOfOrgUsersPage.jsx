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
    const [modalShowUpdate, setModalShowUpdate] = useState(false)
    const [selectUser, setSelectUser] = useState(null)
    const [update, setUpdate] = useState(true)
    const asyncError = useAsyncError()
    const { users_list, getUser, addUser, updateUser, deleteUser} = useContext(UserContext)


    function onAdd(user) {
        setModalShow(true)
    }

    function onSubmit(user) {
        addUser(user.name, user.role)
        setModalShow(false)
    }

    function onUpdate(id) {
        //navigate(`/admin/organisationusers/update/${id}`, { replace: true })
        const form = getUser(id)[0]
        setSelectUser(form)
        setModalShowUpdate(true)
    }

    function submitUpdate(form) {
        const updatedUser = selectUser
        updatedUser.role = form.role
        updateUser(selectUser.id, updatedUser)
        setSelectUser(null)
        setModalShowUpdate(false)
    }

    function onDelete(id) {
        deleteUser(id)
    }



    return (
        <div>
            <FormModal  onSubmit={onSubmit} title="Add new member" fields={['name', 'role']} show={modalShow} onHide={() => setModalShow(false)} />
            <FormModal  onSubmit={submitUpdate} title="Update Member" fields={['role']} show={modalShowUpdate} onHide={() => setModalShowUpdate(false)} />
            <ListTable list={users_list} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete}>
                <TableHeaderItem>Name</TableHeaderItem>
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