import React, { useEffect, useState } from "react";
import { parseISO, formatDistance } from "date-fns";

export default function FormattedDistanceTime({ prefix, start, end = new Date() }: { prefix?: string; start: string; end?: Date }) {
    const [browser, setBrowser] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBrowser(true);
        }
    }, []);

    return (
        <>
            <span className={`transition-opacity duration-100 ease-out ${browser ? `opacity-100` : `opacity-0`}`}>
                {prefix ? prefix + ` ` : ``}
                {formatDistance(parseISO(start), end, { addSuffix: true })}
            </span>
        </>
    );
}
