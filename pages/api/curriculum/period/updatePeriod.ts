import type { NextApiRequest, NextApiResponse } from "next";
import { updatePeriod } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { periodId, name } = req.body;
        console.log(req.body);
        
        if (typeof periodId !== "string" || isNaN(parseInt(periodId as string)) || typeof name !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await updatePeriod(parseInt(periodId), name);

        return res.status(200).json(response);
    }
}
