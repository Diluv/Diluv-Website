import { CSSProperties } from "react";
import { GetServerSidePropsContext } from "next";
import { Theme } from "../interfaces";
import { parse } from "cookie";
import { State } from "react-select/base";
import { OptionTypeBase } from "react-select/src/types";

export function getTheme(context: GetServerSidePropsContext): Theme {
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
    control: (provided: CSSProperties, state: State<OptionTypeBase>): Partial<CSSProperties> => ({
        ...provided,
        "borderRadius": 0,
        "borderColor": state.isFocused ? "#A0AEC0" : "#CBD5E0",
        "boxShadow": "none",
        // @ts-ignore
        "&:hover": {
            borderColor: "#A0AEC0"
        }
    }),
    option: (provided: CSSProperties, state: State<OptionTypeBase>): Partial<CSSProperties> => ({
        ...provided,
        color: "black"
    })
};
