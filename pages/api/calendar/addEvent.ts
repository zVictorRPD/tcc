import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { addEvent } from "../../../src/backend/calendar";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const {
            title,
            start,
            end,
            description,
        } : {
            title: string,
            start: Date,
            end: Date,
            description: string,
        } = req.body;
        
        const userId = token.id as number;

        const response = await addEvent(userId, title, start, end, description);

        return res.status(200).json(response);


    }
}
