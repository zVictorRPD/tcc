import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createComplementary } from "../../../../src/backend/complementary";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = await getToken({ req })

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "POST") {
        const { name, time } = req.body;
        const userId = token.id as number;
        if(
            !name
            || !time
            || typeof name !== "string"
            || typeof time !== "number"
            || name.length > 100
            || time < 0
        ) return res.status(400).json({ error: "Bad Request" });

        console.log(time);
        

        const newTime = time < 1000 ? time : 1000;

        const response = await createComplementary(userId, name, newTime);

        return res.status(200).json(response);
    }
}
