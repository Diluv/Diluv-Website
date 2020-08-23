import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { isProduction, SITE_URL } from "utils/api";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body["theme"]) {
        res.writeHead(400);
        res.end(`Bad request! theme: ${req.body["theme"]}`);
        return;
    }

    const siteURL = SITE_URL;
    const expiresAt: Date = new Date(9999, 12, 31, 23, 59, 59);
    const domain = isProduction() ? new URL(siteURL).hostname : undefined;
    const options: CookieSerializeOptions = {
        path: "/",
        expires: expiresAt,
        secure: isProduction(),
        sameSite: "lax",
        domain: domain
    };
    res.setHeader("Set-Cookie", [serialize("theme", req.body["theme"], options)]);
    res.end();
};
