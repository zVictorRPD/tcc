import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { deleteUserCurriculum } from "../../../src/backend/curriculum";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req });

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const id = token.id as number;
        const deleteUserCurriculumResponse = await deleteUserCurriculum(id);
        return res.status(200).json(deleteUserCurriculumResponse);
    }
}
