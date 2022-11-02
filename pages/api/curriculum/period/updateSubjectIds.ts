import type { NextApiRequest, NextApiResponse } from "next";
import { updateSubjectIds, updateSubjectPeriodId } from "../../../../src/backend/period";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const { periodId, subjectId, subjectIds, type } = req.body;


        if (type === "samePeriod") {
            if (typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });
            const subjectIdsNumber = subjectIds.map((id: string) => parseInt(id));
            const response = await updateSubjectIds(parseInt(periodId), subjectIdsNumber);
            return res.status(200).json(response);
        } else {
            const response = periodId.map(async (periodId: string, index: number) => {
                if (typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });
                const subjectIdsNumber = subjectIds[index].map((id: string) => parseInt(id));
                return await updateSubjectIds(parseInt(periodId), subjectIdsNumber);
            });
            const result = await Promise.all(response);
            
            if(typeof subjectId !== "string" || isNaN(parseInt(subjectId as string))) return res.status(400).json({ error: "Bad request" });
            const subjectResult = await updateSubjectPeriodId(parseInt(periodId[1]), parseInt(subjectId));
            return res.status(200).json(subjectResult);
        }

    }
}
