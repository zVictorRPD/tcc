interface ITimeTable {
    [key: string]: {
        [key: string]: {
            [key: string]: ISubject | '';
        }
    }
}

interface ISubject {
    id: string;
    code: string;
    name: string;
    period: string;
    time: string;
    type: string;
}

interface ITimeTableTranslation {
    [key: string]: string;
}

interface ITimetableContext {
    timetableSubjects: ITimeTable;
    setTimetableSubjects: React.Dispatch<React.SetStateAction<ITimeTable>>;
    addSubjectModalIsOpen: boolean;
    addSubjectModalOnOpen: () => void;
    addSubjectModalOnClose: () => void;
}

interface IAddSubjectModalTimetable {
    period: string;
    subject: string;
    defaultTimeType: boolean;
    times: string[];
}



/* GRADE CURRICULAR */

interface IPeriods {
    [key: string]: {
        id: string;
        name: string;
        subjectIds: string[];
    }
}

interface ISubjects {
    [key: string]: ISubject;
}

interface ICurriculumContext {
    periods: IPeriods;
    subjects: ISubjects;
    periodOrder: string[];
    setPeriods: React.Dispatch<React.SetStateAction<IPeriods>>;
    setSubjects: React.Dispatch<React.SetStateAction<ISubjects>>;
    setPeriodOrder: React.Dispatch<React.SetStateAction<string[]>>;
}



/* CALENDAR */
interface IEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    description?: string;
}

interface IToastStatus {
    type: 'success' | 'error' | 'info' | 'warning' | undefined;
}