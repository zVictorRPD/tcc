import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { deleteSubject } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { subjectId, periodId } = req.body;
        const userId = token.id as number;

        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await deleteSubject(userId, parseInt(subjectId), parseInt(periodId));

        return res.status(200).json(response);
    }
}
