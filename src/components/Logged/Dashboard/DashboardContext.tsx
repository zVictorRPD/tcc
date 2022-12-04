import { useToast, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../../services/api";

export const DashboardContext = createContext<IDashboardContext>({} as IDashboardContext);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const { data } = useSession();
    const router = useRouter();
    const [userId, setUserId] = useState(0);
    const [onLoad, setOnLoad] = useState(true);
    const [hasCurriculum, setHasCurriculum] = useState(false);
    const [course, setCourse] = useState<ICourse>({} as ICourse);
    const [subjects, setSubjects] = useState<ISubject[]>({} as ISubject[]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISubject);
    const [timetable, setTimetable] = useState<ITimeTable>({} as ITimeTable);
    const [complementary, setComplementary] = useState<IComplementary[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventData, setEventData] = useState<IEvent>({} as IEvent);
    const {
        isOpen: eventModalIsOpen,
        onOpen: eventModalOnOpen,
        onClose: eventModalOnClose
    } = useDisclosure();
    const {
        isOpen: subjectModalIsOpen,
        onOpen: subjectModalOnOpen,
        onClose: subjectModalOnClose
    } = useDisclosure();

    const DashboardContextData = {
        userId,
        onLoad,
        setOnLoad,
        hasCurriculum,
        course,
        subjects,
        selectedSubject,
        setSelectedSubject,
        timetable,
        complementary,
        events,
        eventData,
        setEventData,
        eventModalIsOpen,
        eventModalOnOpen,
        eventModalOnClose,
        subjectModalIsOpen,
        subjectModalOnOpen,
        subjectModalOnClose
    };

    const getDashboard = async (userId: number) => {
        setOnLoad(true);
        try {
            const response = await api.get('/dashboard/getInfo', {
                params: {
                    userId,
                }
            });
            if (typeof response.data.hasCurriculum === 'undefined') throw new Error('No curriculum');
            if (!response.data.hasCurriculum) {
                router.push('/ambiente-logado/grade-curricular');
                return;
            };
            const {
                course,
                subjects,
                timetable,
                complementary,
            }: {
                course: ICourse,
                subjects: ISubject[],
                timetable: ITimeTable,
                complementary: IComplementary[],
            } = response.data;
            if (course) setCourse(course);
            if (subjects) setSubjects(subjects);
            if (timetable) setTimetable(timetable);
            if (complementary) setComplementary(complementary);
            setOnLoad(false);

        } catch (err) {
            toast({
                title: "Erro ao carregar o dashboard",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const getEvents = async (userId: number) => {
        try {
            const response = await api.get('dashboard/events', {
                params: {
                    id: userId
                }
            });
            if (!response.data) throw new Error();
            setEvents(response.data);
        } catch (err) {
            toast({
                title: "Erro ao carregar eventos",
                description: "Ocorreu um erro ao carregar os eventos, tente novamente mais tarde.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
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