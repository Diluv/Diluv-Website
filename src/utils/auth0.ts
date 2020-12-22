import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
    domain: "diluv.lclc98.com:8080/auth/realms/Diluv",
    clientId: "DILUV_WEBSITE",
    clientSecret: "DILUV_WEBSITE",
    scope: "openid profile",
    redirectUri: "http://localhost:3000/api/callback",
    postLogoutRedirectUri: "http://localhost:3000/",
    session: {
        cookieSecret: "01234567890123456789012345678901234567890123456789",
        cookieLifetime: 60 * 60 * 8,
        // cookieDomain: 'localhost',
        cookieSameSite: "lax",
        storeIdToken: false,
        storeAccessToken: true,
        storeRefreshToken: true
    },
    oidcClient: {
        httpTimeout: 2500,
        clockTolerance: 10000
    }
});