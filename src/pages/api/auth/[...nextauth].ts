// @ts-ignore
import NextAuth, { InitOptions, User } from "next-auth";
// @ts-ignore
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";
import { IS4_URL } from "utils/api";
import { GenericObject, SessionBase } from "next-auth/_utils";

const options: InitOptions = {
    // Configure one or more authentication providers
    providers: [
        Providers.IdentityServer4({
            id: "DILUV" as "identity-server4",
            name: "Diluv" as "IdentityServer4",
            scope: "openid profile", // Allowed Scopes
            // @ts-ignore
            params: {
                grant_type: "authorization_code"
            },
            domain: IS4_URL,
            clientId: "DILUV_WEBSITE",
            profile: (profile: any) => {
                return { ...profile, id: profile.username, name: profile.preferred_username };
            }
        })
    ],
    callbacks: {
        session: async (session: SessionBase | GenericObject, user: GenericObject) => {
            session["user"]["id"] = user.id;
            session["accessToken"] = user.accessToken;
            return Promise.resolve(session);
        },
        jwt: async (token: any, user: any, account: any, profile: any, isNewUser: boolean) => {
            const hasAccount = !!account;
            if (hasAccount) {
                token.id = profile.username;
                token.accessToken = account.accessToken;
            }
            return Promise.resolve(token);
        }
    },
    session: {
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 60 * 60
    }
};

export default (req: NextApiRequest, res: NextApiResponse): unknown => NextAuth(req, res, options);
