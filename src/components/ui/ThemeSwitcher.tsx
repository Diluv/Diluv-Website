import React, { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

export default function InternalThemeSwitcher() {
    const darkMode = useDarkMode(false, { classNameDark: "mode-dark", classNameLight: "mode-light" });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoaded(true);
        }
    }, []);

    if (!loaded) {
        return (
            <div className={`themeSwitcherContainer`}>
                <div className="themeSwitcher" />
            </div>
        );
    }
    return (
        <div className={`themeSwitcherContainer`} onClick={darkMode.toggle}>
            {darkMode.value ? <SunIcon className={`themeSwitcher`} /> : <MoonIcon className={`themeSwitcher`} />}
        </div>
    );
}
