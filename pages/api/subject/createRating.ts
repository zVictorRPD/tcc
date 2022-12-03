import type { NextApiRequest, NextApiResponse } from "next";
import { createRating } from "../../../src/backend/ratings";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const {
            userId,
            subjectCode,
            complexity,
            relevance,
            comment
        }: {
            userId: number,
            subjectCode: string,
            complexity: number,
            relevance: number,
            comment: string,
        } = req.body;

        if (
            isNaN(userId)
            || typeof subjectCode !== "string"
            || isNaN(complexity)
            || isNaN(relevance)
            || typeof comment !== "string"
            ) return res.status(400).json({ error: "Bad request" });

        const response = await createRating(userId, subjectCode, complexity, relevance, comment);
        
        if (response instanceof Error) return res.status(500).json({ error: "Internal server error" });
        
        return res.status(200).json(response);

    }
}
