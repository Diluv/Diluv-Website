import { Dispatch, MutableRefObject, useEffect, useRef, useState } from "react";

interface VisibleProps {
    ref: MutableRefObject<any>;
    isComponentVisible: boolean;
    setIsComponentVisible: Dispatch<any>;
}

export default function useComponentVisible(initialIsVisible = false): VisibleProps {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = (event: { target: any }) => {
        const { current }: MutableRefObject<any> = ref;
        if (current && !current.contains(event.target)) {
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

    return { ref, isComponentVisible, setIsComponentVisible };
}

export function matchesMedia(query: string) {
    const mediaQuery = window.matchMedia(query);
    const getValue = () => {
        return mediaQuery.matches;
    };
    const [value, setValue] = useState(getValue);
    useEffect(
        () => {
            const handler = () => setValue(getValue);
            mediaQuery.addListener(handler);
            return () => mediaQuery.removeListener(handler);
        },
        []
    );

    return value;
}