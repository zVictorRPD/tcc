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

export async function deletePeriod(userId: number, periodId: number, subjectsIds: string[]) {
    const subjectsDeleted = await prisma.userSubjects.deleteMany({
        where: {
            periodId: periodId,
        }
    }).catch((err) => {
        return err;
    });



    const periodDeleted = await prisma.curriculumPeriods.delete({
        where: {
            id: periodId
        }
    }).catch((err) => {
        return err;
    });
    console.log(periodDeleted);

    const periodOrder = await prisma.curriculum.findUnique({
        where: {
            userId
        },
        select: {
            curriculumPeriodsOrder: true
        }
    }).catch((err) => {
        return err;
    });

    const newPeriodOrder = JSON.parse(periodOrder.curriculumPeriodsOrder).filter((period: number) => period !== periodId);

    const curriculumUpdated = await prisma.curriculum.update({
        where: {
            userId
        },
        data: {
            curriculumPeriodsOrder: JSON.stringify(newPeriodOrder)
        }
    }).catch((err) => {
        return err;
    });
    return curriculumUpdated;
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
