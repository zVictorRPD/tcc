import type { NextApiRequest, NextApiResponse } from "next";
import { updateSubjectStatus } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { subjectId, status } = req.body;
        
        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof status !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await updateSubjectStatus(parseInt(subjectId), status);

        return res.status(200).json(response);
    }
}
