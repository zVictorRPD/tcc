import type { NextApiRequest, NextApiResponse } from "next";
import { addTimetable } from "../../../src/backend/timetable";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, timetable } = req.body;
        
        if (isNaN(userId) || typeof timetable !== 'object') return res.status(400).json({ error: "Bad request" });

        const response = await addTimetable(userId, timetable);
        
        return res.status(200).json(response);
    }
}
