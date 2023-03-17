import { prisma } from "../config/prisma.config";

export async function createSubject(userId: number, periodId: number, subjectCode: string, type: boolean) {
    //check if subject exists
    const subjectExists = await prisma.subject.findUnique({
        where: {
            code: subjectCode
        },
        select: {
            code: true
        }
    }).catch((err) => {
        return err;
    });
    if (!subjectExists) return { error: "Essa matéria não existe" };
    const subject = await prisma.userSubjects.create({
        data: {
            userId,
            periodId,
            subjectCode,
            isOptional: type
        },
        include: {
            subject: true,
        }
    }).catch((err) => {
        return err;
    });
    const subjectsOrder = await prisma.curriculumPeriods.findUnique({
        where: {
            id: periodId
        },
        select: {
            subjectsOrder: true
        }
    });
    let newOrderArray = [];
    if (subjectsOrder && subjectsOrder.subjectsOrder !== null) {
        const orderArray = JSON.parse(subjectsOrder.subjectsOrder);
        newOrderArray = [...orderArray, subject.id];
    } else {
        newOrderArray = [subject.id];
    }

    const period = await prisma.curriculumPeriods.update({
        where: {
            id: periodId
        },
        data: {
            subjectsOrder: JSON.stringify(newOrderArray)
        }
    }).catch((err) => {
        return err;
    });
    const subjectObject = {
        ...subject,
        ...subject.subject
    };
    delete subjectObject.subject;
    return {
        ...subjectObject,
        id: subjectObject.id.toString(),
    };
}

export async function deleteSubject(userId: number, subjectId: number, periodId: number) {
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

    const periodToEdit = curriculum.curriculumPeriods.find((period: any) => period.id === periodId);

    if (!periodToEdit || periodToEdit.length === 0) return { error: "Unauthorized" };

    const period = await prisma.curriculumPeriods.findUnique({
        where: {
            id: periodId
        },
        select: {
            subjectsOrder: true
        }
    }).catch((err) => {
        return err;
    });
    const orderArray = JSON.parse(period.subjectsOrder);
    const newOrderArray = orderArray.filter((id: number) => id !== subjectId);
    const updatedPeriod = await prisma.curriculumPeriods.update({
        where: {
            id: periodId
        },
        data: {
            subjectsOrder: JSON.stringify(newOrderArray)
        }
    }).catch((err) => {
        return err;
    });
    const deletedSubject = await prisma.userSubjects.delete({
        where: {
            id: subjectId
        }
    }).catch((err) => {
        return err;
    });
    return deletedSubject;
}

export async function updateSubjectStatus(userId: number, subjectId: number, status: string) {
    const subjectEdited = await prisma.userSubjects.updateMany({
        where: {
            id: subjectId,
            userId: userId
        },
        data: {
            status: status
        }
    }).catch((err) => {
        return err;
    });
    const subject = await prisma.userSubjects.findUnique({
        where: {
            id: subjectId
        },
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function updateSubjectNote(userId: number, subjectId: number, text: string) {
    const subjectEdited = await prisma.userSubjects.updateMany({
        where: {
            id: subjectId,
            userId: userId
        },
        data: {
            note: text
        }
    }).catch((err) => {
        return err;
    });
    const subject = await prisma.userSubjects.findUnique({
        where: {
            id: subjectId
        },
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function updateSubjectLink(userId: number, subjectId: number, links: string) {
    const subjectEdited = await prisma.userSubjects.updateMany({
        where: {
            id: subjectId,
            userId: userId
        },
        data: {
            links: JSON.stringify(links)
        }
    }).catch((err) => {
        return err;
    });

    const subject = await prisma.userSubjects.findUnique({
        where: {
            id: subjectId
        },
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function updateSubjectGrade(userId: number, subjectId: number, grade: number) {
    const subjectEdited = await prisma.userSubjects.updateMany({
        where: {
            userId: userId,
            id: subjectId
        },
        data: {
            grade: grade
        }
    }).catch((err) => {
        return err;
    });
    const subject = await prisma.userSubjects.findUnique({
        where: {
            id: subjectId
        },
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function createTeacher(userId: number, subjectId: number, teacherId: number) {

    const update = await prisma.userSubjects.updateMany({
        where: {
            id: subjectId,
            userId: userId
        },
        data: {
            teacherId: teacherId
        }
    }).catch((err) => {
        return err;
    });

    const subject = await prisma.userSubjects.findUnique({
        where: {
            id: subjectId
        },
        include: {
            teacher: true
        }
    }).catch((err) => {
        return err;
    });

    return subject;
}

export async function updateAllSubjectStatus(userId: number, periodId: number, status: string) {
    const subjects = await prisma.userSubjects.updateMany({
        where: {
            userId: userId,
            periodId: periodId
        },
        data: {
            status: status
        }
    }).catch((err) => {
        return err;
    });
    return {
        changed: true,
    };
}