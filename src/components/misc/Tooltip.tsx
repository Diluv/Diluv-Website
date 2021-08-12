import React, { PropsWithChildren, ReactNode } from "react";
import { ClientReactTooltip } from "../../utils/dynamic";

export default function Tooltip({
    id,
    children,
    tooltipContent,
    className = ""
}: PropsWithChildren<{ id: string; tooltipContent: ReactNode, className?: string }>) {

    return (
        <div className={className}>
            <span className={`inline-flex`} data-tip={true} data-for={id}>
                {children}
            </span>
            <ClientReactTooltip
                id={id}
                effect="solid"
                border={true}
                type="dark"
                delayHide={150}
                delayUpdate={1}
                aria-haspopup="true"
            >
                <div className={`p-1 cursor-auto`}>
                    {tooltipContent}
                </div>
            </ClientReactTooltip>
        </div>
    );
}

