import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../../services/api";

export const CurriculumContext = createContext<ICurriculumContext>({} as ICurriculumContext);

export function CurriculumProvider({ children }: { children: ReactNode }) {
    const { data } = useSession();
    const [onLoad, setOnLoad] = useState(false);
    const [hasCurriculum, setHasCurriculum] = useState(false);
    const [userId, setUserId] = useState(0);
    const [course, setCourse] = useState<ICourse>({} as ICourse);
    const [courses, setCourses] = useState<Object[]>([]);
    const [periods, setPeriods] = useState<IPeriods>({} as IPeriods);
    const [subjects, setSubjects] = useState<ISubjects>({} as ISubjects);
    const [periodOrder, setPeriodOrder] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISelectedSubject>({} as ISelectedSubject);
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

    const {
        isOpen: selectCurriculumModalIsOpen,
        onOpen: selectCurriculumModalOnOpen,
        onClose: selectCurriculumModalOnClose
    } = useDisclosure();

    const {
        isOpen: curriculumDrawerIsOpen,
        onOpen: curriculumDrawerOnOpen,
        onClose: curriculumDrawerOnClose
    } = useDisclosure();

    const curriculumContextData = {
        userId,
        hasCurriculum,
        setHasCurriculum,
        course,
        setCourse,
        courses,
        setCourses,
        periods,
        setPeriods,
        subjects,
        setSubjects,
        periodOrder,
        setPeriodOrder,
        selectedSubject,
        setSelectedSubject,
        addSubjectModalIsOpen,
        addSubjectModalOnOpen,
        addSubjectModalOnClose,
        subjectModalIsOpen,
        subjectModalOnOpen,
        subjectModalOnClose,
        selectCurriculumModalIsOpen,
        selectCurriculumModalOnOpen,
        selectCurriculumModalOnClose,
        curriculumDrawerIsOpen,
        curriculumDrawerOnOpen,
        curriculumDrawerOnClose,
        onLoad,
        setOnLoad,
    }

    const getCurriculum = async (userId: number) => {
        setOnLoad(true);
        try {
            const response = await api.get('/curriculum/getCurriculum', {
                params: {
                    userId,
                }
            });

            if (response.data.hasCurriculum) {
                const {
                    course,
                    periods,
                    subjects,
                    periodsOrder
                }: {
                    course: ICourse,
                    periods: IPeriods,
                    subjects: ISubjects,
                    periodsOrder: string[]
                } = response.data;

                if (course && periods && subjects && periodsOrder) {
                    setHasCurriculum(true);
                    setCourse(course);
                    setPeriods(periods);
                    setSubjects(subjects);
                    setPeriodOrder(periodsOrder);
                }
            } else {
                setCourses(response.data.courses);
            }

        } catch (err) {
            console.log(err);

        } finally {
            setOnLoad(false);
        }
    };

    useEffect(() => {
        if (typeof data?.id === 'number') {
            setUserId(data?.id)
            getCurriculum(data.id);
        }
    }, [data, hasCurriculum]);

    return (
        <CurriculumContext.Provider value={curriculumContextData}>
            {children}
        </CurriculumContext.Provider>
    );
}