import { initAuth0 } from "@auth0/nextjs-auth0";

export const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL as string;
export const OPENID_CONNECT_URL = `${AUTH_URL}/auth/realms/Diluv`;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

export default initAuth0({
    domain: `${OPENID_CONNECT_URL}`,
    clientId: "DILUV_WEBSITE",
    clientSecret: "DILUV_WEBSITE",
    scope: "openid profile",
    redirectUri: `${SITE_URL}/api/callback`,
    postLogoutRedirectUri: `${SITE_URL}`,
    session: {
        cookieSecret: `${COOKIE_SECRET}`,
        cookieLifetime: 60 * 60 * 8,
        cookieSameSite: "strict",
        storeIdToken: false,
        storeAccessToken: true,
        storeRefreshToken: true
    },
    oidcClient: {
        httpTimeout: 2500,
        clockTolerance: 10000
    }
});