import auth0 from "../../utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.error == "login_required") {
        res.redirect("/");
        return;
    }
    try {
        await auth0.handleCallback(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}