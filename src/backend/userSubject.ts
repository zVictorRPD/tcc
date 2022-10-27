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
