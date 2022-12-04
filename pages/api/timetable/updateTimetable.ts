import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { updateTimetable } from "../../../src/backend/timetable";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { timetable } = req.body;
        const userId = token.id as number;
        if (typeof timetable !== 'object') return res.status(400).json({ error: "Bad request" });

        const response = await updateTimetable(userId, timetable);
        
        return res.status(200).json(response);
    }
}
