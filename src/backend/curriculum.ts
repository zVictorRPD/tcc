import { prisma } from "../config/prisma.config";
interface IPeriodSubjectsOrder {
    id: number;
    subjectsOrder?: string[];
}
export async function getCurriculum(id: number) {
    const hasCurriculum = await prisma.user
        .findUnique({
            where: {
                id,
            },
            select: {
                hasCurriculum: true,
            },
        })
        .catch((err) => {
            return err;
        });
    if (hasCurriculum.hasCurriculum) {
        const curriculum = await prisma.curriculum
            .findUnique({
                where: {
                    userId: id,
                },
                include: {
                    course: true,
                    curriculumPeriods: {
                        include: {
                            subjects: {
                                include: {
                                    subject: true,
                                    teacher: true,
                                },
                            },
                        },
                    },
                },
            })
            .catch((err) => {
                return err;
            });

        return { curriculum, hasCurriculum: true };
    } else {
        const courses = await prisma.course
            .findMany({
                select: {
                    code: true,
                    name: true,
                    period_emergence: true,
                },
                orderBy: {
                    name: "asc",
                },
            })
            .catch((err) => {
                return err;
            });
        return { courses, hasCurriculum: false };
    }
}
export async function createCurriculum(userId: number, courseCode: string) {
    const hasCurriculum = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            hasCurriculum: true,
        },
    });

    if (hasCurriculum && hasCurriculum.hasCurriculum == true)
        return { error: "Usuário já possui grade" };

    try {
        return await prisma.$transaction(
            async (tx) => {
                const defaultPeriods = await tx.period.findMany({
                    where: {
                        courseCode,
                    },
                    include: {
                        subjects: {
                            select: {
                                subjectCode: true,
                            },
                        },
                    },
                });

                const curriculum = await tx.curriculum.create({
                    data: {
                        userId,
                        courseCode,
                        curriculumPeriods: {
                            createMany: {
                                data: defaultPeriods.map((period: any) => {
                                    return {
                                        name: period.name,
                                    };
                                }),
                            },
                        },
                    },
                    include: {
                        curriculumPeriods: {
                            select: {
                                id: true,
                            },
                        },
                    },
                });

                await tx.curriculum.update({
                    where: {
                        id: curriculum.id,
                    },
                    data: {
                        curriculumPeriodsOrder: JSON.stringify(
                            curriculum.curriculumPeriods.map((period: any) => {
                                return period.id;
                            })
                        ),
                    },
                });

                const subjectsToCreate = defaultPeriods.flatMap(
                    (period: any, index: any) => {
                        return period.subjects.map((subject: any) => {
                            return {
                                subjectCode: subject.subjectCode,
                                isOptional: period.name === "Optativas",
                                periodId:
                                    curriculum.curriculumPeriods[index].id,
                                userId,
                            };
                        });
                    }
                );

                await tx.userSubjects.createMany({
                    data: subjectsToCreate,
                });

                const createdSubjects = await tx.userSubjects.findMany({
                    where: {
                        userId,
                    },
                    select: {
                        id: true,
                        periodId: true,
                    },
                });
                const periodSubjectsOrder: IPeriodSubjectsOrder[] = [];

                createdSubjects.forEach((item: any) => {
                    const index = periodSubjectsOrder.findIndex(
                        (periodItem) => periodItem.id === item.periodId
                    );
                    if (index === -1) {
                        periodSubjectsOrder.push({
                            id: item.periodId,
                            subjectsOrder: [item.id],
                        });
                    } else {
                        periodSubjectsOrder[index].subjectsOrder?.push(item.id);
                    }
                });
                for (const item of periodSubjectsOrder) {
                    await tx.curriculumPeriods.update({
                        where: {
                            id: item.id,
                        },
                        data: {
                            subjectsOrder: JSON.stringify(item.subjectsOrder),
                        },
                    });
                }
                await tx.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasCurriculum: true,
                    },
                });
                return {
                    status: "success",
                    message: "Grade criada com sucesso",
                };
            },
            {
                maxWait: 10000,
                timeout: 10000,
            }
        );
    } catch (error) {
        return error;
    }
}

export async function updatePeriod(periodId: number, name: string) {
    const period = await prisma.curriculumPeriods
        .update({
            where: {
                id: periodId,
            },
            data: {
                name,
            },
        })
        .catch((err) => {
            return err;
        });
    return period;
}

export async function updateFilter(userId: number, filter: ISubjectsFilter) {
    const curriculum = await prisma.curriculum
        .update({
            where: {
                userId,
            },
            data: {
                subjectsFilter: JSON.stringify(filter),
            },
        })
        .catch((err) => {
            return err;
        });
    return curriculum;
}
