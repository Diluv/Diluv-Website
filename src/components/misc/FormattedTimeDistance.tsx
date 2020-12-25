import React, { useEffect, useLayoutEffect, useState } from "react";
import formatDistance from "date-fns/formatDistance";

export default function FormattedDistanceTime({ prefix, start, end = new Date() }: { prefix?: string; start: number; end?: Date }) {
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
                {formatDistance(start, end, { addSuffix: true })}
            </span>
        </>
    );
}
