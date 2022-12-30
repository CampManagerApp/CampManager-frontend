import { createContext, useEffect, useState } from 'react';
import ConfirmationModal from '../components/modal/ConfirmationModal';
import ErrorModal from '../components/modal/ErrorModal';

export const MessageContext = createContext()

const MessageContextProvider = (props) => {
    const [confirmationState, setConfirmationState] = useState({ show: false, onConfirmation: () => { } })
    const [errorMessageState, setErrorMessageState] = useState({ show: false, error_title: '', error_message: '', onclose: () => { } })

    function hideConfirmationModal() {
        setConfirmationState({ show: false, onConfirmation: () => { } })
    }

    function showConfirmationModal(callback) {
        setConfirmationState({ show: true, onConfirmation: callback })
    }

    function hideErrorModal() {
        setErrorMessageState({ show: false, error_title: '', error_message: '', onConfirmation: () =>{} })
    }

    function showErrorMessage(error_title, error_message, callback = () => { }) {
        setErrorMessageState({ show: true, error_title: error_title, error_message: error_message, onConfirmation: callback })
    }

    return (
        <MessageContext.Provider value={{ showConfirmationModal, showErrorMessage }}>
                <ConfirmationModal onConfirmation={confirmationState.onConfirmation} show={confirmationState.show} onHide={hideConfirmationModal} />
                <ErrorModal show={errorMessageState.show}
                    error_title={errorMessageState.error_title}
                    error_message={errorMessageState.error_message}
                    onHide={hideErrorModal} />
                {props.children}
        </MessageContext.Provider>
    )

}

export default MessageContextProvider;