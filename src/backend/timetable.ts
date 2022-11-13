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

