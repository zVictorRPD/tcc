// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { updatePasswordId, updateUser } from "../../../src/backend/users";
import {
    validateName,
    validatePassword,
} from "../../../src/functions/validation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const {
            name,
            id,
            password,
            avatar,
        }: {
            name: string;
            id: string;
            password: string;
            avatar: string;
        } = req.body;

        if (!validateName(name)) {
            return res.status(200).json({
                code: 400,
                message: "Nome inválido",
            });
        }

        const updateUserResponse = await updateUser(name, avatar, parseInt(id));

        if (password === "") {
            return res.status(200).json(updateUserResponse);
        }

        if (!validatePassword(password)) {
            return res.status(200).json({
                code: 400,
                message: "Senha inválida",
            });
        }

        const updatePasswordResponse = await updatePasswordId(parseInt(id), password);
        return res.status(200).json(updatePasswordResponse);
    }
}
