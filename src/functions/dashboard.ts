//ABA DE CURSO  
export function getDoneWorkload(subjects: ISubject[], complementary: IComplementary[], useDoing: boolean, totalWorkload: IWorkload) {
    const doneComplementary = complementary.reduce((acc, cur) => {
        if (cur.time > 0) return acc + cur.time;
        return acc;
    }, 0);
    const subjectsArray = useDoing ?
        Object.values(subjects).filter(subject => (subject.status === 'doing' || 'done'))
        : Object.values(subjects).filter(subject => subject.status === 'done');
    const normalSubjects = subjectsArray.filter(subject => !subject.isOptional);
    const doneObrigatory = normalSubjects.reduce((acc, cur: any) => {
        if (cur.time) return acc + cur.time;
        return acc;
    }, 0);
    const optionalSubjects = subjectsArray.filter(subject => subject.isOptional);
    const doneOptional = optionalSubjects.reduce((acc, cur: any) => {
        if (cur.time) return acc + cur.time;
        return acc;
    }, 0);

    const result = {
        complementary: doneComplementary > totalWorkload.complementary ? totalWorkload.complementary : doneComplementary,
        obrigatory: doneObrigatory > totalWorkload.obrigatory ? totalWorkload.obrigatory : doneObrigatory,
        optional: doneOptional > totalWorkload.optional ? totalWorkload.optional : doneOptional,
    }
    return {
        ...result,
        total: result.complementary + result.obrigatory + result.optional
    }
}

interface ITimetableDashboard {
    "Segunda": {
        "7": ISubject;
        "8": ISubject;
        "9": ISubject;
        "10": ISubject;
        "11": ISubject;
        "12": ISubject;
        "13": ISubject;
        "14": ISubject;
        "15": ISubject;
        "16": ISubject;
        "17": ISubject;
        "18": ISubject;
        "19": ISubject;
        "20": ISubject;
        "21": ISubject;
    },
    "Terça": {
        "7": ISubject;
        "8": ISubject;
        "9": ISubject;
        "10": ISubject;
        "11": ISubject;
        "12": ISubject;
        "13": ISubject;
        "14": ISubject;
        "15": ISubject;
        "16": ISubject;
        "17": ISubject;
        "18": ISubject;
        "19": ISubject;
        "20": ISubject;
        "21": ISubject;
    },
    "Quarta": {
        "7": ISubject;
        "8": ISubject;
        "9": ISubject;
        "10": ISubject;
        "11": ISubject;
        "12": ISubject;
        "13": ISubject;
        "14": ISubject;
        "15": ISubject;
        "16": ISubject;
        "17": ISubject;
        "18": ISubject;
        "19": ISubject;
        "20": ISubject;
        "21": ISubject;
    },
    "Quinta": {
        "7": ISubject;
        "8": ISubject;
        "9": ISubject;
        "10": ISubject;
        "11": ISubject;
        "12": ISubject;
        "13": ISubject;
        "14": ISubject;
        "15": ISubject;
        "16": ISubject;
        "17": ISubject;
        "18": ISubject;
        "19": ISubject;
        "20": ISubject;
        "21": ISubject;
    },
    "Sexta": {
        "7": ISubject;
        "8": ISubject;
        "9": ISubject;
        "10": ISubject;
        "11": ISubject;
        "12": ISubject;
        "13": ISubject;
        "14": ISubject;
        "15": ISubject;
        "16": ISubject;
        "17": ISubject;
        "18": ISubject;
        "19": ISubject;
        "20": ISubject;
        "21": ISubject;
    },
    "Sábado": {
        "7": ISubject;
        "8": ISubject;
        "9": ISubject;
        "10": ISubject;
        "11": ISubject;
        "12": ISubject;
        "13": ISubject;
        "14": ISubject;
        "15": ISubject;
        "16": ISubject;
        "17": ISubject;
        "18": ISubject;
        "19": ISubject;
        "20": ISubject;
        "21": ISubject;
    }
}

const hourTranslation: ITimeTableTranslation = {
    '7': '07:00 - 08:00',
    '8': '08:00 - 09:00',
    '9': '09:00 - 10:00',
    '10': '10:00 - 11:00',
    '11': '11:00 - 12:00',
    '12': '12:00 - 13:00',
    '13': '13:00 - 14:00',
    '14': '14:00 - 15:00',
    '15': '15:00 - 16:00',
    '16': '16:00 - 17:00',
    '17': '17:00 - 18:00',
    '18': '18:00 - 19:00',
    '19': '19:00 - 20:00',
    '20': '20:00 - 21:00',
    '21': '21:00 - 22:00',
}

export const getNextClass = (timetable: ITimetableDashboard) => {
    const date = new Date();
    const day = date.getDay();
    const dayHour = date.getHours();
    let nextClass: any = null;
    if (day !== 0) {
        const dayObject = Object.entries(timetable).slice(day - 1);
        dayObject.every((obj, index) => {
            if(Object.keys(obj[1]).length === 0) return true;
            const hours = index === 0 ? Object.keys(obj[1]).filter(hour => parseInt(hour) > dayHour) : Object.keys(obj[1]);
            if(hours.length === 0) return true;
            nextClass = {
                day: obj[0],
                hour: hourTranslation[hours[0]],
                subject: obj[1][hours[0]]
            } ;
            return false;
        });       
    }
    if(nextClass === null) {
        Object.values(timetable).every((day, index) => {
            if (Object.keys(day).length === 0) return true;
            nextClass = {
                day: Object.keys(timetable)[index],
                hour: hourTranslation[Object.keys(day)[0]],
                subject: day[Object.keys(day)[0]]
            };
            return false;
        });
    }
    
    return nextClass;
}