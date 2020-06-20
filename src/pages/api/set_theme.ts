import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body["theme"]) {
        res.writeHead(400).end(`Bad request! theme: ${req.body["theme"]}`);
        return;
    }
    let expiresAt: Date = new Date(9999, 12, 31, 23, 59, 59);
    let options: CookieSerializeOptions = { path: '/', expires: expiresAt };
    res.setHeader('Set-Cookie', [serialize('theme', req.body["theme"], options)]);
    res.end();
};