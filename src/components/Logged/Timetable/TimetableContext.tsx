import { useToast, useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { TimetableObject } from "../../../functions/timetable";
import { useRouter } from "next/router";

export const TimetableContext = createContext<ITimetableContext>({} as ITimetableContext);

export function TimetableProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const router = useRouter();
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

    const getTimetable = async () => {
        setOnLoad(true);
        try {
            const response = await api.get('/timetable/getTimetable');
            if (typeof response.data.hasCurriculum === 'undefined') throw new Error('No curriculum');
            if (!response.data.hasCurriculum) {
                router.push('/ambiente-logado/grade-curricular');
                return;
            };
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
            setTimeout(() => {
                setOnLoad(false);
            }, 200);
            return;
        } catch (err) {
            toast({
                title: "Erro ao carregar a grade horária",
                description: "Tente novamente mais tarde.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    useEffect(() => {
        getTimetable();
    }, [hasCurriculum]);

    return (
        <TimetableContext.Provider value={timetableContextData}>
            {children}
        </TimetableContext.Provider>
    );
}