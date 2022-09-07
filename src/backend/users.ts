import { prisma } from "../config/prisma.config";
const bcrypt = require("bcrypt");
export async function createUser(
    name: string,
    email: string,
    password: string,
    avatar: string
) {
    const newUser = await prisma.user
        .create({
            data: {
                name,
                email,
                password,
                avatar,
            },
        })
        .catch((err) => {
            return err;
        });
    return newUser.name;
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user
        .findUnique({
            where: {
                email,
            },
        })
        .catch((err) => {
            return err;
        });

    if (user === null) {
        return {
            code: 401,
            message: "Esse email não está cadastrado",
        };
    }

    const result = bcrypt.compareSync(password, user.password);


    if (result) {
        return {
            code: 200,
            message: "Login realizado com sucesso",
            user: user.name,
        };
    } else {
        return {
            code: 401,
            message: "Senha incorreta",
        };
    }
}
