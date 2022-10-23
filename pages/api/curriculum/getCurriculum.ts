import type { NextApiRequest, NextApiResponse } from "next";
import { getCurriculum } from "../../../src/backend/curriculum";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { userId } = req.query;

        if (isNaN(parseInt(userId as string)) || typeof userId !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await getCurriculum(parseInt(userId));
        return res.status(200).json(response);

    }
}
