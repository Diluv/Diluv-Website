import React, { ReactNode } from "react";

export default function DownloadLink({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
    return (
        <a href={url} className={className} download={true}>
            {children}
        </a>
    );
}
