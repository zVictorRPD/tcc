import type { NextApiRequest, NextApiResponse } from "next";
import { updateSubjectGrade } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { subjectId, grade } = req.body;
        console.log(grade);
        
        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof grade === "string") return res.status(400).json({ error: "Bad request" });

        const response = await updateSubjectGrade(parseInt(subjectId), grade);

        return res.status(200).json(response);
    }
}
