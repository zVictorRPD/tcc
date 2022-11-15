export const removeSubject = (subjectId: string, timetable: ITimeTable) => {
    let newTimetable = timetable;
    Object.entries(newTimetable).forEach(([dayKey, day]) => {
        Object.entries(day).forEach(([periodKey, period]) => {
            Object.entries(period).forEach(([keySubject, subject]) => {
                if(subject === "" || typeof subject !== 'object') return;
                if(subject.id === subjectId) newTimetable[dayKey][periodKey][keySubject] = "";
            });
        });
    });
    return newTimetable;
};