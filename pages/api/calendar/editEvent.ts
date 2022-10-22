import type { NextApiRequest, NextApiResponse } from "next";
import { editEvent } from "../../../src/backend/calendar";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const {
            id,
            title,
            start,
            end,
            description,
        } : {
            id: string,
            userId: string,
            title: string,
            start: Date,
            end: Date,
            description: string,
        } = req.body;
        
        if(isNaN(parseInt(id as string))) return res.status(400).json({ error: "Bad request" });

        const response = await editEvent(parseInt(id), title, start, end, description);

        return res.status(200).json(response);

    }
}
