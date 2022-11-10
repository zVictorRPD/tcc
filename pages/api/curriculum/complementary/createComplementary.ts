import type { NextApiRequest, NextApiResponse } from "next";
import { createComplementary } from "../../../../src/backend/complementary";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { userId, name, time } = req.body;
        
        if (typeof userId !== "number" || typeof name !== "string" || typeof time !== "number") return res.status(400).json({ error: "Bad request" });

        const response = await createComplementary(userId, name, time);

        return res.status(200).json(response);
    }
}
