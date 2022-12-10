import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../../services/api";

export const CurriculumContext = createContext<ICurriculumContext>({} as ICurriculumContext);

export function CurriculumProvider({ children }: { children: ReactNode }) {
    const [onLoad, setOnLoad] = useState(false);
    const [hasCurriculum, setHasCurriculum] = useState(false);
    const [course, setCourse] = useState<ICourse>({} as ICourse);
    const [courses, setCourses] = useState<Object[]>([]);
    const [periods, setPeriods] = useState<IPeriods>({} as IPeriods);
    const [subjects, setSubjects] = useState<ISubjects>({} as ISubjects);
    const [subjectsFilter, setSubjectsFilter] = useState<ISubjectsFilter>({} as ISubjectsFilter);
    const [complementary, setComplementary] = useState<IComplementary[]>([]);
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
        subjectsFilter,
        setSubjectsFilter,
        complementary,
        setComplementary,
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

    const getCurriculum = async () => {
        setOnLoad(true);
        try {
            const response = await api.get('/curriculum/getCurriculum');

            if (response.data.hasCurriculum) {
                const {
                    course,
                    periods,
                    subjects,
                    subjectsFilter,
                    periodsOrder,
                    complementary
                }: {
                    course: ICourse,
                    periods: IPeriods,
                    subjects: ISubjects,
                    subjectsFilter: ISubjectsFilter,
                    periodsOrder: string[],
                    complementary: IComplementary[]
                } = response.data;

                if (course && periods && subjects && periodsOrder && complementary && subjectsFilter) {
                    setHasCurriculum(true);
                    setCourse(course);
                    setPeriods(periods);
                    setSubjects(subjects);
                    setSubjectsFilter(subjectsFilter);
                    setPeriodOrder(periodsOrder);
                    setComplementary(complementary);
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
        getCurriculum();
    }, [hasCurriculum]);

    return (
        <CurriculumContext.Provider value={curriculumContextData}>
            {children}
        </CurriculumContext.Provider>
    );
}