import type { NextApiRequest, NextApiResponse } from "next";
import { checkUserEmail, getToken, updatePassword } from "../../../src/backend/users";
import bcrypt from "bcrypt";
import { validatePassword } from "../../../src/functions/validation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email, token, password } = req.body;
        const checkEmail = await checkUserEmail(email);

        if (checkEmail.code !== 200) return res.status(200).json(checkEmail);

        const dbToken = await getToken(email);

        if (dbToken.code !== 200) return res.status(200).json(dbToken);

        if (!dbToken.data) {
            return res.status(200).json({
                code: 404,
                message: "Esse token não existe",
            });
        }

        const diffInHours =
            Math.abs(
                new Date().getTime() - dbToken?.data?.createdAt.getTime()
            ) /
            1000 /
            60 /
            60;

        if (
            !bcrypt.compareSync(token.toString(), dbToken?.data?.token) ||
            diffInHours > 1
        ) {
            return res.status(200).json({
                code: 404,
                message: "Token inválido",
            });
        }
        if(!validatePassword(password)) {
            return res.status(200).json({
                code: 400,
                message: "Senha inválida",
            });
        }

        return res.status(200).json(await updatePassword(email, password));

    }
}
