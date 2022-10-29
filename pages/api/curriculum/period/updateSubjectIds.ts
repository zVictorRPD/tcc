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
            const response = await updateSubjectIds(parseInt(periodId), subjectIds);
            return res.status(200).json(response);
        } else {
            const response = periodId.map(async (periodId: string, index: number) => {
                if (typeof periodId !== "string" || isNaN(parseInt(periodId as string))) return res.status(400).json({ error: "Bad request" });

                return await updateSubjectIds(parseInt(periodId), subjectIds[index]);
            });
            const result = await Promise.all(response);

            if(typeof subjectId !== "string" || isNaN(parseInt(subjectId as string))) return res.status(400).json({ error: "Bad request" });
            const subjectResult = await updateSubjectPeriodId(parseInt(periodId), parseInt(subjectId));
            return res.status(200).json(subjectResult);
        }

    }
}
