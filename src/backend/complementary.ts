import { prisma } from "../config/prisma.config";

export async function getComplementary(userId: number) {
    const complementary = await prisma.userComplementary.findMany({
        where: {
            userId: userId
        },
    });
    return complementary;
}

export async function createComplementary(userId: number, name: string, time: number) {
    const complementary = await prisma.userComplementary.create({
        data: {
            name: name,
            time,
            userId,
        }
    }).catch((err) => {
        return err;
    });

    return complementary;
}
