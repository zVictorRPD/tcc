import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react";
import { periodsData, subjectsData, periodOrderData } from "./periodsData";

export const CurriculumContext = createContext<ICurriculumContext>({} as ICurriculumContext);

export function CurriculumProvider({ children }: { children: ReactNode }) {
    const [periods, setPeriods] = useState<IPeriods>(periodsData);
    const [subjects, setSubjects] = useState<ISubjects>(subjectsData);
    const [periodOrder, setPeriodOrder] = useState<string[]>(periodOrderData);
    const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISubject);
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

    const curriculumContextData = {
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
        subjectModalOnClose
    }

    return (
        <CurriculumContext.Provider value={curriculumContextData}>
            {children}
        </CurriculumContext.Provider>
    );
}