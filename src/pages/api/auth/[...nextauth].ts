// @ts-ignore
import NextAuth from "next-auth";
// @ts-ignore
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";

const options = {
    site: process.env.NEXT_STATIC_SITE_URL || "http://localhost:3000",

    // Configure one or more authentication providers
    providers: [
        Providers.IdentityServer4({
            id: "DILUV_WEBSITE",
            name: "Diluv Website",
            scope: "openid profile email", // Allowed Scopes
            params: {
                grant_type: 'authorization_code'
            },
            domain: "is4.imja.red",
            clientId: "DILUV_WEBSITE"
        })
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)