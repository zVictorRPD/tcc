import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { deleteComplementary } from "../../../../src/backend/complementary";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    if (req.method === "POST") {
        const { id } = req.body;
        const userId = token.id as number;
        if (typeof id !== "number") return res.status(400).json({ error: "Bad request" });

        const response = await deleteComplementary(userId, id);

        return res.status(200).json(response);
    }
}
