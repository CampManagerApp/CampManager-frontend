import MessageContextProvider from "../../context/MessageContex";
import OrganisationProvider from "../../context/OrganisationContex";
import UserOrganisationsProvider, { UserOrganisationsContex } from "../../context/UserOrganisationsContex";
import UserStatusProvider, { USER_STATUS } from '../../context/UserStatusContext';

export default function ApplicationContextProvider(props) {
    return (
        <MessageContextProvider>
            <UserStatusProvider>
                <OrganisationProvider>
                    <UserOrganisationsProvider>
                        {props.children}
                    </UserOrganisationsProvider>
                </OrganisationProvider>
            </UserStatusProvider>
        </MessageContextProvider>
    )
}