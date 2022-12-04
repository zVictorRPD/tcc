import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSubjectRating } from "../../../src/backend/ratings";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "GET") {
        const { subjectCode } = req.query;
        const userId = token.id as number;
        if (!subjectCode || typeof subjectCode !== "string" ) return res.status(400).json({ error: "Bad request" });

        const response = await getSubjectRating(userId, subjectCode);

        if (response instanceof Error) return res.status(500).json({ error: "Internal server error" });
        return res.status(200).json(response);
    }
}
