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
    type?: string;
    status?: string;
    note?: string;
    links?: ILink[];
    grade?: number;
    teacher?: ITeacher;
}
interface ILink {
    name: string;
    url: string;
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

interface ISelectedSubject extends ISubject {
    periodId: string;
}

interface ICurriculumContext {
    userId: number;
    hasCurriculum: boolean;
    setHasCurriculum: React.Dispatch<React.SetStateAction<boolean>>;
    courses: Object[];
    setCourses: React.Dispatch<React.SetStateAction<Object[]>>;
    periods: IPeriods;
    subjects: ISubjects;
    periodOrder: string[];
    setPeriods: React.Dispatch<React.SetStateAction<IPeriods>>;
    setSubjects: React.Dispatch<React.SetStateAction<ISubjects>>;
    setPeriodOrder: React.Dispatch<React.SetStateAction<string[]>>;
    selectedSubject: ISelectedSubject;
    setSelectedSubject: React.Dispatch<React.SetStateAction<ISelectedSubject>>;
    addSubjectModalIsOpen: boolean;
    addSubjectModalOnOpen: () => void;
    addSubjectModalOnClose: () => void;
    subjectModalIsOpen: boolean;
    subjectModalOnOpen: () => void;
    subjectModalOnClose: () => void;
    selectCurriculumModalIsOpen: boolean;
    selectCurriculumModalOnOpen: () => void;
    selectCurriculumModalOnClose: () => void;
    curriculumDrawerIsOpen: boolean;
    curriculumDrawerOnOpen: () => void;
    curriculumDrawerOnClose: () => void;
    onLoad: boolean;
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

/* SUBJECTS */
interface ISubjectList {
    code: string;
    name: string;
    time: number;
}

/* TEACHERS */
interface ITeacher extends IDepartament {
    id: number;
    avatar: string;
    name: string;
    email?: string;
    lattes?: string;
}

interface IDepartament {
    departament_code: string;
    departament_name: string;
}

/* CALENDAR */
interface IEvent {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    description?: string;
}

interface IToastStatus {
    type: 'success' | 'error' | 'info' | 'warning' | undefined;
}


/* EDITAR PERFIL */
interface IEditProfile {
    avatar: File | null;
    name: string;
    password: string;
    confirmationPassword: string;
}

interface IEditProfileValidation {
    avatar: boolean;
    name: boolean;
    password: boolean;
    confirmationPassword: boolean;
}

/* MAPA */
interface ILocal {
    id: number;
    name: string;
    label: string;
    lat: number;
    lng: number;
}