import React from "react";

export const ThemeContext = React.createContext({
    pageTheme: "light",
    setTheme: (pageTheme: `light` | `dark`) => {
    }
});