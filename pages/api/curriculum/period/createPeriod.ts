import type { NextApiRequest, NextApiResponse } from "next";
import { createPeriod } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, periodName } = req.body;
        
        if (isNaN(userId) || typeof periodName !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await createPeriod(userId, periodName);
        
        return res.status(200).json(response);
    }
}
