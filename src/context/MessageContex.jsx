import { createContext, useEffect, useState } from 'react';
import ConfirmationModal from '../components/modal/ConfirmationModal';

export const MessageContext = createContext()

const MessageContextProvider = (props) => {
    const [confirmationState, setConfirmationState] = useState({show:false, onConfirmation:()=>{}})
    
    function hideConfirmationModal() {
        setConfirmationState({show:false, onConfirmation:()=>{}})
    }

    function showConfirmationModal(callback) {
        setConfirmationState({show:true, onConfirmation:callback})
    }

    return (
        <MessageContext.Provider value={{showConfirmationModal}}>
            <div>
                <ConfirmationModal onConfirmation={confirmationState.onConfirmation} show={confirmationState.show} onHide={hideConfirmationModal} />
                {props.children}
            </div>
        </MessageContext.Provider>
    )

}

export default MessageContextProvider;