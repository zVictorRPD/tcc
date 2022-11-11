import type { NextApiRequest, NextApiResponse } from "next";
import { getComplementary } from "../../../src/backend/complementary";
import { getCurriculum } from "../../../src/backend/curriculum";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { userId } = req.query;

        if (isNaN(parseInt(userId as string)) || typeof userId !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await getCurriculum(parseInt(userId));
        const { curriculum, hasCurriculum } = response;

        if (!hasCurriculum) return res.status(200).json(response);

        const periodsOrderData = JSON.parse(curriculum.curriculumPeriodsOrder).map((periodId: number) => periodId.toString());
        
        let periodsData: IPeriods = {};
        let subjectsData: ISubjects = {};

        curriculum.curriculumPeriods.forEach((period: any) => {

            periodsData[period.id] = {
                id: period.id.toString(),
                name: period.name,
                visible: period.visible,
                subjectIds: period.subjectsOrder !== null ? JSON.parse(period.subjectsOrder).map((subjectId:number) => subjectId.toString()) : [],
            }
            period.subjects.forEach((subject: any) => {
                subjectsData[subject.id] = {
                    id: subject.id.toString(),
                    code: subject.subject.code,
                    name: subject.subject.name,
                    isOptional: subject.isOptional,
                    period: period.name,
                    time: subject.subject.time,
                    status: subject.status,
                    note: subject.note,
                    links: subject.links !== null ? JSON.parse(subject.links) : [],
                    grade: subject.grade,
                    teacher: subject.teacher
                }
            });
        });

        const complementary = await getComplementary(parseInt(userId));

        return res.status(200).json({
            course: curriculum.course,
            periods: periodsData,
            subjects: subjectsData,
            periodsOrder: periodsOrderData,
            hasCurriculum,
            complementary
        });

    }
}
