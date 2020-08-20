import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body["theme"]) {
        res.writeHead(400);
        res.end(`Bad request! theme: ${req.body["theme"]}`);
        return;
    }

    const siteURL = process.env.NEXT_STATIC_SITE_URL || 'https://diluv.com';
    const expiresAt: Date = new Date(9999, 12, 31, 23, 59, 59);
    const domain = process.env.NODE_ENV == "production" ? new URL(siteURL).hostname : undefined;
    const options: CookieSerializeOptions = {
        path: "/",
        expires: expiresAt,
        secure: process.env.NODE_ENV == "production",
        sameSite: "lax",
        domain: domain
    };
    res.setHeader("Set-Cookie", [serialize("theme", req.body["theme"], options)]);
    res.end();
};
