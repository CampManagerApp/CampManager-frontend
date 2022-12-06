import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAsyncError } from '../../components/errors/Errors';
import { UserContext } from '../../context/usersContext';
import { useTranslation } from "react-i18next";
import { organisationContex } from '../../context/OrganisationContex';
import { UserStatusContext } from '../../context/UserStatusContext';

import UserContextProvider from '../../context/usersContext';
import TableHeaderItem from '../../components/tableList/TableHeaderItem';
import FormModal from '../../components/modal/FormModal';
import PageHeader from '../../components/common/PageHeader';
import ListTable from '../../components/tableList/ListTable';

import './ListOfOrgUsersPage.css'


function ListOfOrgUsers() {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');

    const [members, setMembers] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalShowUpdate, setModalShowUpdate] = useState(false)
    const [selectUser, setSelectUser] = useState(null)
    const [update, setUpdate] = useState(true)

    const asyncError = useAsyncError()
    const { users_list, getUser, addUser, updateUser, deleteUser } = useContext(UserContext)
    const { get_members_list } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)

    useEffect(() => {
        load_members()
    }, [])


    function load_members() {
        //const { id } = get_current_organisation()
        const id = 2
        get_members_list(id).then((members) => {
            const members_info = members.map((member) => {
                // apply member info transformation to visualizate in the table
                const name = member.full_name
                const org_status = member.organisation_status
                if (org_status === undefined) {
                    const role = ''
                    const claimed = 'false'
                    return { name: name, role: role, claimed: claimed }
                } else {
                    const role = org_status.is_admin ? 'admin' : 'cousellor'
                    const claimed = 'true'
                    return { name: name, role: role, claimed: claimed }
                }
            })
            setMembers(members_info)
        })
    }


    function onAdd(user) {
        setModalShow(true)
    }

    function onSubmit(user) {
        addUser(user.name, user.role)
        setModalShow(false)
    }

    function onUpdate(id) {
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
            <FormModal onSubmit={onSubmit} title="Add new member" fields={['name', 'role']} show={modalShow} onHide={() => setModalShow(false)} />
            <FormModal onSubmit={submitUpdate} title="Update Member" fields={['role']} show={modalShowUpdate} onHide={() => setModalShowUpdate(false)} />
            <ListTable list={members} fields={['name', 'role', 'claimed']} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete}>
                <TableHeaderItem>{t('MEMBERS_ADMIN_CRUD.NAME_HEADER')}</TableHeaderItem>
                <TableHeaderItem>{t('MEMBERS_ADMIN_CRUD.ROLE_HEADER')}</TableHeaderItem>
                <TableHeaderItem>{t('MEMBERS_ADMIN_CRUD.CLAIMED_HEADER')}</TableHeaderItem>
            </ListTable>
        </div>
    );
}

export default function ListOfOrgUsersPage() {
    return (
        <div>
            <PageHeader title="Members Admin Panel" />
            <UserContextProvider>
                <ListOfOrgUsers />
            </UserContextProvider>
        </div>
    )
} 