import type { NextApiRequest, NextApiResponse } from "next";
import { getSubjectRating } from "../../../src/backend/ratings";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { userId, subjectCode } = req.query;
        if (isNaN(parseInt(userId as string)) || typeof userId !== "string" || typeof subjectCode !== "string" ) return res.status(400).json({ error: "Bad request" });

        const response = await getSubjectRating(parseInt(userId), subjectCode);

        if (response instanceof Error) return res.status(500).json({ error: "Internal server error" });
        return res.status(200).json(response);
    }
}
