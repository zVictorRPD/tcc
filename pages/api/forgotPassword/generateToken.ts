// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { checkUserEmail, saveToken } from "../../../src/backend/users";
import { sendEmailFunction } from "../../../src/backend/nodemailer";
import bcrypt from "bcrypt";
import { resetPasswordEmail } from "../../../src/components/Emails/resetPassword";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email } = req.body;

        const checkEmail = await checkUserEmail(email);

        if (checkEmail?.code === 200) {
            //criar token aleatorio de 8 digitos
            const token = Math.floor(10000000 + Math.random() * 90000000).toString();

            const encryptedToken = bcrypt.hashSync(token, 9);
            const tokenResponse = await saveToken(email, encryptedToken);
            if (tokenResponse?.code === 200) {
                await sendEmailFunction(
                    [email],
                    "Recuperação de senha",
                    resetPasswordEmail(token)
                );
                return res.status(200).json(tokenResponse);
            }
            return res.status(500).json({
                code: 500,
                message: "Token não foi salvo",
            });
        } else if (checkEmail?.code === 404) {
            return res.status(200).json(checkEmail);
        }
    }
}
