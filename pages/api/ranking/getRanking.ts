import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getRanking } from "../../../src/backend/ranking";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req });

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "GET") {
        const response = await getRanking();
        return res.status(200).json(response);
    }
}
