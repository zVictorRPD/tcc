import { prisma } from "../config/prisma.config";

export async function getSubjectRating(userId: number, subjectCode: string) {
    const userRating = await prisma.rating.findMany({
        where: {
            userId: userId,
            subjectCode: subjectCode,
        }
    }).catch((err) => {
        return err;
    });
    const subjectRating = await prisma.rating.findMany({
        where: {
            subjectCode: subjectCode,
        },
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                }
            },
        }
    }).catch((err) => {
        return err;
    });
    return {userRating, subjectRating};
}

export async function createRating(userId: number, subjectCode: string, complexity: number, relevance: number, comment: string) {
    const userRating = await prisma.rating.findMany({
        where: {
            userId: userId,
            subjectCode: subjectCode,
        }
    }).catch((err) => {
        return err;
    });
    if (userRating.length > 0) {
        const updatedRating = await prisma.rating.update({
            where: {
                id: userRating[0].id,
            },
            data: {
                userId: userId,
                subjectCode: subjectCode,
                complexity: complexity,
                relevance: relevance,
                comment: comment,
            }
        }).catch((err) => {
            return err;
        });
        return updatedRating;
    }else {
        const newRating = await prisma.rating.create({
            data: {
                userId: userId,
                subjectCode: subjectCode,
                complexity: complexity,
                relevance: relevance,
                comment: comment,
            }
        }).catch((err) => {
            return err;
        });
        return newRating;
    }
}