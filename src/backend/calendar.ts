import { prisma } from "../config/prisma.config";

export async function getEvents(id: number) {

    const events = await prisma.calendarEvents.findMany({
        where: {
            userId: id
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

export async function addEvent(userId: number, title: string, start: Date, end: Date, description: string) {
    const event = await prisma.calendarEvents.create({
        data: {
            userId,
            title,
            start,
            end,
            description,
        }
    }).catch((err) => {
        return err;
    });

    return { event };
}

export async function editEvent(userId: number, id: number, title: string, start: Date, end: Date, description: string) {
    const update = await prisma.calendarEvents.updateMany({
        where: {
            id,
            userId
        },
        data: {
            title,
            start,
            end,
            description,
        }
    }).catch((err) => {
        return err;
    });

    const event = await prisma.calendarEvents.findUnique({
        where: {
            id
        }
    }).catch((err) => {
        return err;
    });

    return { event };
}

export async function deleteEvent(userId:number, id: number) {
    const event = await prisma.calendarEvents.deleteMany({
        where: {
            id: id,
            userId: userId
        }
    }).catch((err) => {
        return err;
    });

    return { event };
}