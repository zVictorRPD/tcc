import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react";
import { periodsData, subjectsData, periodOrderData } from "./periodsData";

export const CurriculumContext = createContext<ICurriculumContext>({} as ICurriculumContext);

export function CurriculumProvider({ children }: { children: ReactNode }) {
    const [periods, setPeriods] = useState<IPeriods>(periodsData);
    const [subjects, setSubjects] = useState<ISubjects>(subjectsData);
    const [periodOrder, setPeriodOrder] = useState<string[]>(periodOrderData);
    const {
        isOpen: addSubjectModalIsOpen,
        onOpen: addSubjectModalOnOpen,
        onClose: addSubjectModalOnClose
    } = useDisclosure();

    const curriculumContextData = {
        periods,
        setPeriods,
        subjects,
        setSubjects,
        periodOrder,
        setPeriodOrder,
        addSubjectModalIsOpen,
        addSubjectModalOnOpen,
        addSubjectModalOnClose,
    }

    return (
        <CurriculumContext.Provider value={curriculumContextData}>
            {children}
        </CurriculumContext.Provider>
    );
}