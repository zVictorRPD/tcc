import type { NextApiRequest, NextApiResponse } from "next";
import { addEvent } from "../../../src/backend/calendar";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const {
            userId,
            title,
            start,
            end,
            description,
        } : {
            userId: string,
            title: string,
            start: Date,
            end: Date,
            description: string,
        } = req.body;
        
        if(isNaN(parseInt(userId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await addEvent(parseInt(userId), title, start, end, description);

        return res.status(200).json(response);


    }
}
