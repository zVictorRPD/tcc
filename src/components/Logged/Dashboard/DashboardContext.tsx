import { useToast, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../../services/api";

export const DashboardContext = createContext<IDashboardContext>({} as IDashboardContext);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const { data } = useSession();
    const [userId, setUserId] = useState(0);
    const [onLoad, setOnLoad] = useState(false);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventData, setEventData] = useState<IEvent>({} as IEvent);
    const {
        isOpen: eventModalIsOpen,
        onOpen: eventModalOnOpen,
        onClose: eventModalOnClose
    } = useDisclosure();

    const DashboardContextData = {
        userId,
        onLoad,
        setOnLoad,
        events,
        setEvents,
        eventData,
        setEventData,
        eventModalIsOpen,
        eventModalOnOpen,
        eventModalOnClose,
    };

    const getDashboard = async (userId: number) => {
        setOnLoad(true);
        try {
            const response = await api.get('/dashboard/getInfo', {
                params: {
                    userId,
                }
            });

            if (response.data.hasCurriculum) {
                const {
                    periods,
                    subjects,
                    timetable
                }: {
                    periods: IPeriods,
                    subjects: ISubjects,
                    timetable: ITimeTable
                } = response.data;

                if (periods && subjects) {

                }
                return;
            }
        } catch (err) {
            toast({
                title: "Erro ao carregar o dashboard",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } finally {
            setTimeout(() => {
                setOnLoad(false);
            }, 200);

        }
    };

    const getEvents = async (userId: number) => {
        setOnLoad(true);
        try {
            const response = await api.get('dashboard/events', {
                params: {
                    id: userId
                }
            });
            if (!response.data.events) throw new Error();
            setEvents(response.data.events);
        } catch (err) {
            toast({
                title: "Erro ao carregar eventos",
                description: "Ocorreu um erro ao carregar os eventos, tente novamente mais tarde.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } finally {
            setOnLoad(false);
        }
    }

    useEffect(() => {
        if (typeof data?.id === 'number') {
            setUserId(data?.id);
            getDashboard(data.id);
            getEvents(data.id);
        }
    }, [data]);

    return (
        <DashboardContext.Provider value={DashboardContextData}>
            {children}
        </DashboardContext.Provider>
    );
}