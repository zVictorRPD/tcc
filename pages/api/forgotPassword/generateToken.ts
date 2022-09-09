// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { checkUserEmail, saveToken } from "../../../src/backend/users";
import { sendEmailFunction } from "../../../src/backend/nodemailer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email } = req.body;
        
        const response = await checkUserEmail(email);

        if (response?.code === 200) {
            //criar token aleatorio de 8 digitos
            const token = Math.floor(10000000 + Math.random() * 90000000).toString();
            const tokenResponse = await saveToken(email, token);
            if(tokenResponse?.code === 200){
                const emailResponse = await sendEmailFunction([email], "Recuperação de senha", `Seu token de recuperação de senha é: ${token}`);               
                return res.status(200).json(tokenResponse);
            }
            return res.status(500).json({
                code: 500,
                message: "Token não foi salvo",
            });
        } else if(response?.code === 404) {
            return res.status(200).json(response);
        }
    }
}
