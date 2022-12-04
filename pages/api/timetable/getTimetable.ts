import type { NextApiRequest, NextApiResponse } from "next";
import { getTimetable } from "../../../src/backend/timetable";
import { getCurriculum } from "../../../src/backend/curriculum";
import { getToken } from "next-auth/jwt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "GET") {
        const userId = token.id as number;

        const response = await getCurriculum(userId);
        const { curriculum, hasCurriculum } = response;

        if (!hasCurriculum) return res.status(200).json(response);
        
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

        const timetable = await getTimetable(userId);
        
        return res.status(200).json({
            periods: periodsData,
            subjects: subjectsData,
            hasCurriculum,
            timetable: timetable !== null && timetable.timetable ? JSON.parse(timetable.timetable) : null
        });

    }
}
