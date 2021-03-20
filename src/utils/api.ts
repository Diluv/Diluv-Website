export const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL as string;
export const OPENID_CONNECT_URL = `${AUTH_URL}/auth/realms/Diluv/protocol/openid-connect/`;

export const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL as string;
export const GOOGLE_ANALYTICS_KEY = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY as string;
export const GOOGLE_ADSENSE_KEY = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_KEY as string;

export function isProduction() {
    return process.env.NODE_ENV == "production";
}
