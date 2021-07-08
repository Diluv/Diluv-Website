import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { UrlObject } from "url";

type LineMenuItemProps = PropsWithChildren<{
    itemKey: string,
    hidden?: boolean;
    side: "left" | "right";
    current?: boolean;
    href: string | UrlObject
    accentClass?: string;
    currentClass?: string;
    preset?: `normal` | `authed`;
}>

export function LineMenu({
        children,
        current
    }: PropsWithChildren<{ current: string }>
): JSX.Element {
    children = React.Children.map(children, child => {
        if (!React.isValidElement<LineMenuItemProps>(child)) {
            return child;
        }
        return <LineMenuItem {...child.props} current={child.props.itemKey === current} key={child.props.itemKey}>
            {child.props.children}
        </LineMenuItem>;
    });
    return <div
        className={`flex flex-col sm:flex-row justify-between border-b-2 border-gray-300 dark:border-dark-700 text-center sm:text-left mt-4 mb-4`}>
        <div className={`flex flex-col sm:flex-row`}>
            {React.Children.toArray(children).filter(value => React.isValidElement<LineMenuItemProps>(value) && value.props.side === "left")}
        </div>
        <div className={`flex flex-col sm:flex-row`}>
            {React.Children.toArray(children).filter(value => React.isValidElement<LineMenuItemProps>(value) && value.props.side === "right")}
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
    href,
    preset
}: LineMenuItemProps): React.ReactElement<LineMenuItemProps, any> {
    if (hidden) {
        return <></>;
    }
    if (preset) {
        switch (preset) {
            case "normal":
                currentClass = `${currentClass} text-diluv-600 border-diluv-500`;
                accentClass = `${accentClass} hover:border-diluv-300 dark:hover:border-diluv-700`;
                break;
            case "authed":
                currentClass = `${currentClass} text-amber-600 border-amber-500`;
                accentClass = `${accentClass} hover:border-amber-300 dark:hover:border-amber-700`;
                break;
        }
    }
    let child =
        <div
            className={`py-2 sm:py-0 px-2 pb-1 -mb-0.125 select-none border-b-2  ${current ? `cursor-default ${currentClass}` : `${accentClass} cursor-pointer border-transparent dark:border-dark-700`}`}
            key={itemKey}>
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
