import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createSubject } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { periodId, subjectCode, subjectType } = req.body;
        const userId = token.id as number;
        const type = JSON.parse(subjectType);
        if (typeof subjectCode !== "string" || typeof periodId !== "string" || isNaN(parseInt(periodId as string)) || typeof type !== 'boolean') return res.status(400).json({ error: "Bad request" });

        const response = await createSubject(userId, parseInt(periodId), subjectCode, type);

        return res.status(200).json(response);
    }
}
