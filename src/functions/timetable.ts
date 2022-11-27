export const TimetableObject: ITimeTable = {
    '2': {
        'm': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        't': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        'n': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
    },
    '3': {
        'm': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        't': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        'n': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
    },
    '4': {
        'm': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        't': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        'n': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
    },
    '5': {
        'm': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        't': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        'n': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
    },
    '6': {
        'm': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        't': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        'n': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
    },
    '7': {
        'm': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        't': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
        'n': {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
        },
    }
}

export const timeTableSchedule = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];

export const timeTableTranslation: ITimeTableTranslation = {
    '1-0': '07h-08h',
    '2-1': '08h-09h',
    '3-2': '09h-10h',
    '4-3': '10h-11h',
    '5-4': '11h-12h',
    '1-5': '12h-13h',
    '2-6': '13h-14h',
    '3-7': '14h-15h',
    '4-8': '15h-16h',
    '5-9': '16h-17h',
    '1-10': '17h-18h',
    '2-11': '18h-19h',
    '3-12': '19h-20h',
    '4-13': '20h-21h',
    '5-14': '21h-22h',
}

export const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];


export const removeSubject = (subjectId: string, timetable: ITimeTable) => {
    let newTimetable = timetable;
    Object.entries(newTimetable).forEach(([dayKey, day]) => {
        Object.entries(day).forEach(([periodKey, period]) => {
            Object.entries(period).forEach(([keySubject, subject]) => {
                if (subject === "" || typeof subject !== 'object') return;
                if (subject.id === subjectId) newTimetable[dayKey][periodKey][keySubject] = "";
            });
        });
    });
    return newTimetable;
};

export const updateSubjectColor = (subjectId: string, color: string, timetable: ITimeTable) => {
    let newTimetable = timetable;
    Object.entries(newTimetable).forEach(([dayKey, day]) => {
        Object.entries(day).forEach(([periodKey, period]) => {
            Object.entries(period).forEach(([keySubject, subject]) => {
                if (subject === "" || typeof subject !== 'object') return;
                if (subject.id === subjectId) newTimetable[dayKey][periodKey][keySubject] = { ...subject, bgColor: color };
            });
        });
    });
    return newTimetable;
};

export const getExcelData = (timetable: ITimeTable, subjects: ISubjects) => {
    let excelData: any = [];
    timeTableSchedule.forEach((time, index) => {
        let obj: any = {};
        obj['Horário'] = timeTableTranslation[`${time}-${index}`];
        Object.values(timetable).forEach((day: any, i) => {
            if (index < 5) {
                obj[weekDays[i]] = typeof day.m[time] !== "object" ? "" : subjects[day.m[time].id].name;
            } else if (index < 10) {
                obj[weekDays[i]] = typeof day.t[time] !== "object" ? "" : subjects[day.t[time].id].name;
            } else {
                obj[weekDays[i]] = typeof day.n[time] !== "object" ? "" : subjects[day.n[time].id].name;
            }
        });
        excelData.push(obj);
    });
    const finalObj = {
        Grade_Horária: excelData
    }
    return finalObj;
};

//DASHBOARD

export const timeNumberTranslation: any = {
    '1-0': 7,
    '2-1': 8,
    '3-2': 9,
    '4-3': 10,
    '5-4': 11,
    '1-5': 12,
    '2-6': 13,
    '3-7': 14,
    '4-8': 15,
    '5-9': 16,
    '1-10': 17,
    '2-11': 18,
    '3-12': 19,
    '4-13': 20,
    '5-14': 21,
}

export const getDashbordData = (timetable: ITimeTable, subjects: ISubject[]) => {
    let finalObject: any = {};
    Object.values(timetable).forEach((day: any, i) => {
        let obj: any = {};
        let dayObj: any = {};
        timeTableSchedule.forEach((time, index) => {
            const key = timeNumberTranslation[`${time}-${index}`];
            if (index < 5) {
                typeof day.m[time] !== "object" ? "" : dayObj[key] = subjects.find(subject => subject.id.toString() === day.m[time].id);
            } else if (index < 10) {
                typeof day.t[time] !== "object" ? "" : dayObj[key] = subjects.find(subject => subject.id.toString() === day.t[time].id);
            } else {
                typeof day.n[time] !== "object" ? "" : dayObj[key] = subjects.find(subject => subject.id.toString() === day.n[time].id);
            }
        });
        obj[weekDays[i]] = dayObj;
        finalObject = { ...finalObject, ...obj };
    });
    return finalObject;
};

