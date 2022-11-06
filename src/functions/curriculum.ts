//ABA DE PERÍODOS
export function periodTotalTime(subjectsIds: string[], subjects: ISubjects, viewType: String) {
    return Object.keys(subjects).reduce((prev: any, curr: any) => {
        if (subjectsIds.includes(curr) && (subjects[curr].status === viewType || viewType === "total")) {
            return prev + subjects[curr].time;
        }
        return prev;
    }, 0);
}

//ABA DE MATÉRIAS
export const handleSubjectCount = (subjects: ISubjects, type: 'todo' | 'doing' | 'done') => {
    return Object.values(subjects).filter(subject => subject.status === type).length;
}
export const handleSubjectGrade = (subjects: ISubjects, useDoing: boolean) => {
    const subjectsArray = useDoing ? Object.values(subjects).filter(subject => (subject.status === 'doing' || 'done') && subject.grade !== null) : Object.values(subjects).filter(subject => subject.status === 'done' && subject.grade !== null);
    if (useDoing) {
        return subjectsArray.reduce((acc, subject) => {
            if (subject.grade) return acc + subject.grade;
            return acc;
        }, 0) / subjectsArray.length;
    }
    return subjectsArray.filter(subject => subject.status === 'done').reduce((acc, subject) => {
        if (subject.grade) return acc + subject.grade;
        return acc;
    }, 0) / subjectsArray.length;
}
export const handleMainTeacher = (subjects: ISubjects,) => {
    const subjectsArray = Object.values(subjects);
    const teachers = subjectsArray.map(subject => subject.teacher?.name).filter(teacher => teacher !== null && teacher !== undefined);
    const teachersCount = teachers.reduce((acc: any, teacher: any) => {
        acc[teacher] = (acc[teacher] || 0) + 1;
        return acc;
    }, {});
    const mainTeacher = Object.keys(teachersCount).reduce((a, b) => teachersCount[a] > teachersCount[b] ? a : b);
    return mainTeacher;
}
export const handleNumberNotes = (subjects: ISubjects) => {
    const subjectsArray = Object.values(subjects);
    const notes = subjectsArray.map(subject => subject.note).filter(note => note !== null && note !== undefined);
    return notes.length;
}
export const handleNumberLinks = (subjects: ISubjects) => {
    const subjectsArray = Object.values(subjects);
    const notes = subjectsArray.map(subject => subject.links).filter(link => link !== undefined && link?.length > 0);
    return notes.flat(1).length;
}