import type { NextApiRequest, NextApiResponse } from "next";
import { getSubject } from "../../../src/backend/subjects";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { page, code, name, time } = req.query;
        const newTime = time !== '' ? time : '0';

        if (typeof page !== "string"
            || typeof code !== "string"
            || typeof name !== "string"
            || typeof time !== "string"
            || typeof newTime !== "string"
            || isNaN(Number(page))
            || isNaN(Number(newTime))
            || Number(page) < 0
            || Number(newTime) < 0
            ) return res.status(400).json({ error: "Bad request" });
        
        const response = await getSubject(parseInt(page), code, name, parseInt(newTime));
        res.status(200).json(response);
        

    }
}
