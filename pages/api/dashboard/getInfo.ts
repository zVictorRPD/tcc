import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getDashboardData } from "../../../src/backend/dashboard";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "GET") {
        const userId = token.id as number;
        const response = await getDashboardData(userId);
        res.status(200).json(response);
    }
}
