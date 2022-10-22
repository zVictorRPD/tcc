import type { NextApiRequest, NextApiResponse } from "next";
import { deleteEvent } from "../../../src/backend/calendar";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const {
            id,

        } : {
            id: string,

        } = req.body;
        
        if(isNaN(parseInt(id as string))) return res.status(400).json({ error: "Bad request" });

        const response = await deleteEvent(parseInt(id));

        return res.status(200).json(response);

    }
}
