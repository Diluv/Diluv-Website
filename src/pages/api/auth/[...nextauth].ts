import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { AUTH_URL, OPENID_CONNECT_URL } from "utils/api";
import jwt_decode from "jwt-decode";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "querystring";

const isTokenStale = (token: string): boolean => {
    const decodedToken: any = token && jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return currentTime >= decodedToken?.exp;
};

const refreshAuthToken = async (refreshToken: string) => {

    const responseData = await axios.post(`${OPENID_CONNECT_URL}token`, qs.stringify({
        "grant_type": "refresh_token",
        "refresh_token": refreshToken,
        "client_id": "DILUv_WEBSITE"
    }), {
        headers: {
            "Content-Type": `application/x-www-form-urlencoded`
        }
    }).then((response: AxiosResponse) => response).catch((reason: AxiosError) => {
        console.log("Failed to refresh token!");
        console.log(reason.response?.data);
        return reason.response;
    });
    if (responseData && responseData.data?.access_token) {
        return {
            accessToken: responseData.data.access_token,
            refreshToken: responseData.data.refresh_token
        };
    }
    return { accessToken: null, refreshToken: null };
};

const getTokens = async (accessToken: string, refreshToken: string) => {
    if (!isTokenStale(accessToken)) {
        return { accessToken, refreshToken };
    }
    const newTokens = await refreshAuthToken(refreshToken);
    return newTokens;
};

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
                accessTokenUrl: `${OPENID_CONNECT_URL}token`,
                authorizationUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/auth?response_type=code`,
                profileUrl: `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/userinfo`,
                profile: (profile: any) => {
                    return { ...profile, id: profile.username, name: profile.preferred_username };
                }
            }
        ],
        callbacks: {
            session: async (session: any, user: any, sessionToken: any) => {
                session["user"]["id"] = user.id;
                session["user"]["role"] = user.role;
                session["accessToken"] = user.accessToken;
                return Promise.resolve(session);
            },
            jwt: async (token: any, user: any, account: any, profile: any, isNewUser: boolean) => {
                if (profile) {
                    return Promise.resolve({
                        ...token,
                        id: profile.username,
                        role: profile.role,
                        accessToken: account.accessToken,
                        refreshToken: account.refreshToken
                    });
                }

                const { accessToken, refreshToken } = token;
                if (accessToken && refreshToken) {
                    const newToken = await getTokens(accessToken, refreshToken);
                    if (newToken.accessToken) {
                        return Promise.resolve({ ...token, accessToken: newToken.accessToken, refreshToken: newToken.refreshToken });
                    }
                }

                return Promise.resolve(token);
            }
        },
        session: {
            jwt: true,
            // Seconds - How long until an idle session expires and is no longer valid.
            // Set to 29 days
            maxAge: 29 * 24 * 60 * 60
        },
        events: {
            signOut: async (message: any) => {

                await axios.post(`${OPENID_CONNECT_URL}logout`, qs.stringify({
                    "refresh_token": message.refreshToken,
                    "client_id": "DILUV_WEBSITE"
                }), {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });

            }
        }
    }
;

// @ts-ignore
export default (req: NextApiRequest, res: NextApiResponse): unknown => NextAuth(req, res, options);
