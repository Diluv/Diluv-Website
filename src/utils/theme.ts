import { CSSProperties } from "react";
import { GetServerSidePropsContext } from "next";
import { Theme } from "../interfaces";
import { parse } from "cookie";
import { State } from "react-select/base";
import { OptionTypeBase } from "react-select/src/types";
import { Styles, StylesConfig } from "react-select";
import { ControlProps } from "react-select/src/components/Control";
import { StylesConfigFunction } from "react-select/src/styles";

export function getTheme(context: GetServerSidePropsContext): Theme {
    let theme = "light";
    if (context.req) {
        if (context.req.headers.cookie) {
            return getCookieTheme(context.req.headers.cookie);
        }
    }
    return { theme };
}

export function getCookieTheme(cookie: string): Theme {
    let theme = "light";
    if (parse(cookie)["theme"]) {
        theme = parse(cookie)["theme"];
        if (theme !== "light" && theme !== "dark") {
            theme = "light";
        }
    }
    return { theme };
}

export const reactSelectStyle: Partial<Styles> = {
    control: (base: CSSProperties, props: any) => {
        return {
            ...base,
            "borderRadius": 0,
            "borderColor": props.isFocused ? "#A0AEC0" : "#CBD5E0",
            "boxShadow": "none",
            // @ts-ignore
            "&:hover": {
                borderColor: "#A0AEC0"
            }
        };
    },
    option: (provided: CSSProperties, state: State<OptionTypeBase>): Partial<CSSProperties> => ({
        ...provided,
        color: "black"
    })
};
