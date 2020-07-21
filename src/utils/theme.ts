import { CSSProperties } from "react";
import { NextPageContext } from "next";
import { Theme } from "../interfaces";
import { parse } from "cookie";

export function getTheme(context: NextPageContext): Theme {
    let theme = "light";
    if (context.req) {
        if (context.req.headers.cookie) {
            if (parse(context.req.headers.cookie)["theme"]) {
                theme = parse(context.req.headers.cookie)["theme"];
                if (theme !== "light" && theme !== "dark") {
                    theme = "light";
                }
            }
        }
    }
    return { theme };
}

export const reactSelectStyle = {
    control: (provided: CSSProperties, state: any) => ({
        ...provided,
        "borderRadius": 0,
        "borderColor": state.isFocused ? "#A0AEC0" : "#CBD5E0",
        "boxShadow": "none",
        "&:hover": {
            borderColor: "#A0AEC0"
        }
    }),
    option: (provided: CSSProperties, state: any) => ({
        ...provided,
        color: "black"
    })
};
