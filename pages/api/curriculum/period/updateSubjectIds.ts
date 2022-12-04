import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { updateSubjectIds, updateSubjectPeriodId } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { periodId, subjectId, subjectIds, type } = req.body;
        const userId = token.id as number;

        if (type === "samePeriod") {
            if (
                !periodId
                || typeof periodId !== "string"
                || isNaN(parseInt(periodId as string))
                || !subjectIds
                || !Array.isArray(subjectIds)
            ) return res.status(400).json({ error: "Bad request" });
            const subjectIdsNumber = subjectIds.map((id: string) => parseInt(id));
            const response = await updateSubjectIds(userId, parseInt(periodId), subjectIdsNumber);
            return res.status(200).json(response);
        } else {
            const response = periodId.map(async (periodId: string, index: number) => {
                if (
                    !periodId
                    || typeof periodId !== "string"
                    || isNaN(parseInt(periodId as string))
                    || !subjectIds
                    || !Array.isArray(subjectIds)
                    ) return res.status(400).json({ error: "Bad request" });
            const subjectIdsNumber = subjectIds[index].map((id: string) => parseInt(id));
            return await updateSubjectIds(userId, parseInt(periodId), subjectIdsNumber);
        });
        const result = await Promise.all(response);

        if (
            !subjectId
            || typeof subjectId !== "string" 
            || isNaN(parseInt(subjectId as string))
            ) return res.status(400).json({ error: "Bad request" });
        const subjectResult = await updateSubjectPeriodId(userId, parseInt(periodId[1]), parseInt(subjectId));
        return res.status(200).json(subjectResult);
    }

}
}
