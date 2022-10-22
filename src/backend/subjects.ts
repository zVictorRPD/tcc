import { prisma } from "../config/prisma.config";

export async function getSubject(page: number, code: string, name: string, time: number) {
    let filter = {};
    if (code.length > 0) {
        filter = {
            code: {
                contains: code,
            }
        }
    }
    if (name.length > 0) {
        filter = {
            ...filter,
            name: {
                contains: name,
            }
        }
    }
    if (time > 0) {
        filter = {
            ...filter,
            time: {
                equals: time,
            }
        }
    }
    console.log(filter);
    
    const subjects = await prisma.subject.findMany({
        orderBy: {
            name: "asc"
        },
        skip: 12 * (page - 1),
        take: 12,
        where: filter,
    }).catch((err) => {
        return err;
    });

    const total = await prisma.subject.count({
        where: filter,
    }).catch((err) => {
        return err;
    });
    const totalPages = Math.ceil(total / 12);
    return { subjects, total, totalPages };
}