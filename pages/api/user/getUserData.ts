// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getUserData } from "../../../src/backend/users";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const id = token.id as number;
        const response = await getUserData(id);

        if(response.code === 404) {
            return res.status(200).json(response);
        }
        
        return res.status(200).json(response);
        
    }
}
