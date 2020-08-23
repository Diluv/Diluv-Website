export const API_URL = process.env.API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const GOOGLE_ANALYTICS_KEY = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY as string;
export const GOOGLE_ADSENSE_KEY = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_KEY as string;

export function isProduction(){
    return process.env.NODE_ENV == "production";
}