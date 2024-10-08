// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo } from "../../../src/backend/users";
import bcrypt from "bcrypt";
import { sendEmailFunction } from "../../../src/backend/nodemailer";
import { generateConfirmationEmail } from "../../../src/components/Emails/confirmation";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email }: { email: string } = req.body;

    if (email === "") {
      return res.status(200).json({
        code: 400,
        message: "Esse email não está cadastrado",
      });
    }

    const response = await getUserInfo(email);

    if (response.code === 404 || response.data === undefined) {
      return res.status(200).json({
        code: 400,
        message: "Esse email não está cadastrado",
      });
    }

    if (response.data.emailVerified === true) {
      return res.status(200).json({
        code: 401,
        message: "Esse email já foi verificado, efetue o login",
      });
    }

    const msgToToken = response.data.email + response.data.name;

    const token = bcrypt.hashSync(msgToToken, 9);

    const link = `${
      process.env.BASE_URL || "http://localhost:3000"
    }/api/user/verifyAccount?token=${token}&email=${email}`;

    await sendEmailFunction(
      [email],
      "Verificação de Email",
      generateConfirmationEmail(link)
    );

    return res
      .status(200)
      .json({ code: "200", message: "Link de verificação enviado" });
  }
}
