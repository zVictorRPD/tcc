import type { NextApiRequest, NextApiResponse } from "next";
import { updateSubjectNote } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { subjectId, text } = req.body;
        
        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof text !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await updateSubjectNote(parseInt(subjectId), text);

        return res.status(200).json(response);
    }
}
