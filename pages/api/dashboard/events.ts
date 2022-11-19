import type { NextApiRequest, NextApiResponse } from "next";
import { getEvents } from "../../../src/backend/dashboard";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        const { id } = req.query;
        
        if (isNaN(parseInt(id as string)) || typeof id !== "string") return res.status(400).json({ error: "Bad request" });

        const response = await getEvents(parseInt(id));
        res.status(200).json(response);


    }
}
