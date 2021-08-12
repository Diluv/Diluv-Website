import { FormattedTime } from "../../utils/dynamic";
import FormattedTimeDistance from "./FormattedTimeDistance";
import React from "react";
import Tooltip from "./Tooltip";

export default function TimeTooltip({ id, prefix, time }: { id: string; prefix?: string; time: string }) {

    return <Tooltip id={id} tooltipContent={<FormattedTime time={time} />}>
        <FormattedTimeDistance start={time} prefix={prefix} />
    </Tooltip>;
}
