import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment'
import { api } from '../../../services/api'
interface IEventModalProps {
    eventModal: {
        events: IEvent[],
        setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>,
        eventModalIsOpen: boolean,
        eventModalOnClose: () => void,
        eventData: IEvent,
        setEventData: React.Dispatch<React.SetStateAction<IEvent>>,
        isEdit: boolean,
        userId: number,
        onLoad: boolean,
        setOnLoad: React.Dispatch<React.SetStateAction<boolean>>,
    }

}

function EventModal(props: IEventModalProps) {
    const {
        events,
        setEvents,
        eventModalIsOpen,
        eventModalOnClose,
        eventData,
        setEventData,
        isEdit,
        userId,
        onLoad,
        setOnLoad,
    } = props.eventModal
    const toast = useToast();

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

    const handleSubmitEvent = async () => {
        setOnLoad(true);
        if (eventData.title === '') {
            createToast('O título não pode ser vazio');
            return;
        }
        //check if the date is selected
        if (eventData.start === undefined || eventData.end === undefined) {
            createToast('O evento deve ter uma data');
            return;
        }
        //check if date start is before date end
        if (eventData.start.getTime() > eventData.end.getTime()) {
            createToast('A data de início não pode ser maior que a data de fim');
            return;
        }

        try {
            let params = {
                userId,
                title: eventData.title,
                start: eventData.start,
                end: eventData.end,
                description: eventData.description || '',
            } as IEvent;

            if (isEdit) params = { ...params, id: eventData?.id }

            const response = await api.post(`/calendar/${isEdit ? 'editEvent' : 'addEvent'}`, params);
            const newEvent = {
                ...response.data.event,
                start: new Date(response.data.event.start),
                end: new Date(response.data.event.end),
            }
            if (isEdit) {
                const newEvents = events.map(event => {
                    if (event.id === newEvent.id) {
                        return newEvent;
                    }
                    return event;
                });
                setEvents(newEvents);
            } else {
                setEvents([...events, newEvent]);
            }
            toast({
                title: isEdit ? "Evento editado" : "Evento criado",
                position: "top-right",
                description: isEdit ? "O evento foi editado com sucesso" : "O evento foi criado com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEventData({
                ...eventData,
                title: '',
                description: '',
            });
        } catch {
            console.log(`Erro ao ${isEdit ? 'editar' : 'adicionar'} evento`);
        }

        eventModalOnClose();
        setOnLoad(false);
    };

    const handleDeleteEvent = () => {
        setOnLoad(true);
        try {
            api.post('/calendar/deleteEvent', { id: eventData.id });
            const newEvents = events.filter(event => event.id !== eventData.id);
            setEvents(newEvents);
            toast({
                title: "Evento deletado",
                position: "top-right",
                description: "O evento foi deletado com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEventData({
                ...eventData,
                title: '',
                description: '',
            });
        } catch {
            console.log('Erro ao deletar evento');
        } finally {
            eventModalOnClose();
            setOnLoad(false);
        }

    };

    const handleCloseModal = () => {
        setEventData({
            ...eventData,
            title: '',
            description: '',
        });
        eventModalOnClose();
    }

    return (
        <Modal isOpen={eventModalIsOpen} onClose={handleCloseModal} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {isEdit ? 'Editar evento' : 'Adicionar evento'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    px={{
                        base: '0',
                        md: '4'
                    }}
                >

                    <FormControl mb={3}>
                        <FormLabel>Título</FormLabel>
                        <Input value={eventData.title} onChange={e => setEventData({ ...eventData, title: e.target.value })} />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Inicio</FormLabel>
                        <Input
                            type="datetime-local"
                            value={moment(eventData.start).format('YYYY-MM-DDTHH:mm:ss')}
                            onChange={e => setEventData({ ...eventData, start: new Date(e.target.value) })}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Fim</FormLabel>
                        <Input
                            type="datetime-local"
                            value={moment(eventData.end).format('YYYY-MM-DDTHH:mm:ss')}
                            onChange={e => setEventData({ ...eventData, end: new Date(e.target.value) })}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Descrição</FormLabel>
                        <Textarea placeholder='Descrição' value={eventData.description} resize={'none'} onChange={e => setEventData({ ...eventData, description: e.target.value })} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    {
                        isEdit && (
                            <Button colorScheme="red" mr={'auto'} onClick={handleDeleteEvent}>
                                Excluir
                            </Button>
                        )
                    }
                    <Button variant='outline' mr={3} onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant='blue-800'
                        onClick={handleSubmitEvent}
                        isLoading={onLoad}
                        loadingText={isEdit ? 'Editando' : 'Adicionando'}
                    >
                        {isEdit ? 'Editar' : 'Adicionar'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EventModal