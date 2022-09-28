import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { TimetableContext } from '../../../../pages/ambiente-logado/grade-horaria/timetableContext';

function AddSubjectModal() {
    const { addSubjectModalIsOpen, addSubjectModalOnClose } = useContext(TimetableContext);

    return (
        <Modal isOpen={addSubjectModalIsOpen} onClose={addSubjectModalOnClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={addSubjectModalOnClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddSubjectModal