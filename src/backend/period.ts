import { prisma } from "../config/prisma.config";

export async function updatePeriod(periodId: number, name: string) {
    const period = await prisma.curriculumPeriods.update({
        where: {
            id: periodId
        },
        data: {
            name
        }
    }).catch((err) => {
        return err;
    });
    return period;
}

export async function updateSubjectIds(periodId: number, subjectsIds: string[]) {
    const period = await prisma.curriculumPeriods.update({
        where: {
            id: periodId
        },
        data: {
            subjectsOrder: JSON.stringify(subjectsIds)
        }
    }).catch((err) => {
        return err;
    });
    return period;
}

export async function updateSubjectPeriodId(periodId: number, subjectId: number) {
    const subject = await prisma.userSubjects.update({
        where: {
            id: subjectId
        },
        data: {
            periodId
        }
    }).catch((err) => {
        return err;
    });
    return subject;
}
