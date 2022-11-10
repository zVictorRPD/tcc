import type { NextApiRequest, NextApiResponse } from "next";
import { deleteComplementary } from "../../../../src/backend/complementary";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { id } = req.body;
        
        if (typeof id !== "number") return res.status(400).json({ error: "Bad request" });

        const response = await deleteComplementary(id);

        return res.status(200).json(response);
    }
}
