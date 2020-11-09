import React, { ReactNode } from "react";
import Download from "../icons/Download";
import { TableData } from "./Table";

export default function DownloadLink({ url, children }: { url: string, children: ReactNode }) {
    return <a
        href={url}
        className={`hover:text-diluv-600 dark-hover:text-diluv-500 cursor-pointer block px-2 py-3`}
        download={true}
    >
        {children}
    </a>;
}