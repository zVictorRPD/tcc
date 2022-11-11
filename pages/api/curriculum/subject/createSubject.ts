import type { NextApiRequest, NextApiResponse } from "next";
import { createSubject } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, periodId, subjectCode, subjectType } = req.body;
        const type = JSON.parse(subjectType);
        if (isNaN(userId) || typeof subjectCode !== "string" || typeof periodId !== "string" || isNaN(parseInt(periodId as string)) || typeof type !== 'boolean') return res.status(400).json({ error: "Bad request" });

        const response = await createSubject(userId, parseInt(periodId), subjectCode, type);

        return res.status(200).json(response);
    }
}
