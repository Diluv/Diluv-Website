import auth0 from "../../utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function session(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await auth0.getSession(req);
        if (session) {
            const tokenCache = auth0.tokenCache(req, res);
            const accessToken = await tokenCache.getAccessToken({ refresh: true });
            res.setHeader("Content-Type", "application/json");
            res.json({ accessToken, ...session });
            return;
        }
    } catch (error) {
    }
    res.setHeader("Content-Type", "application/json");
    res.json({});
}