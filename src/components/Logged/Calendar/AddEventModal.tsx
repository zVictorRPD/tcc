import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react'
import React from 'react'

interface AddEventModalProps {
    addEventModal: {
        events: IEvent[],
        setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>,
        addEventModalIsOpen: boolean,
        addEventModalOnClose: () => void,
    }

}

function AddEventModal( props: AddEventModalProps ) {
    const { events, setEvents, addEventModalIsOpen, addEventModalOnClose } = props.addEventModal
    const toast = useToast()

    const createToast = (msg: string) => {
        toast({
            title: "Erro",
            position: "top-right",
            description: msg,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <Modal isOpen={addEventModalIsOpen} onClose={addEventModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl mb={3}>
                        <FormLabel>Título</FormLabel>
                        <Input />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' mr={3} onClick={addEventModalOnClose}>
                        Cancelar
                    </Button>
                    <Button variant='blue-800'>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddEventModal