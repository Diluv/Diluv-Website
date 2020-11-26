import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AUTH_URL } from "utils/api";

const options = {
    // Configure one or more authentication providers
    providers: [
        {
            id: "DILUV",
            name: "Diluv",
            type: "oauth",
            version: "2.0",
            scope: "openid profile",
            params: { grant_type: "authorization_code" },
            domain: AUTH_URL,
            clientId: "DILUV_WEBSITE",
            accessTokenUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/token`,
            authorizationUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/auth?response_type=code`,
            profileUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/userinfo`,
            profile: (profile: any) => {
                return { ...profile, id: profile.username, name: profile.preferred_username };
            }
        }
    ],
    callbacks: {
        session: async (session: any, user: any) => {
            session["user"]["id"] = user.id;
            session["user"]["role"] = user.role;
            session["accessToken"] = user.accessToken;
            return Promise.resolve(session);
        },
        jwt: async (token: any, user: any, account: any, profile: any, isNewUser: boolean) => {
            const hasAccount = !!account;
            if (hasAccount) {
                token.id = profile.username;
                token.accessToken = account.accessToken;
                token.role = profile.role;
            }
            return Promise.resolve(token);
        }
    },
    session: {
        jwt: true,
        // Seconds - How long until an idle session expires and is no longer valid.
        // Set to 50 minutes
        maxAge: 3000
    }
};

export default (req: NextApiRequest, res: NextApiResponse): unknown => NextAuth(req, res, options);
