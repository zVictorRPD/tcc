import { prisma } from "../config/prisma.config";

export async function getDepartament() {
    const departaments = await prisma.teacher.findMany({
        orderBy: {
            departament_name: "asc"
        },
        distinct: ["departament_code"], 
        select: {
            departament_code: true,
            departament_name: true
        }
    }).catch((err) => {
        return err;
    });
    return departaments;
}