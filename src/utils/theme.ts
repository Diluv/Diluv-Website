import { StylesConfig } from "react-select";
import { CSSObject } from "@emotion/serialize";
import { OptionTypeBase } from "react-select/src/types";

export const reactSelectStyle: StylesConfig<any, boolean> = {
    control(base: CSSObject, props: OptionTypeBase): CSSObject {
        return {
            ...base,
            "borderRadius": 0,
            "borderColor": props.isFocused ? "#A0AEC0" : "#CBD5E0",
            "boxShadow": "none",
            "&:hover": {
                borderColor: "#A0AEC0"
            }
        };
    },
    option(base: CSSObject, props: OptionTypeBase): CSSObject {
        return {
            ...base,
            color: "black"
        };
    }
};
