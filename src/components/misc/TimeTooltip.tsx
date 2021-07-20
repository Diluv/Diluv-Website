import React, { PropsWithChildren, ReactNode } from "react";
import { FormattedTime } from "../../utils/dynamic";
import ReactTooltip from "react-tooltip";
import FormattedTimeDistance from "./FormattedTimeDistance";

export function Tooltip({ id, children, tooltipContent, className="" }: PropsWithChildren<{ id: string; tooltipContent: ReactNode, className?: string }>) {

    return (
        <div className={className}>
            <span className={`inline-flex`} data-tip={true} data-for={id}>
                {children}
            </span>
            <ReactTooltip
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
            </ReactTooltip>
        </div>
    );
}

export function TimeTooltip({ id, prefix, time }: { id: string; prefix?: string; time: string }) {

    return <Tooltip id={id} tooltipContent={<FormattedTime time={time} />}>
        <FormattedTimeDistance start={time} prefix={prefix} />
    </Tooltip>;
}
