import React, { ReactNode } from "react";
import Link from "next/link";
import { SITE_URL, useSession } from "utils/api";

export default function AuthorizedLink({
    href,
    children,
    className
}: {
    href: string;
    children: ReactNode;
    className?: string;
}): JSX.Element {
    const [session, loading] = useSession();
    if (!loading && session) {
        return (
            <Link href={href}>
                <a className={className}>{children}</a>
            </Link>
        );
    }
    return (
        <Link href={`${SITE_URL}/api/login?redirectTo=${href}`}>
            <a className={className}>{children}</a>
        </Link>
    );
}
