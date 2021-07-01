import NextAuth, { Account, Profile, User } from "next-auth";
import { AUTH_URL, OPENID_CONNECT_URL } from "utils/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import qs from "querystring";
import { DefinedJWT, SessionWithExtra } from "interfaces";

async function refreshAccessToken(token: DefinedJWT) {

    const responseData = await axios.post(`${OPENID_CONNECT_URL}token`,
        qs.stringify({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
            client_id: "DILUV_WEBSITE"
        }), {
            headers: {
                "Content-Type": `application/x-www-form-urlencoded`
            }
        }).then((response: AxiosResponse) => {
        return { error: false, response: response.data };
    }).catch((reason: AxiosError) => {
        console.log("Failed to refresh token!");
        console.log(reason.response?.data);
        console.log(token.refreshToken);
        return { error: true, response: reason.response };
    });

    if (responseData.error) {
        console.log(responseData.response);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        };
    }

    return {
        ...token,
        accessToken: responseData.response.access_token,
        accessTokenExpires: Date.now() + responseData.response.expires_in * 1000,
        refreshToken: responseData.response.refresh_token ?? token.refreshToken // Fall back to old refresh token
    };
}

export default NextAuth({
    providers: [
        // @ts-ignore
        {
            id: "DILUV",
            name: "Diluv",
            type: "oauth",
            version: "2.0",
            scope: "openid profile",
            params: { grant_type: "authorization_code" },
            domain: AUTH_URL,
            clientId: "DILUV_WEBSITE",
            accessTokenUrl: `${OPENID_CONNECT_URL}token`,
            authorizationUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/auth?response_type=code`,
            profileUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/userinfo`,
            profile: (profile: any) => {
                return { ...profile, id: profile.username, name: profile.preferred_username };
            }
        }
    ],
    callbacks: {
        session: async (session: SessionWithExtra, token: DefinedJWT) => {
            // Not sure on the types of this
            if (token) {
                session.user = token.user as any;
                session.accessToken = token.accessToken;
                session.error = token.error;
            }

            return session;
        },
        jwt: async (token: DefinedJWT, user: User, account: Account, profile: Profile, isNewUser: boolean) => {

            if (account && user) {
                return {
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + (account.expires_in || 0) * 1000,
                    refreshToken: account.refresh_token,
                    user
                };
            }
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }
            return refreshAccessToken(token);
        }
    },
    session: {
        jwt: true
    },
    events: {
        signOut: async (message: any) => {
            await axios.post(
                `${OPENID_CONNECT_URL}logout`,
                qs.stringify({
                    refresh_token: message.refreshToken,
                    client_id: "DILUV_WEBSITE"
                }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }
            );
        }
    }
});
