import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { editEvent } from "../../../src/backend/calendar";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const {
            id,
            title,
            start,
            end,
            description,
        } : {
            id: string,
            title: string,
            start: Date,
            end: Date,
            description: string,
        } = req.body;

        const userId = token.id as number;

        if (
            !title
            || isNaN(parseInt(id as string))
            || !start
            || !end
            || typeof title !== "string"
            || typeof start !== "object"
            || typeof end !== "object"
            || title.length > 100
            || start > end
            ) return res.status(400).json({ error: "Bad Request" });

        const response = await editEvent(userId, parseInt(id), title, start, end, description);

        return res.status(200).json(response);

    }
}
