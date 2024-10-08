import { prisma } from "../config/prisma.config";

export async function getEvents(userId: number) {

    const events = await prisma.calendarEvents.findMany({
        take: 6,
        where: {
            userId,
            start: {
                gte: new Date()
            }
        },
    }).catch((err) => {
        return err;
    });
    const chronologicalOrder = events.sort((a: any, b: any) => a.start.getTime() - b.start.getTime());
    return chronologicalOrder;
}

export async function getDashboardData(id: number) {

    const userData = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            hasCurriculum: true,
            curriculum: {
                select: {
                    course: true
                }
            },
            timetable: true,
            userComplementary: true
        }
    }).catch((err) => {
        return err;
    });

    if (!userData.hasCurriculum) return { hasCurriculum: false };

    const subjects = await prisma.userSubjects.findMany({
        where: {
            userId: id,
        },
        include: {
            subject: true,
            teacher: true
        }
    }).catch((err) => {
        return err;
    });

    let userSubjects = [];

    if (subjects.length > 0) {
        userSubjects = subjects.map((subject: any) => {
            const newSubject = {
                ...subject,
                links: JSON.parse(subject.links),
                ...subject.subject,
            }
            delete newSubject.subject;
            return newSubject;
        });
    }

    
    return {
        course: userData.curriculum[0].course,
        subjects: userSubjects,
        hasCurriculum: true,
        timetable: userData.timetable !== null && userData.timetable ? JSON.parse(userData.timetable) : null,
        complementary: userData.userComplementary.length > 0 ? userData.userComplementary : null
    };

}