//FILTRO PADRÃO
export const defaultFilter = {
    obligatory: true,
    optional: true,
    todo: true,
    doing: true,
    done: true,
};

export function isAnFilter(obj: any): obj is ISubjectsFilter {
    return (
        "obligatory" in obj &&
        "optional" in obj &&
        "todo" in obj &&
        "doing" in obj &&
        "done" in obj
    );
}

export function filterSubject(subject: ISubject, filter: ISubjectsFilter) {
    if (subject.isOptional && !filter.optional) return false;
    if (!subject.isOptional && !filter.obligatory) return false;
    if (subject.status === "todo" && !filter.todo) return false;
    if (subject.status === "doing" && !filter.doing) return false;
    if (subject.status === "done" && !filter.done) return false;
    return true;
}

//ABA DE CURSO
export function getDoneWorkload(
    subjects: ISubjects,
    complementary: IComplementary[],
    useDoing: boolean,
    totalWorkload: IWorkload
) {
    const doneComplementary = complementary.reduce((acc, cur) => {
        if (cur.time > 0) return acc + cur.time;
        return acc;
    }, 0);
    const subjectsArray = useDoing
        ? Object.values(subjects).filter(
              (subject) => subject.status === "doing" || "done"
          )
        : Object.values(subjects).filter(
              (subject) => subject.status === "done"
          );
    const normalSubjects = subjectsArray.filter(
        (subject) => !subject.isOptional
    );
    const doneObrigatory = normalSubjects.reduce((acc, cur: any) => {
        if (cur.time) return acc + cur.time;
        return acc;
    }, 0);
    const optionalSubjects = subjectsArray.filter(
        (subject) => subject.isOptional
    );
    const doneOptional = optionalSubjects.reduce((acc, cur: any) => {
        if (cur.time) return acc + cur.time;
        return acc;
    }, 0);

    const result = {
        complementary:
            doneComplementary > totalWorkload.complementary
                ? totalWorkload.complementary
                : doneComplementary,
        obrigatory:
            doneObrigatory > totalWorkload.obrigatory
                ? totalWorkload.obrigatory
                : doneObrigatory,
        optional:
            doneOptional > totalWorkload.optional
                ? totalWorkload.optional
                : doneOptional,
    };
    return {
        ...result,
        total: result.complementary + result.obrigatory + result.optional,
    };
}

//ABA DE PERÍODOS
export function periodTotalTime(
    subjectsIds: string[],
    subjects: ISubjects,
    viewType: String
) {
    return Object.keys(subjects).reduce((prev: any, curr: any) => {
        if (
            subjectsIds.includes(curr) &&
            (subjects[curr].status === viewType || viewType === "total")
        ) {
            return prev + subjects[curr].time;
        }
        return prev;
    }, 0);
}

//ABA DE MATÉRIAS
export const handleSubjectCount = (
    subjects: ISubjects,
    type: "todo" | "doing" | "done"
) => {
    return Object.values(subjects).filter((subject) => subject.status === type)
        .length;
};
export const handleSubjectGrade = (subjects: ISubjects, useDoing: boolean) => {
    const subjectsArray = useDoing
        ? Object.values(subjects).filter(
              (subject) =>
                  (subject.status === "doing" || "done") &&
                  subject.grade !== null
          )
        : Object.values(subjects).filter(
              (subject) => subject.status === "done" && subject.grade !== null
          );
    if (subjectsArray.length === 0) return 0;
    if (useDoing) {
        return (
            subjectsArray.reduce((acc, subject) => {
                if (subject.grade) return acc + subject.grade;
                return acc;
            }, 0) / subjectsArray.length
        );
    }
    return (
        subjectsArray.reduce((acc, subject) => {
            if (subject.grade) return acc + subject.grade;
            return acc;
        }, 0) / subjectsArray.length
    );
};
export const handleMainTeacher = (subjects: ISubjects) => {
    const subjectsArray = Object.values(subjects);
    const teachers = subjectsArray
        .map((subject) => subject.teacher?.name)
        .filter((teacher) => teacher !== null && teacher !== undefined);
    if (teachers.length === 0) return "Nenhum professor atribuído";

    const teachersCount = teachers.reduce((acc: any, teacher: any) => {
        acc[teacher] = (acc[teacher] || 0) + 1;
        return acc;
    }, {});
    const mainTeacher = Object.keys(teachersCount).reduce((a, b) =>
        teachersCount[a] > teachersCount[b] ? a : b
    );
    return mainTeacher;
};
export const handleNumberNotes = (subjects: ISubjects) => {
    const subjectsArray = Object.values(subjects);
    const notes = subjectsArray
        .map((subject) => subject.note)
        .filter((note) => note !== null && note !== undefined);
    return notes.length;
};
export const handleNumberLinks = (subjects: ISubjects) => {
    const subjectsArray = Object.values(subjects);
    const notes = subjectsArray
        .map((subject) => subject.links)
        .filter((link) => link !== undefined && link?.length > 0);
    return notes.flat(1).length;
};

export function filterAndExtractNames(array: any) {
    const uniqueNames: any = {};
    const result: any = [];

    array.forEach((item: any) => {
        const name = item.name;

        if (!uniqueNames[name]) {
            uniqueNames[name] = true;
            result.push(name);
        }
    });

    return result;
}

export function getPeriodsOfTheSelectedCourse(
    courses: any[],
    selectedCourse: string
) {
    return courses.filter((course) => course.name === selectedCourse);
}
