import React from "react";
import { HasSession } from "../interfaces";

export const Theme = React.createContext({
    theme: "light",
    toggleTheme: () => {
    },
    setTheme: (theme: string) => {
    }
});


export const Auth = React.createContext<HasSession>({
    session: undefined
});