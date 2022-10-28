import type { NextApiRequest, NextApiResponse } from "next";
import { updateSubjectLink } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { subjectId, links } = req.body;
        
        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof links !== 'object') return res.status(400).json({ error: "Bad request" });

        const response = await updateSubjectLink(parseInt(subjectId), links);

        return res.status(200).json(response);
    }
}
