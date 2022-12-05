import { prisma } from "../config/prisma.config";

export async function createPeriod(userId: number, name: string) {

    const curriculum = await prisma.curriculum.findUnique({
        where: {
            userId: userId
        },
        select: {
            id: true,
            curriculumPeriodsOrder: true
        },

    }).catch((err) => {
        return err;
    });;

    if (!curriculum || !curriculum.id || !curriculum.curriculumPeriodsOrder) return { error: "Unauthorized" };

    const newPeriod = await prisma.curriculumPeriods.create({
        data: {
            name: name,
            curriculumId: curriculum.id,
        },
        select: {
            id: true,
            name: true,
            visible: true,
        }
    }).catch((err) => {
        return err;
    });;

    const periodsOrder = JSON.parse(curriculum.curriculumPeriodsOrder);
    const newOrder = [...periodsOrder, newPeriod.id];

    await prisma.curriculum.update({
        where: {
            id: curriculum.id
        },
        data: {
            curriculumPeriodsOrder: JSON.stringify(newOrder)
        }
    }).catch((err) => {
        return err;
    });
    return {
        id: newPeriod.id.toString(),
        name: newPeriod.name,
        visible: newPeriod.visible,
        subjectIds: []
    }
}


export async function updatePeriod(userId:number, periodId: number, name: string) {
    const curriculum = await prisma.curriculum.findUnique({
        where: {
            userId: userId
        },
        select: {
            curriculumPeriods: true
        }
    }).catch((err) => {
        return err;
    });

    if (!curriculum || !curriculum.curriculumPeriods) return { error: "Unauthorized" };

    const periodToEdit = curriculum.curriculumPeriods.find((period:any) => period.id === periodId);

    if (!periodToEdit || periodToEdit.length === 0) return { error: "Unauthorized" };
    
    const period = await prisma.curriculumPeriods.updateMany({
        where: {
            id: periodId,
        },
        data: {
            name
        }
    }).catch((err) => {
        return err;
    });
    return period;
}

export async function deletePeriod(userId: number, periodId: number) {
    const subjectsDeleted = await prisma.userSubjects.deleteMany({
        where: {
            periodId: periodId,
            userId: userId
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

export async function updatePeriodVisibility(userId:number, periodId: number, visible: boolean) {
    const curriculum = await prisma.curriculum.findUnique({
        where: {
            userId: userId
        },
        select: {
            curriculumPeriods: true
        }
    }).catch((err) => {
        return err;
    });

    if (!curriculum || !curriculum.curriculumPeriods) return { error: "Unauthorized" };

    const periodToEdit = curriculum.curriculumPeriods.find((period:any) => period.id === periodId);

    if (!periodToEdit || periodToEdit.length === 0) return { error: "Unauthorized" };
    
    const period = await prisma.curriculumPeriods.update({
        where: {
            id: periodId
        },
        data: {
            visible, 
        }
    }).catch((err) => {
        return err;
    });
    return period;
}

export async function updateSubjectIds(userId:number, periodId: number, subjectsIds: number[]) {
    const curriculum = await prisma.curriculum.findUnique({
        where: {
            userId: userId
        },
        select: {
            curriculumPeriods: true
        }
    }).catch((err) => {
        return err;
    });

    if (!curriculum || !curriculum.curriculumPeriods) return { error: "Unauthorized" };

    const periodToEdit = curriculum.curriculumPeriods.find((period:any) => period.id === periodId);

    if (!periodToEdit || periodToEdit.length === 0) return { error: "Unauthorized" };
    
    const period = await prisma.curriculumPeriods.updateMany({
        where: {
            id: periodId,
        },
        data: {
            subjectsOrder: JSON.stringify(subjectsIds)
        }
    }).catch((err) => {
        return err;
    });
    return period;
}

export async function updateSubjectPeriodId(userId: number, periodId: number, subjectId: number) {
    const curriculum = await prisma.curriculum.findUnique({
        where: {
            userId: userId
        },
        select: {
            curriculumPeriods: true
        }
    }).catch((err) => {
        return err;
    });

    if (!curriculum || !curriculum.curriculumPeriods) return { error: "Unauthorized" };

    const periodToEdit = curriculum.curriculumPeriods.find((period:any) => period.id === periodId);

    if (!periodToEdit || periodToEdit.length === 0) return { error: "Unauthorized" };
    
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
