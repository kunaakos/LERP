import * as React from 'react'

import usePortal from 'react-useportal'

import { Modal } from '../components/ui-kit'

export const useModal = () => {
    const { openPortal, closePortal, isOpen, Portal } = usePortal({
        bindTo: document.getElementById('modals'),
    })

    const ModalContents = ({ children }) => (
        <>
            {isOpen && (
                <Portal>
                    <Modal onBgClick={closePortal}>{children}</Modal>
                </Portal>
            )}
        </>
    )

    return {
        closeModal: closePortal,
        openModal: openPortal,
        isModalOpen: isOpen,
        ModalContents,
    }
}
