import format from "date-fns/format";
import React, { useLayoutEffect, useState } from "react";
import formatDistance from "date-fns/formatDistance";

export default function FormattedTime({ prefix, time }: { prefix?: string, time: number }) {

    let [browser, setBrowser] = useState(false);

    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            setBrowser(true);
        }
    });

    if (!browser) {
        return <>
            <div className={`flex`}>
                <span>{prefix + ` `}</span>
                <div className={`ml-1 animate-pulse my-auto`}>
                    <div className={`h-4 bg-gray-400 dark:bg-dark-600 ${prefix ? `w-40` : `w-24`}`}/>
                </div>
            </div>
        </>;
    }

    return <>
        <span>{prefix ? prefix + ` ` : ``}{format(time, "yyyy-MM-dd HH:mm:ss")}</span>
    </>;
}


export function FormattedDistanceTime({ prefix, start, end = new Date() }: { prefix?: string, start: number, end?: Date }) {

    let [browser, setBrowser] = useState(false);

    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            setBrowser(true);
        }
    });

    if (!browser) {
        return <>
            <div className={`flex`}>
                <span>{prefix ? prefix + ` ` : ``}</span>
                <div className={`ml-1 animate-pulse my-auto`}>
                    <div className={`h-4 bg-gray-400 dark:bg-dark-600 ${prefix ? `w-40` : `w-24`}`}/>
                </div>
            </div>
        </>;
    }

    return <>
        <span>{prefix ? prefix + ` ` : ``}{formatDistance(start, end, { addSuffix: true })}</span>
    </>;
}