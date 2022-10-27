import { prisma } from "../config/prisma.config";

export async function updatePeriod(periodId: number, name: string) {
    const period = await prisma.curriculumPeriods.update({
        where: {
            id: periodId
        },
        data: {
            name
        }
    }).catch((err) => {
        return err;
    });
    return period;
}