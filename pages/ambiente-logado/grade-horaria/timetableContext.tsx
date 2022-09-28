import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react";
import { TimetableObject } from "./timeTableObject";

export const TimetableContext = createContext<ITimetableContext>({} as ITimetableContext);

export function TimetableProvider({ children }: { children: ReactNode }) {

    const [timetableSubjects, setTimetableSubjects] = useState<ITimeTable>(TimetableObject);

    const {
        isOpen: addSubjectModalIsOpen,
        onOpen: addSubjectModalOnOpen,
        onClose: addSubjectModalOnClose
    } = useDisclosure();

    const timetableContextData = {
        timetableSubjects,
        setTimetableSubjects,
        addSubjectModalIsOpen,
        addSubjectModalOnOpen,
        addSubjectModalOnClose,
    }

    return (
        <TimetableContext.Provider value={timetableContextData}>
            {children}
        </TimetableContext.Provider>
    );
}