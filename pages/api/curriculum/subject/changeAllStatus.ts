import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { updateAllSubjectStatus } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { periodId, type } = req.body;
        const types = ['todo', 'doing', 'done']
        const userId = token.id as number;
        if (typeof periodId !== "string" || isNaN(parseInt(periodId as string)) || !types.includes(type)) return res.status(400).json({ error: "Bad request" });

        const response = await updateAllSubjectStatus(userId, parseInt(periodId), type);

        return res.status(200).json(response);
    }
}
