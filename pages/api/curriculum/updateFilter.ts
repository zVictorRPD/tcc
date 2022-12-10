import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { updateFilter } from "../../../src/backend/curriculum";
import { isAnFilter } from "../../../src/functions/curriculum";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { filter } = req.body;

        const userId = token.id as number;
        

        if (!isAnFilter(filter)) return res.status(400).json({ error: "Bad request" });

        const response = await updateFilter(userId, filter);

        return res.status(201).json(response);
    }
}
