export const periodsData: IPeriods = {
    '1': {
        id: '1',
        name: '1º Período',
        subjectIds: ['1', '2']
    },
    '2': {
        id: '2',
        name: '2º Período',
        subjectIds: ['3', '4']
    },
}

export const subjectsData: ISubjects = {
    '1': {
        id: '1',
        code: 'MAT-001',
        name: 'Matemática',
        period: '1º Período',
        time: '08:00 - 09:00',
        type: 'Teórica'
    },
    '2': {
        id: '2',
        code: 'FIS-001',
        name: 'Física',

        period: '1º Período',
        time: '09:00 - 10:00',
        type: 'Teórica'
    },
    '3': {
        id: '3',
        code: 'MAT-002',
        name: 'Matemática',
        period: '2º Período',
        time: '08:00 - 09:00',
        type: 'Teórica'
    },
    '4': {
        id: '4',
        code: 'FIS-002',
        name: 'Física',
        period: '2º Período',
        time: '09:00 - 10:00',
        type: 'Teórica'
    },
}

export const periodOrderData: string[] = ['1', '2']