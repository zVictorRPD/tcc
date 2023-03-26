import React, { useContext } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, ModalFooter, Button } from "@chakra-ui/react";
import { DashboardContext } from './DashboardContext';
import moment from 'moment';

function EventModal() {
    const { eventModalIsOpen, eventModalOnClose, eventData } = useContext(DashboardContext)
    return (
        <Modal isOpen={eventModalIsOpen} onClose={eventModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Visualizar {eventData.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    px={{
                        base: '0',
                        md: '4'
                    }}
                >

                    <FormControl mb={3}>
                        <FormLabel>Título</FormLabel>
                        <Input
                            value={eventData.title}
                            cursor={'default'}
                            readOnly
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Inicio</FormLabel>
                        <Input
                            type="datetime-local"
                            value={moment(eventData.start).format('YYYY-MM-DDTHH:mm:ss')}
                            cursor={'default'}
                            readOnly
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Fim</FormLabel>
                        <Input
                            type="datetime-local"
                            value={moment(eventData.end).format('YYYY-MM-DDTHH:mm:ss')}
                            cursor={'default'}
                            readOnly
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Descrição</FormLabel>
                        <Textarea
                            placeholder='Descrição'
                            value={eventData.description}
                            cursor={'default'}
                            resize={'none'}
                            readOnly
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' onClick={eventModalOnClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EventModal