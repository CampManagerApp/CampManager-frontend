import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAsyncError } from '../../components/errors/Errors';
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

    const asyncError = useAsyncError()
    const { get_members_list, registry_new_member, delete_member, update_member } = useContext(organisationContex)
    const { get_current_organisation } = useContext(UserStatusContext)

    useEffect(() => {
        load_members()
    }, [])

    function load_members() {
        const { id, name: org_name } = get_current_organisation()
        get_members_list(id, org_name).then((members) => {
            const members_info = members.map((member) => {
                // apply member info transformation to visualizate in the table
                const name = member.full_name
                const member_organisations = member.organisations
                // check if the member is claimed (implies organisations object undefined)
                if (member_organisations === null) {
                    const role = member.is_admin ? 'admin' : 'cousellor'
                    return { name: name, role: role, status: 'false', claimed: false }
                } else {
                    // filtering by organisation name to get the current organisation
                    const org_status = member_organisations.filter((org) => {
                        return org.organisationName === org_name
                    })[0]
                    // extra member info
                    const id = org_status.id
                    const role = org_status.is_admin ? 'admin' : 'cousellor'
                    const status = 'true'
                    const username = member.username
                    return { id: id, name: name, role: role, status: status, claimed: true, username: username }
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
        const orgname = get_current_organisation().name
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
        const name = selectUser.claimed ? selectUser.username : selectUser.name
        const is_admin = form.role == 'admin' ? true : false
        const orgname = get_current_organisation().name
        
        update_member(orgname, name, is_admin, true, selectUser.claimed).then(() => {
            setSelectUser(null)
            setModalShowUpdate(false)
            load_members()
        })
    }

    function onDelete(id) {
        const orgname = get_current_organisation().name
        // find the member with id
        const member_to_delete = members.filter((member) => {
            return member.id === id
        })[0]

        // check if it is claimied
        const name = member_to_delete.claimed ? member_to_delete.username : member_to_delete.name
        // delete member
        delete_member(orgname, name, member_to_delete.claimed).then(() => {
            load_members()
        }).catch((error) => {
            alert(error)
        })

    }

    return (
        <div>
            <FormModal onSubmit={onSubmit} title="Add new member" fields={['name', 'role']} show={modalShow} onHide={() => setModalShow(false)} />
            <FormModal onSubmit={submitUpdate} title="Update Member" fields={['role']} show={modalShowUpdate} onHide={() => setModalShowUpdate(false)} />
            <ListTable list={members} fields={['name', 'role', 'status']} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete}>
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