import type { NextApiRequest, NextApiResponse } from "next";
import { createTeacher } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { subjectId, teacherId } = req.body;
        
        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof teacherId !== "string" || isNaN(parseInt(teacherId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await createTeacher(parseInt(subjectId), parseInt(teacherId));

        return res.status(200).json(response);
    }
}
