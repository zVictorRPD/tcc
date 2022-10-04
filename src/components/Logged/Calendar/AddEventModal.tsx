import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react'
import React from 'react'

interface AddEventModalProps {
    addEventModal: {
        events: IEvent[],
        setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>,
        addEventModalIsOpen: boolean,
        addEventModalOnClose: () => void,
        selectedDate: ISelectedDate,
        setSelectedDate: React.Dispatch<React.SetStateAction<ISelectedDate>>
    }

}

function AddEventModal( props: AddEventModalProps ) {
    const { events, setEvents, addEventModalIsOpen, addEventModalOnClose, selectedDate, setSelectedDate } = props.addEventModal
    const toast = useToast();
    const [title, setTitle] = React.useState('');
    console.log(selectedDate);
    
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

    const handleAddEvent = () => {
        if (title === '') {
            createToast('O título não pode ser vazio');
            return;
        }
        //check if the date is selected
        if (selectedDate.start === undefined || selectedDate.end === undefined) {
            createToast('O evento deve ter uma data');
            return;
        }
        //check if date start is before date end
        if (selectedDate.start.getTime() > selectedDate.end.getTime()) {
            createToast('A data de início não pode ser maior que a data de fim');
            return;
        }

        const newEvent: IEvent = {
            title,
            start: selectedDate.start,
            end: selectedDate.end,
            allDay: false
        }
        setEvents([...events, newEvent]);
        toast({
            title: "Evento adicionado",
            position: "top-right",
            description: "O evento foi adicionado com sucesso",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        addEventModalOnClose();
    };

    return (
        <Modal isOpen={addEventModalIsOpen} onClose={addEventModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl mb={3}>
                        <FormLabel>Título</FormLabel>
                        <Input value={title} onChange={e => setTitle(e.target.value)} />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Inicio</FormLabel>
                        <Input 
                        type="datetime-local" 
                        value={selectedDate.start.toISOString().slice(0,16)} 
                        onChange={e => setSelectedDate({ ...selectedDate, start: new Date(e.target.value) })}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Fim</FormLabel>
                        <Input
                         type="datetime-local" 
                         value={selectedDate.end.toISOString().slice(0,16)} 
                         onChange={e => setSelectedDate({ ...selectedDate, end: new Date(e.target.value) })}
                         />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' mr={3} onClick={addEventModalOnClose}>
                        Cancelar
                    </Button>
                    <Button variant='blue-800' onClick={handleAddEvent}>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddEventModal