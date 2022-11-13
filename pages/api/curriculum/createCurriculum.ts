import type { NextApiRequest, NextApiResponse } from "next";
import { createCurriculum } from "../../../src/backend/curriculum";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, courseCode } = req.body;
        
        if (typeof userId !== "number" || typeof courseCode !== "string" ) return res.status(400).json({ error: "Bad request" });

        const response = await createCurriculum(userId, courseCode);

        return res.status(201).json(response);
    }
}
