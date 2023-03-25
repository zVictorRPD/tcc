import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { Calendar as ReactCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/pt-br';
import EventModal from "../../../src/components/Logged/Calendar/EventModal";
import { api } from "../../../src/services/api";
import styles from './style.module.scss';
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const lang = {
    'pt-br': {
        week: 'Semana',
        day: 'Dia',
        month: 'Mês',
        previous: 'Anterior',
        next: 'Próximo',
        today: 'Hoje',
        agenda: 'Agenda',
        date: 'Data',
        time: 'Tempo',
        event: 'Evento',
        allDay: 'Todos os dias',
        yesterday: 'Ontem',
        tomorrow: 'Amanhã',
        noEventsInRange: 'Não há nenhum evento nesse intervalo.',
        showMore: (total: any) => `+${total} mais`,
    },
}

const Calendar: NextPage = () => {
    const toast = useToast();
    const bg = useColorModeValue('white', 'gray.900');
    const [events, setEvents] = useState<IEvent[]>([]);
    const [onLoad, setOnLoad] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [eventData, setEventData] = useState<IEvent>({
        title: '',
        start: new Date(),
        end: new Date(),
    } as IEvent);
    const {
        isOpen: eventModalIsOpen,
        onOpen: eventModalOnOpen,
        onClose: eventModalOnClose
    } = useDisclosure();

    const getEvents = async () => {
        setOnLoad(true);
        try {
            const response = await api.get('/calendar/getEvents');
            const newEvents = response.data.events.map((event: IEvent) => {
                return {
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }
            });
            setEvents(newEvents);
        } catch {
            toast({
                title: isEdit ? "Evento editado" : "Evento criado",
                position: "top-right",
                description: isEdit ? "O evento foi editado com sucesso" : "O evento foi criado com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setOnLoad(false);
        }
    };

    const handleSelectSlot = useCallback(
        ({ start, end }: { start: Date, end: Date }) => {
            setEventData({
                title: '',
                start,
                end,
            } as IEvent);

            setIsEdit(false);
            eventModalOnOpen();
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event: IEvent) => {
            setIsEdit(true);
            setEventData({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                description: event.description || '',
            } as IEvent);
            eventModalOnOpen();
        },
        []
    )

    const { scrollToTime } = useMemo(
        () => ({
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
    )

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <Box>
                <Box
                    p={{ base: '.5rem', md: '1rem' }}
                    h={'85vh'}
                    bg={bg}
                    borderRadius={'12px'}
                    borderWidth="1px"
                    borderColor={'gray.300'}
                    position="relative"
                    className={onLoad ? styles.on_load : ''}
                >
                    <ReactCalendar
                        localizer={localizer}
                        culture={'pt-br'}
                        events={events}
                        scrollToTime={scrollToTime}
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        selectable
                        messages={lang['pt-br']}
                        popup
                    />
                </Box>
            </Box>
            <EventModal eventModal={{
                events,
                setEvents,
                eventModalIsOpen,
                eventModalOnClose,
                eventData,
                setEventData,
                isEdit,
                onLoad,
                setOnLoad,
            }} />
        </>

    );
};

export default Calendar;
