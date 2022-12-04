import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { deleteEvent } from "../../../src/backend/calendar";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const {
            id,
        } : {
            id: string,
        } = req.body;
        const userId = token.id as number;
        
        if(isNaN(parseInt(id as string))) return res.status(400).json({ error: "Bad request" });

        const response = await deleteEvent(userId, parseInt(id));

        return res.status(200).json(response);

    }
}
