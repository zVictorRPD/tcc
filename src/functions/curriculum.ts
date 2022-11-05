export function periodTotalTime(subjectsIds: string[], subjects: ISubjects, viewType: String) {
    return Object.keys(subjects).reduce((prev: any, curr: any) => {
        if (subjectsIds.includes(curr) && (subjects[curr].status === viewType || viewType === "total") ) {
            return prev + subjects[curr].time;
        }
        return prev;
    }, 0);

}