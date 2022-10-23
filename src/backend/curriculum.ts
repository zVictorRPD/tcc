import { prisma } from "../config/prisma.config";

export async function getCurriculum(id: number) {

    const hasCurriculum = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            hasCurriculum: true
        }
    }).catch((err) => {
        return err;
    });
    if (hasCurriculum.hasCurriculum) {
        const curriculum = await prisma.curriculum.findUnique({
            where: {
                userId: id
            },
            include: {
                course: true,
                curriculumPeriods: {
                    include: {
                        subjects: {
                            include: {
                                subject: true
                            }
                        }
                    }
                }
            }
        }).catch((err) => {
            return err;
        });
        return { curriculum, hasCurriculum: true };
    } else {
        const courses = await prisma.course.findMany({
            select: {
                code: true,
                name: true,
            },
            orderBy: {
                name: "asc"
            }
        }).catch((err) => {
            return err;
        });
        return { courses, hasCurriculum: false };
    }
}

export async function createCurriculum(userId: number, courseCode: string) {
    const course = await prisma.course.findUnique({
        where: {
            code: courseCode
        },
        include: {
            periods: {
                include: {
                    subjects: {
                        include: {
                            subject: true
                        }
                    }
                }
            },
        }
    }).catch((err) => {
        return err;
    });

    const curriculum = await prisma.curriculum.create({
        data: {
            userId,
            courseCode,
            curriculumPeriodsOrder: { 'empty': true },
        }
    }).catch((err) => {
        return err;
    });

    const curriculumPeriods = await prisma.curriculumPeriods.createMany({
        data: course.periods.map((period: any) => {
            return {
                curriculumId: curriculum.id,
                name: period.name,
            }
        }),
    }).catch((err) => {
        return err;
    });

    const createdPeriods = await prisma.curriculumPeriods.findMany({
        where: {
            curriculumId: curriculum.id
        }
    }).catch((err) => {
        return err;
    });

    const subjectsToCreate = course.periods.map((period: any, index: number) => {
        return period.subjects.map((subject: any) => {
            return {
                subjectCode: subject.subjectCode,
                periodId: createdPeriods[index].id,
            }
        })
    }).flat();

    const curriculumSubjects = await prisma.userSubjects.createMany({
        data: subjectsToCreate,
    }).catch((err) => {
        return err;
    });

    const updateHasCurriculum = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            hasCurriculum: true
        }
    }).catch((err) => {
        return err;
    });

    return 'Grade curricular criada com sucesso!';
};
