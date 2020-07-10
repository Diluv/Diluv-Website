import React, { ReactNode, useContext } from "react";
import { Auth } from "../../utils/context";
import Link from "next/link";

// @ts-ignore
import { signin } from "next-auth/client";

export default function AuthorizedLink({ href, as, children, className }: { href: string, as?: string, children: ReactNode, className?: string }) {

    const auth = useContext(Auth);

    if (auth.session) {
        return <Link href={href} as={as}>
            <a className={className}>
                {children}
            </a>
        </Link>;
    }
    console.log(`${process.env.NEXT_STATIC_SITE_URL}/${as}`);
    return <p className={className} onClick={() => signin("DILUV", { callbackUrl: `${process.env.NEXT_STATIC_SITE_URL}${as}` })}>
        {children}
    </p>;

}