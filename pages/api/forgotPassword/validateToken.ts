import type { NextApiRequest, NextApiResponse } from "next";
import { checkUserEmail, getToken } from "../../../src/backend/users";
import bcrypt from "bcrypt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email, token }: { email: string; token: string } = req.body;
        const checkEmail = await checkUserEmail(email);
        const dbToken = await getToken(email);

        if (
            checkEmail?.code === 200 &&
            dbToken?.code === 200 &&
            dbToken?.data
        ) {
            if (bcrypt.compareSync(token.toString(), dbToken?.data?.token)) {
                //get the diff in hours between the token creation and now
                const diffInHours =
                    Math.abs(
                        new Date().getTime() -
                            dbToken?.data?.createdAt.getTime()
                    ) /
                    1000 /
                    60 /
                    60;

                if (diffInHours < 1) {
                    return res.status(200).json({
                        code: 200,
                        message: "Token válido",
                    });
                } else {
                    return res.status(200).json({
                        code: 403,
                        message: "Token expirado",
                    });
                }
            } else {
                return res.status(200).json({
                    code: 404,
                    message: "Token inválido",
                });
            }
        } else {
            return res.status(404).json({
                code: 404,
                message: "Esse token não existe",
            });
        }
    }
}
