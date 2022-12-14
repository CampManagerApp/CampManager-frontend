import MessageContextProvider from "../../context/MessageContex";
import OrganisationProvider from "../../context/OrganisationContex";
import TemporalDataProvider from "../../context/TemporalDataContext";
import UserOrganisationsProvider from "../../context/UserOrganisationsContex";
import UserStatusProvider, { USER_STATUS } from '../../context/UserStatusContext';

export default function ApplicationContextProvider(props) {
    return (
        <MessageContextProvider>
            <UserStatusProvider>
                <OrganisationProvider>
                    <TemporalDataProvider>
                        <UserOrganisationsProvider>
                            {props.children}
                        </UserOrganisationsProvider>
                    </TemporalDataProvider>
                </OrganisationProvider>
            </UserStatusProvider>
        </MessageContextProvider>
    )
}