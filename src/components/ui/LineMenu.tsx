import React, { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import { UrlObject } from "url";

interface LineMenuItemProps {
    itemKey: string,
    children: ReactNode;
    hidden?: boolean;
    side: "left" | "right";
    current?: boolean;
    href: string | UrlObject
    accentClass?: string;
    currentClass?: string;
}

export function LineMenu({
    children,
    current
}: { current: string, children: PropsWithChildren<React.ReactElement<LineMenuItemProps, any>[]> }): JSX.Element {

    children = children.map(value =>
        <LineMenuItem {...value.props} current={value.props.itemKey === current} key={value.props.itemKey}>{value.props.children}</LineMenuItem>);
    return <div className={`flex flex-col sm:flex-row justify-between border-b-2 border-gray-300 dark:border-dark-700 text-center sm:text-left mt-4 mb-4`}>
        <div className={`flex flex-col sm:flex-row`}>
            {children.filter(value => value.props.side === "left")}
        </div>
        <div className={`flex flex-col sm:flex-row`}>
            {children.filter(value => value.props.side === "right")}
        </div>
    </div>;
}


export function LineMenuItem({
    itemKey,
    children,
    hidden = false,
    accentClass = "border-diluv-500 hover:border-diluv-500",
    currentClass = "",
    current,
    href
}: LineMenuItemProps): React.ReactElement<LineMenuItemProps, any> {
    if (hidden) {
        return <></>;
    }
    let child =
        <div className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 select-none border-b-2  ${current ? `cursor-default ${currentClass}` : `${accentClass} cursor-pointer border-transparent dark:border-dark-700`}`} key={itemKey}>
            {children}
        </div>;

    if (current) {
        return child;
    }

    return <Link href={href}>
        <a className={`block`}>
            {child}
        </a>
    </Link>;
}