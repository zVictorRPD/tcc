import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { deletePeriod } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    if (req.method === "POST") {
        const { periodId } = req.body;
        const userId = token.id as number;
        if (typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await deletePeriod(userId, parseInt(periodId));

        return res.status(200).json(response);
    }
}
