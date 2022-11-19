import { prisma } from "../config/prisma.config";

export async function getEvents(id: number) {

    const events = await prisma.calendarEvents.findMany({
        take: 6,
        where: {
            userId: id,
            start: {
                gte: new Date()
            }
        },
    }).catch((err) => {
        return err;
    });

    const total = await prisma.calendarEvents.count({
        where: {
            userId: id
        }
    }).catch((err) => {
        return err;
    });
    return { events, total };
}