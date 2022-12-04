import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createCurriculum } from "../../../src/backend/curriculum";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { courseCode } = req.body;

        const userId = token.id as number;

        if (typeof courseCode !== "string" ) return res.status(400).json({ error: "Bad request" });

        const response = await createCurriculum(userId, courseCode);

        return res.status(201).json(response);
    }
}
