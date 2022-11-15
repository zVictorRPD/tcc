import { useToast, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { TimetableObject } from "./timeTableObject";

export const TimetableContext = createContext<ITimetableContext>({} as ITimetableContext);

export function TimetableProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const { data } = useSession();
    const [userId, setUserId] = useState(0);
    const [onLoad, setOnLoad] = useState(false);
    const [timetableSubjects, setTimetableSubjects] = useState<ITimeTable>({} as ITimeTable);
    const [hasCurriculum, setHasCurriculum] = useState(false);
    const [periods, setPeriods] = useState<IPeriods>({} as IPeriods);
    const [subjects, setSubjects] = useState<ISubjects>({} as ISubjects);
    const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISelectedSubject);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const {
        isOpen: addSubjectModalIsOpen,
        onOpen: addSubjectModalOnOpen,
        onClose: addSubjectModalOnClose
    } = useDisclosure();

    const {
        isOpen: subjectModalIsOpen,
        onOpen: subjectModalOnOpen,
        onClose: subjectModalOnClose
    } = useDisclosure();

    const timetableContextData = {
        userId,
        onLoad,
        setOnLoad,
        hasCurriculum,
        timetableSubjects,
        periods,
        setPeriods,
        subjects,
        setSubjects,
        selectedSubject,
        setSelectedSubject,
        selectedColor,
        setSelectedColor,
        setTimetableSubjects,
        addSubjectModalIsOpen,
        addSubjectModalOnOpen,
        addSubjectModalOnClose,
        subjectModalIsOpen,
        subjectModalOnOpen,
        subjectModalOnClose
    };

    const getTimetable = async (userId: number) => {
        setOnLoad(true);
        try {
            const response = await api.get('/timetable/getTimetable', {
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
                    setHasCurriculum(true);
                    setPeriods(periods);
                    setSubjects(subjects);
                    timetable === null ? setTimetableSubjects(TimetableObject) : setTimetableSubjects(timetable);
                }
                return;
            }
        } catch (err) {
            toast({
                title: "Erro ao carregar a grade horária",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } finally {
            setOnLoad(false);
        }
    };

    useEffect(() => {
        if (typeof data?.id === 'number') {
            setUserId(data?.id);
            getTimetable(data.id);
        }
    }, [data, hasCurriculum]);

    return (
        <TimetableContext.Provider value={timetableContextData}>
            {children}
        </TimetableContext.Provider>
    );
}