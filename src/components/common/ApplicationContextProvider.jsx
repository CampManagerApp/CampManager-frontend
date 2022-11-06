import MessageContextProvider from "../../context/MessageContex";
import UserStatusProvider, { USER_STATUS } from '../../context/UserStatusContext';

export default function ApplicationContextProvider(props) {
    return (
        <MessageContextProvider>
            <UserStatusProvider>
                {props.children}
            </UserStatusProvider>
        </MessageContextProvider>
    )
}