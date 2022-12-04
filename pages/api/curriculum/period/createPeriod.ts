import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createPeriod } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const {  periodName } = req.body;
        const userId = token.id as number;

        if (typeof periodName !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await createPeriod(userId, periodName);
        
        return res.status(200).json(response);
    }
}
