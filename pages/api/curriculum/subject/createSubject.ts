import type { NextApiRequest, NextApiResponse } from "next";
import { createSubject } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, periodId, subjectCode } = req.body;
        
        if (isNaN(userId) || typeof subjectCode !== "string" || typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await createSubject(userId, parseInt(periodId), subjectCode);

        return res.status(200).json(response);
    }
}
