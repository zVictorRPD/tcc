// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo, verifyUserEmail } from "../../../src/backend/users";
import bcrypt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { token, email } = req.query;
    const tokenString = token?.toString() || "";
    const emailString = email?.toString() || "";

    if (tokenString === "" || emailString === "") {
      return res.status(200).json({
        code: 400,
        message: "Token inválido",
      });
    }

    const response = await getUserInfo(emailString);

    if (response.code === 404 || response.data === undefined) {
      res.redirect("/login?message=invalidlink");
    }

    if (response.data === undefined) return;

    if (response.data.emailVerified === true) {
      res.redirect("/login?message=alreadyverified");
    }

    const msgToUnToken = response.data.email + response.data.name;

    if (!(await bcrypt.compare(msgToUnToken, tokenString))) {
      res.redirect("/login?message=invalidlink");
    }

    const updateResponse = await verifyUserEmail(emailString);

    if (updateResponse.code === 404) {
      res.redirect("/login?message=invalidlink");
    }

    res.redirect("/login?message=verified");
  }
}
