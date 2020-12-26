import { IncomingMessage } from "http";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
export const GOOGLE_ANALYTICS_KEY = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY as string;
export const GOOGLE_ADSENSE_KEY = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_KEY as string;

export function isProduction() {
    return process.env.NODE_ENV == "production";
}

export interface Session {
    accessToken: string
    user: {
        username: string
        userId: number
        preferred_username: string
    },
    accessTokenExpiresAt: number
}

export const __DILUV: { _clientSession?: Session | null } = {
    _clientSession: undefined,
};

// @ts-ignore
export const SessionContext = createContext();

export const useSession = (session: Session | null = null): [Session | null | undefined, boolean] => {
    const value = useContext(SessionContext);

    if (value === undefined) {
        return _useSessionHook(session);
    }
    // @ts-ignore
    return value;
};

interface NextContext {
    req?: IncomingMessage;
    ctx?: { req: IncomingMessage };
}

export const getSession = async ({ req, ctx }: NextContext = {}): Promise<Session | null> => {
    if (!req && ctx && ctx.req) {
        req = ctx.req;
    }
    const fetchOptions = req ? { headers: { cookie: req.headers.cookie! } } : {};
    try {
        const res = await fetch(`${SITE_URL}/api/session`, fetchOptions);
        const data = await res.json();
        return Promise.resolve(Object.keys(data).length > 0 ? data : null);
    } catch (error) {
        return Promise.resolve(null);
    }
};

function _useSessionHook(session: Session | null): [Session | null | undefined, boolean] {
    const router = useRouter();
    const [data, setData] = useState(session);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const _getSession = async (refresh = false) => {
            const clientSession = __DILUV._clientSession;
            if (!refresh) {
                if (clientSession === undefined) {
                    __DILUV._clientSession = null;
                }
                if (clientSession) {
                    const r = clientSession.accessTokenExpiresAt * 1000 - 60000;
                    if (r >= Date.now()) {
                        return;
                    }
                }
            }
            const session = await getSession();
            __DILUV._clientSession = session;

            if (!session) {
                if (localStorage.getItem("diluv") != null) {
                    localStorage.removeItem("diluv");
                    router.push(`/api/silent-login`);
                }
            } else if (localStorage.getItem("diluv") == null) {
                localStorage.setItem("diluv", "true");
            }
            setData(session);
            setLoading(false);
        };

        _getSession();
    });

    return [data, loading];
}