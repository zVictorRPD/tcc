// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../src/backend/users";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../../../src/functions/validation";
import bcrypt from "bcrypt";
import { sendEmailFunction } from "../../../src/backend/nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      email,
      password,
      avatar,
    }: {
      name: string;
      email: string;
      password: string;
      avatar: string;
    } = req.body;

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

    if (response.code === 409) return res.status(200).json(response);
    console.log(name);

    const msgToToken = email + name;

    const token = bcrypt.hashSync(msgToToken, 9);

    const link = `${
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    }/api/user/verifyAccount?token=${token}&email=${email}`;

    await sendEmailFunction(
      [email],
      "Verificação de Email",
      `<p>Clique no link para validar seu email: <a href="${link}">${link}</a></p>`
    );

    return res
      .status(200)
      .json({ code: "200", message: "Link de verificação enviado" });
  }
}
