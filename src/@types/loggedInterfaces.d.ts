interface ITimeTable {
    [key: string]: {
        [key: string]: {
            [key: string]: ISubject | '';
        }
    }
}

interface ISubject {
    id: number;
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



/* CALENDAR */
interface IEvent {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
}

interface ISelectedDate {
    start: Date,
    end: Date,
}

interface IToastStatus{
    type: 'success' | 'error' | 'info' | 'warning' | undefined;
}