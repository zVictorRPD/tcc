import type { NextApiRequest, NextApiResponse } from "next";
import { getTeacher } from "../../../src/backend/teachers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { page, name, departament_code, take } = req.query;

        if (typeof page !== "string" || typeof name !== "string" || typeof departament_code !== "string") return res.status(400).json({ error: "Bad request" });

        let newTake = typeof take === "string" ? parseInt(take) : 8;

        const response = await getTeacher(parseInt(page), name, departament_code, newTake);
        return res.status(200).json(response);


    }
}
