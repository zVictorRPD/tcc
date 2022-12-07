import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createTeacher } from "../../../../src/backend/userSubject";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { subjectId, teacherId } = req.body;
        const userId = token.id as number;
        
        if (typeof subjectId !== "string" || isNaN(parseInt(subjectId as string)) || typeof teacherId !== "string" || isNaN(parseInt(teacherId as string))) return res.status(400).json({ error: "Bad request" });

        const response = await createTeacher(userId, parseInt(subjectId), parseInt(teacherId));

        return res.status(200).json(response);
    }
}
