import '../css/index.css'
import {getTheme, setTheme, toggleTheme} from "../utils/theme";
import {Theme} from "../utils/Contexts";
import React, {useState} from "react";

function MyApp({Component, pageProps}) {
    let [, forceUpdate] = useState({});
    return <Theme.Provider value={{
        theme: getTheme(),
        toggleTheme: () => {
            toggleTheme();
            forceUpdate({})
        },
        setTheme: (theme) => {
            setTheme(theme);
            forceUpdate({});
        }
    }}>
        <Component {...pageProps} />
    </Theme.Provider>
}

export default MyApp;