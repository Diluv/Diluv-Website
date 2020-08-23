import React, { ReactNode, useContext } from "react";
import { Auth } from "../../utils/context";
import Link from "next/link";

// @ts-ignore
import { signin } from "next-auth/client";
import { SITE_URL } from "utils/api";

export default function AuthorizedLink({
    href,
    as,
    children,
    className
}: {
    href: string;
    as?: string;
    children: ReactNode;
    className?: string;
}): JSX.Element {
    const auth = useContext(Auth);

    if (auth.session) {
        return (
            <Link href={href} as={as}>
                <a className={className}>{children}</a>
            </Link>
        );
    }
    return (
        <p className={className} onClick={() => signin("DILUV", { callbackUrl: `${SITE_URL}${as}` })}>
            {children}
        </p>
    );
}
