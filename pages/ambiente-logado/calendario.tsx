import React, { useCallback, useMemo, useState } from "react";
import type { NextPage } from "next";
import { Calendar as ReactCalendar, momentLocalizer } from 'react-big-calendar'
import AddEventModal from "../../src/components/Logged/Calendar/AddEventModal";
import moment from 'moment'
import { Box, useDisclosure } from "@chakra-ui/react";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/pt-br';
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

const eventsDefault: IEvent[] = [
    {
        title: 'All Day Event very long title',
        allDay: false,
        start: new Date(2022, 10, 3, 10, 0, 0),
        end: new Date(2022, 10, 3, 14, 0, 0),
    },
    {
        title: 'Long Event',
        allDay: false,
        start: new Date(2022, 10, 3),
        end: new Date(2022, 10, 3),
    },
]

const Calendar: NextPage = () => {
    const [events, setEvents] = useState<IEvent[]>(eventsDefault);
    const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
        start: new Date(),
        end: new Date()
    } as ISelectedDate);
    const {
        isOpen: addEventModalIsOpen,
        onOpen: addEventModalOnOpen,
        onClose: addEventModalOnClose
    } = useDisclosure();

    const handleSelectSlot = useCallback(
        ({ start, end }: { start: Date, end: Date }) => {
            setSelectedDate({ start, end });
            addEventModalOnOpen();
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event: IEvent) => window.alert(event.title),
        []
    )

    const { scrollToTime } = useMemo(
        () => ({
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
    )

    return (
        <>
            <Box p={{ base: '.5rem', md: '2rem' }}>
                <Box
                    p={{ base: '.5rem', md: '1rem' }}
                    h={'85vh'}
                    bg="white"
                    borderRadius={'12px'}
                    borderWidth="1px"
                    borderColor={'gray.300'}>
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
            <AddEventModal addEventModal={{
                events,
                setEvents,
                addEventModalIsOpen,
                addEventModalOnClose,
                selectedDate,
                setSelectedDate
            }} />
        </>

    );
};

export default Calendar;
