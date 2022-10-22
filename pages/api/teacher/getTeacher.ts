import type { NextApiRequest, NextApiResponse } from "next";
import { getTeacher } from "../../../src/backend/teachers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { page, name, departament_code } = req.query;

        if (typeof page === "string" && typeof name === "string" && typeof departament_code === "string") {
            const response = await getTeacher(parseInt(page), name, departament_code);
            res.status(200).json(response);
        }else{
            res.status(400).json({ error: "Bad request" });
        }

        // return res.status(200).json(response);


    }
}
