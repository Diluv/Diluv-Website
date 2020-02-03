import React, {ReactNode, useEffect, useRef, useState} from "react";

function DropDown(props: { name: string, children: ReactNode, className?: string }) {

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    }: { ref: React.Ref<any>, isComponentVisible: boolean, setIsComponentVisible: Function } = useComponentVisible(false);

    return (<div ref={ref}>
        <div className={(props.className ? props.className + " " : "") + "pb-1"}>
            <p className={"cursor-pointer "} onClick={() => setIsComponentVisible(!isComponentVisible)}>{props.name}</p>
        </div>
        <div
            className={"fixed block bg-white mr-4  md:right-0 left-auto sm:inset-x-0 md:inset-auto" + (isComponentVisible ? "" : " hidden")}>
            {props.children}
        </div>
    </div>);
}

export function DropDownItem(props: { children: ReactNode, className?: string }) {
    return <div className={(props.className ? props.className + " " : "") + "text-gray-800 px-6 py-2"}>
        {props.children}
    </div>
}

export function DropDownLink(props: { children: ReactNode, className?: string, href: string }) {
    return <a href={props.href}>
        <div className={(props.className ? props.className + " " : "") + "text-gray-800 px-6 py-2"}>
            {props.children}
        </div>
    </a>
}

export function DropDownSpacer() {
    return <div className={"border-black-300 border-b"}/>
}

function useComponentVisible(initialIsVisible: false) {
    const [isComponentVisible, setIsComponentVisible] = useState(
        initialIsVisible
    );
    const ref = useRef(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = (event: { target: any; }) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return {ref, isComponentVisible, setIsComponentVisible};
}

export default DropDown;
