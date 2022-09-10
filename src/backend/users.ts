import { prisma } from "../config/prisma.config";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
interface IUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
}
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
                password: bcrypt.hashSync(password, 9) as string,
                avatar,
            },
        })
        .catch((err) => {
            return {
                code: 409,
                message: "Houve um erro ao criar o usuário",
            };
        });
    return {
        code: 200,
        message: "Usuário criado com sucesso",
    };
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
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            } as IUser,
        };
    } else {
        return {
            code: 401,
            message: "Senha incorreta",
        };
    }
}

//check user email
export async function checkUserEmail(email: string) {
    const checkEmail = await prisma.user
        .findUnique({
            where: {
                email,
            },
        })
        .catch((err) => {
            return {
                code: 404,
                message: "Email não cadastrado",
            };
        });

    if (checkEmail) {
        return {
            code: 200,
            message: "Email já cadastrado",
        };
    } else {
        return {
            code: 404,
            message: "Email não cadastrado",
        };
    }
}

//save token in database
export async function saveToken(email: string, token: string) {
    const tokenExist = await prisma.recoverPassword
        .findMany({
            where: {
                user: {
                    email,
                },
            },
        })
        .catch((err) => {
            return err;
        });

    if (tokenExist.length > 0) {
        //deletar token antigo
        await prisma.recoverPassword
            .deleteMany({
                where: {
                    user: {
                        email,
                    },
                },
            })
            .catch((err) => {
                return err;
            });
    }

    const newToken = await prisma.recoverPassword
        .create({
            data: {
                token,
                userEmail: email,
            },
        })
        .catch((err) => {
            return err;
        });

    if (newToken) {
        return {
            code: 200,
            message: "Token salvo com sucesso",
        };
    } else {
        return {
            code: 500,
            message: "Token não foi salvo",
        };
    }
}

//get token from database
export async function getToken(email: string) {
    const token = await prisma.recoverPassword
        .findMany({
            where: {
                userEmail: email,
            },
        })
        .catch((err) => {
            return err;
        });

    if (token.length > 0) {
        return {
            code: 200,
            message: "Token recuperado com sucesso",
            data: {
                token: token[0]?.token as string,
                createdAt: token[0]?.createdAt as Date,
            },
        };
    } else {
        return {
            code: 404,
            message: "Token não encontrado",
        };
    }
}

//update password
export async function updatePassword(email: string, password: string) {
    const result = await prisma.user
        .update({
            where: {
                email,
            },
            data: {
                password: bcrypt.hashSync(password, 9) as string,
            },
        })
        .catch((err) => {
            return err;
        });

    if (result) {
        return {
            code: 200,
            message: "Senha atualizada com sucesso",
        };
    } else {
        return {
            code: 500,
            message: "Senha não foi atualizada",
        };
    }
}

//get user image
export async function getUserImage(id: number) {
    const user: unknown = await prisma.user
        .findUnique({
            where: {
                id,
            },
        })
        .catch((err) => {
            return {
                code: 404,
                message: "Usuário não encontrado",
            };
        });

    const newUser = user as User;

    return {
        code: 200,
        message: "Imagem recuperada com sucesso",
        data: {
            avatar: newUser.avatar,
        },
    };
}
