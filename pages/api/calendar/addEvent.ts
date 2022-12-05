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
        }: {
            title: string,
            start: Date,
            end: Date,
            description: string,
        } = req.body;

        const userId = token.id as number;
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (
            typeof title !== "string"
            || isNaN(startDate.getTime())
            || isNaN(endDate.getTime())
            || title.length > 100
            || startDate.getTime() > endDate.getTime()
        ) return res.status(400).json({ error: "Bad Request" });

        const response = await addEvent(userId, title, start, end, description);

        return res.status(200).json(response);


    }
}
