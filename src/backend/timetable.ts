import { prisma } from "../config/prisma.config";

export async function getTimetable(userId: number) {
    const timetable = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            timetable: true
        }
    });
    return timetable;
}

export async function addTimetable(userId: number, timetable: ITimeTable) {
    const response = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            timetable: JSON.stringify(timetable)
        }
    });
    return { success: true };
}

