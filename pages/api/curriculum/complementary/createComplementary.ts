import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createComplementary } from "../../../../src/backend/complementary";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { name, time } = req.body;
        const userId = token.id as number;
        
        if (typeof name !== "string" || typeof time !== "number") return res.status(400).json({ error: "Bad request" });

        const response = await createComplementary(userId, name, time);

        return res.status(200).json(response);
    }
}
