import type { NextApiRequest, NextApiResponse } from "next";
import { getDepartament } from "../../../src/backend/departaments";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        try {
            const response = await getDepartament();
            return res.status(200).json(response);
        }catch {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
