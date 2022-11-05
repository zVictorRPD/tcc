import type { NextApiRequest, NextApiResponse } from "next";
import { updatePeriodVisibility } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { periodId, visibility } = req.body;
        
        if (typeof periodId !== "string" || isNaN(parseInt(periodId as string)) || typeof visibility !== "boolean") return res.status(400).json({ error: "Bad request" });

        const response = await updatePeriodVisibility(parseInt(periodId), visibility);

        return res.status(200).json(response);
    }
}
