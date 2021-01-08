import React, { ReactNode } from "react";
import Download from "../icons/Download";
import { TableData } from "./Table";

export default function DownloadLink({ url, children, className="" }: { url: string, children: ReactNode, className?: string }) {
    return <a
        href={url}
        className={className}
        download={true}
    >
        {children}
    </a>;
}