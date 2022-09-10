// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../src/backend/users";
import {
    validateName,
    validateEmail,
    validatePassword,
} from "../../src/functions/validation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { name, email, password, avatar } = req.body;

        if (!validateName(name)) {
            return res.status(200).json({
                code: 400,
                message: "Nome inválido",
            });
        }

        if (!validateEmail(email)) {
            return res.status(200).json({
                code: 400,
                message: "Email inválido",
            });
        }

        if (!validatePassword(password)) {
            return res.status(200).json({
                code: 400,
                message: "Senha inválida",
            });
        }

        const response = await createUser(name, email, password, avatar);
        if(typeof response === "object" ) {
            return res.status(200).json(response);
        }
    }
}
