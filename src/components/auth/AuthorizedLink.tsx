import React from "react";
import Link from "next/link";
import { signin, useSession } from "next-auth/client";
import { SITE_URL } from "../../utils/api";

export default function AuthorizedLink({ href, children, className }: React.PropsWithChildren<{ href: string; className: string }>): JSX.Element {
    const [session, loading] = useSession();
    if (!loading && session) {
        return (
            <Link href={href}>
                <a className={className}>{children}</a>
            </Link>
        );
    }
    return (
        <span
            className={className}
            onClick={() => {
                signin("DILUV", { callbackUrl: `${SITE_URL}${href.startsWith("/") ? href : "/" + href}` });
            }}
        >
            {children}
        </span>
    );
}
