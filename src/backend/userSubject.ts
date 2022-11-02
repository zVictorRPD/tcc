import { prisma } from "../config/prisma.config";

export async function createSubject(userId: number, periodId: number, subjectCode: string) {
    const subject = await prisma.userSubjects.create({
        data: {
            userId,
            periodId,
            subjectCode,
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
    return subjectObject;
}

export async function deleteSubject(subjectId: number, periodId: number) {
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

export async function updateSubjectStatus(subjectId: number, status: string) {
    const subject = await prisma.userSubjects.update({
        where: {
            id: subjectId
        },
        data: {
            status: status
        }
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function updateSubjectNote(subjectId: number, text: string) {
    const subject = await prisma.userSubjects.update({
        where: {
            id: subjectId
        },
        data: {
            note: text
        }
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function updateSubjectLink(subjectId: number, links: string) {
    const subject = await prisma.userSubjects.update({
        where: {
            id: subjectId
        },
        data: {
            links: JSON.stringify(links)
        }
    }).catch((err) => {
        return err;
    });
    return subject;
}

export async function updateSubjectGrade(subjectId: number, grade: number) {
    const subject = await prisma.userSubjects.update({
        where: {
            id: subjectId
        },
        data: {
            grade: grade
        }
    }).catch((err) => {
        return err;
    });
    return subject;
}


export async function createTeacher(subjectId: number, teacherId: number) {

    const subject = await prisma.userSubjects.update({
        where: {
            id: subjectId
        },
        data: {
            teacherId: teacherId
        },
        include: {
            teacher: true
        }
    }).catch((err) => {
        return err;
    });

    return subject;
}

