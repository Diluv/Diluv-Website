import React, { CSSProperties } from "react";
import { State } from "react-select/base";
import { OptionTypeBase } from "react-select/src/types";
import { OptionProps, Styles } from "react-select";
import { StylesConfig } from "react-select/src/styles";

export const reactSelectStyle: StylesConfig<any, boolean> = {
    control: (base: CSSProperties, props: any) => {
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
    option(base: React.CSSProperties, props: OptionProps<any, boolean>): React.CSSProperties {
        return {
            ...base,
            color: "black"
        };
    }
};
