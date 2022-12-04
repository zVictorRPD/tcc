import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createRating } from "../../../src/backend/ratings";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const {
            subjectCode,
            complexity,
            relevance,
            comment
        }: {
            subjectCode: string,
            complexity: number,
            relevance: number,
            comment: string,
        } = req.body;
        const userId = token.id as number;
        if (
            typeof subjectCode !== "string"
            || isNaN(complexity)
            || isNaN(relevance)
            || typeof comment !== "string"
            || complexity < 0
            || complexity > 10
            || relevance < 0
            || relevance > 10
            || comment.length > 1000
            ) return res.status(400).json({ error: "Bad request" });

        const response = await createRating(userId, subjectCode, complexity, relevance, comment);
        
        if (response instanceof Error) return res.status(500).json({ error: "Internal server error" });
        
        return res.status(200).json(response);

    }
}
