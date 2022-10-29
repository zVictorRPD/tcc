import { prisma } from "../config/prisma.config";

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


export async function addTeacher(subjectId: number, teacherId: number) {

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

