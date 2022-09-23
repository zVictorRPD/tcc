// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserData } from "../../../src/backend/users";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { id } = req.body;
        const response = await getUserData(parseInt(id));

        if(response.code === 404) {
            return res.status(200).json(response);
        }
        
        return res.status(200).json(response);
        
    }
}
