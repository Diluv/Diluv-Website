import React, { useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { ThemeContext } from "../../utils/Context";

export default function InternalThemeSwitcher() {
    const theme = useContext(ThemeContext);

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
        <div className={`themeSwitcherContainer`} onClick={() => {
            theme.setTheme(theme.pageTheme === "dark" ? "light" : "dark");
        }}>
            {theme.pageTheme === "dark" ? <SunIcon className={`themeSwitcher`} /> : <MoonIcon className={`themeSwitcher`} />}
        </div>
    );
}
