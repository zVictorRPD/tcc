import type { NextApiRequest, NextApiResponse } from "next";
import { deletePeriod } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, periodId, subjectIds } = req.body;
        
        if (isNaN(userId) || typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await deletePeriod(parseInt(userId), parseInt(periodId), subjectIds);

        return res.status(200).json(response);
    }
}
