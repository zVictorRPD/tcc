import { prisma } from "../config/prisma.config";

export async function getTeacher(page: number, name: string, departament: string, take:number = 8) {
    let filter = {};
    if(name.length > 0) {
        filter = {
            name: {
                contains: name,
            }
        }
    }
    if(departament.length > 0) {
        filter = {
            ...filter,
            departament_code: {
                equals: departament,
            }
        }
    }
    
    const teachers = await prisma.teacher.findMany({
        orderBy: {
            name: "asc"
        },
        skip: 8 * (page - 1),
        take: take,
        where: filter,
    }).catch((err) => {
        return err;
    });

    const total = await prisma.teacher.count({
        where: filter,
    }).catch((err) => {
        return err;
    });
    const totalPages = Math.ceil(total / 8);
    return {teachers, total, totalPages};
}

