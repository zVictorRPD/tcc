import type { NextApiRequest, NextApiResponse } from "next";
import { deleteSubject } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { subjectId, periodId } = req.body;

        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await deleteSubject(parseInt(subjectId), parseInt(periodId));

        return res.status(200).json(response);
    }
}
