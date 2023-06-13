import { prisma } from "../config/prisma.config";

export async function getRanking() {
    const courses = await prisma.curriculum
        .findMany({
            select: {
                course: {
                    select: {
                        code: true,
                        name: true,
                    },
                },
            },
        })
        .catch((err) => {
            return err;
        });

    const courses_filtered = courses.map((course: any) => {
        return {
            code: course.course.code,
            name: course.course.name.split("-")[0].trim(),
        };
    });

    // group by code and count the number of courses
    const courses_grouped = courses_filtered.reduce(
        (acc: any, current: any) => {
            const x = acc.find((item: any) => item.name === current.name);
            if (!x) {
                return acc.concat([{ ...current, count: 1 }]);
            } else {
                return acc.map((item: any) =>
                    item.name === current.name
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            }
        },
        []
    );

    // sort by count
    courses_grouped.sort((a: any, b: any) => b.count - a.count);

    return {
        totalUsers: courses.length,
        courses: courses_grouped,
    };
}
