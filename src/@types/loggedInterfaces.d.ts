interface INotifications {
    id: string;
    title: string;
    description: string;
    date: string;
}

interface IDashboardContext {
    onLoad: boolean;
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
    hasCurriculum: boolean;
    course: ICourse;
    subjects: ISubject[];
    selectedSubject: ISubject;
    setSelectedSubject: React.Dispatch<React.SetStateAction<ISubject>>;
    timetable: ITimeTable;
    complementary: IComplementary[];
    events: IEvent[];
    eventData: IEvent;
    setEventData: React.Dispatch<React.SetStateAction<IEvent>>;
    eventModalIsOpen: boolean;
    eventModalOnOpen: () => void;
    eventModalOnClose: () => void;
    subjectModalIsOpen: boolean;
    subjectModalOnOpen: () => void;
    subjectModalOnClose: () => void;
}

interface INextClass {
    subject: ISubject;
    hour: string;
    day: string;
};


interface ITimeTable {
    [key: string]: {
        [key: string]: {
            [key: string]: string | {
                id: string;
                bgColor: string;
            };
        }
    }
}

interface ISubject {
    id: string;
    code: string;
    name: string;
    period: string;
    time: string;
    isOptional: boolean;
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
interface IComplementary {
    id: number;
    name: string;
    time: number;
}

interface ITimeTableTranslation {
    [key: string]: string;
}

interface ITimetableContext {
    hasCurriculum: boolean;
    timetableSubjects: ITimeTable;
    periods: IPeriods;
    subjects: ISubjects;
    selectedSubject: ISubject;
    selectedColor: string;
    setTimetableSubjects: React.Dispatch<React.SetStateAction<ITimeTable>>;
    setPeriods: React.Dispatch<React.SetStateAction<IPeriods>>;
    setSubjects: React.Dispatch<React.SetStateAction<ISubjects>>;
    setSelectedSubject: React.Dispatch<React.SetStateAction<ISubject>>;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
    addSubjectModalIsOpen: boolean;
    addSubjectModalOnOpen: () => void;
    addSubjectModalOnClose: () => void;
    subjectModalIsOpen: boolean;
    subjectModalOnOpen: () => void;
    subjectModalOnClose: () => void;
    onLoad: boolean;
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAddSubjectModalTimetable {
    color: string;
    period: string;
    subject: string;
    time: string;
}

/* GRADE CURRICULAR */
interface ICourse {
    code: string;
    name: string;
    period_emergence: string;
    workload_academic_professional_guidance: number;
    workload_complementary: number;
    workload_normal_lessons: number;
    workload_optional_lessons: number;
    workload_total: number;
}

interface IWorkload {
    complementary: number;
    obrigatory: number;
    optional: number;
    total: number;
}

interface IPeriods {
    [key: string]: {
        id: string;
        name: string;
        visible: boolean;
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
    hasCurriculum: boolean;
    setHasCurriculum: React.Dispatch<React.SetStateAction<boolean>>;
    course: ICourse;
    setCourse: React.Dispatch<React.SetStateAction<ICourse>>;
    courses: Object[];
    setCourses: React.Dispatch<React.SetStateAction<Object[]>>;
    periods: IPeriods;
    subjects: ISubjects;
    subjectsFilter: ISubjectFilter;
    complementary: IComplementary[];
    periodOrder: string[];
    setPeriods: React.Dispatch<React.SetStateAction<IPeriods>>;
    setSubjects: React.Dispatch<React.SetStateAction<ISubjects>>;
    setSubjectsFilter: React.Dispatch<React.SetStateAction<ISubjectFilter>>;
    setComplementary: React.Dispatch<React.SetStateAction<IComplementary[]>>;
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
    disclaimerIsOpen: boolean;
    disclaimerOnOpen: () => void;
    disclaimerOnClose: () => void;
    cancelRef: React.MutableRefObject<null>;
    onLoad: boolean;
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISubjectsFilter {
    obligatory: boolean;
    optional: boolean;
    todo: boolean;
    doing: boolean;
    done: boolean;
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

interface ICalendarAcademicDate {
    name: string;
    date: Date;
    daysLeft: number;
    hoursLeft: number;
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