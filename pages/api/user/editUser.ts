// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { updatePasswordId, updateUser } from "../../../src/backend/users";
import {
    validateName,
    validatePassword,
} from "../../../src/functions/validation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const {
            name,
            password,
            avatar,
        }: {
            name: string;
            password: string;
            avatar: string;
        } = req.body;

        const id = token.id as number;

        if (!validateName(name)) {
            return res.status(200).json({
                code: 400,
                message: "Nome inválido",
            });
        }

        const updateUserResponse = await updateUser(name, avatar, id);

        if (password === "") {
            return res.status(200).json(updateUserResponse);
        }

        if (!validatePassword(password)) {
            return res.status(200).json({
                code: 400,
                message: "Senha inválida",
            });
        }

        const updatePasswordResponse = await updatePasswordId(id, password);
        return res.status(200).json(updatePasswordResponse);
    }
}
