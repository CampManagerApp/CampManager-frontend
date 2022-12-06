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
    const { get_members_list, registry_new_member, delete_member, update_member } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)

    useEffect(() => {
        load_members()
    }, [])


    function load_members() {
        //const { id, name } = get_current_organisation()
        const id = 2
        const org_name = 'Sió'
        get_members_list(id).then((members) => {
            const members_info = members.map((member) => {
                console.log(member)
                // apply member info transformation to visualizate in the table
                const name = member.full_name
                const member_organisations = member.organisations
                // check if the member is claimed (implies organisations object undefined)
                if (member_organisations === undefined) {
                    const role = ''
                    const claimed = 'false'
                    return { name: name, role: role, claimed: claimed }
                } else {
                    // filtering by organisation name to get the current organisation
                    const org_status = member_organisations.filter((org) => {
                        return org.organisationName === org_name
                    })[0]
                    // extra member info
                    const id = org_status.id
                    const role = org_status.is_admin ? 'admin' : 'cousellor'
                    const claimed = 'true'
                    const username = member.username
                    return { id: id, name: name, role: role, claimed: claimed, username: username }
                }
            })
            setMembers(members_info)
        })
    }


    function onAdd(user) {
        setModalShow(true)
    }

    function onSubmit(user) {
        const full_name = user.name
        const is_admin = user.role == 'admin' ? true : false
        //const orgname = get_current_organisation().name
        const orgname = "Sió"
        registry_new_member(orgname, full_name, is_admin, true).then(() => {
            setModalShow(false)
            load_members()
        })
    }

    function onUpdate(id) {
        // find the member with id (provisional)
        const selected_member = members.filter((member) => {
            return member.id === id
        })[0]
        setSelectUser(selected_member)
        setModalShowUpdate(true)
    }

    function submitUpdate(form) {
        // const updatedUser = selectUser
        // updatedUser.role = form.role
        // updateUser(selectUser.id, updatedUser)
        const username = selectUser.username
        const is_admin = form.role == 'admin' ? true : false
        //const orgname = get_current_organisation().name
        const orgname = "Sió"

        update_member(orgname, username, is_admin, true).then(() =>{
            setSelectUser(null)
            setModalShowUpdate(false)
            load_members()
        })
    }

    function onDelete(id) {
        //deleteUser(id)
        //const orgname = get_current_organisation().name
        const orgname = "Sió"
        // find the member with id (provisional)
        const member_to_delete = members.filter((member) => {
            return member.id === id
        })[0]
        delete_member(orgname, member_to_delete.username).then(() => {
            load_members()
        }).catch((error) => {
            alert(error)
        })

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