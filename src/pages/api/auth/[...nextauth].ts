// @ts-ignore
import NextAuth from "next-auth";
// @ts-ignore
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";

const options = {
    site: process.env.NEXT_STATIC_SITE_URL,
    // Configure one or more authentication providers
    providers: [
        Providers.IdentityServer4({
            id: "DILUV",
            name: "Diluv",
            scope: "openid profile", // Allowed Scopes
            params: {
                grant_type: "authorization_code"
            },
            domain: process.env.NEXT_STATIC_IS4_URL,
            clientId: "DILUV_WEBSITE",
            profile: (profile: any) => {
                return { ...profile, id:  profile.username, name: profile.preferred_username};
            }
        })
    ],
    pages: {
        signin: "/auth/signin"
    },
    callbacks: {
        session: async (session: any, token: any) => {
            session["user"]["id"] = token.account.id;
            session["accessToken"] = token.account.accessToken;
            return Promise.resolve(session);
        }
    },
    events: {
        signout: async (message: any) => {
        }
    }

};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)