// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { loginUser } from "../../backend/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await loginUser(req.body.email, req.body.password);
    
    return res.status(response.code).json({ message: response.message });
  }
}
