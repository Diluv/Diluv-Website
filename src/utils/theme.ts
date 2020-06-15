import { CSSProperties } from "react";

export function getTheme(): "light" | "dark" {
    if (typeof localStorage === "undefined") {
        return "light";
    }
    let item = localStorage.getItem("theme");
    if (!item) {
        item = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        localStorage.setItem("theme", item);
    }

    return item === "dark" ? "dark" : "light";
}

export function setTheme(theme: string) {
    if (typeof localStorage === "undefined") {
        return;
    }
    localStorage.setItem("theme", theme);
}

export const toggleTheme = (): "light" | "dark" => {
    if (typeof localStorage === "undefined") {
        return "light";
    }
    let item = localStorage.getItem("theme");
    if (!item) {
        item = "light";
    }
    const inverse = item === "light" ? "dark" : "light";
    localStorage.setItem("theme", inverse);
    return inverse;
};


export const reactSelectStyle = ({
    control: (provided: CSSProperties, state: any) => ({
        ...provided,
        borderRadius: 0,
        borderColor: state.isFocused ? "#A0AEC0" : "#CBD5E0",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#A0AEC0"
        }
    }),
    option: (provided: CSSProperties, state: any) => ({
        ...provided,
        color: "black"
    })
});