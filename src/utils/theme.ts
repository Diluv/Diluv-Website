import { CSSProperties } from "react";
import { State } from "react-select/base";
import { OptionTypeBase } from "react-select/src/types";
import { Styles } from "react-select";

export const reactSelectStyle: Partial<Styles> = {
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
    option: (provided: CSSProperties, state: State<OptionTypeBase>): Partial<CSSProperties> => ({
        ...provided,
        color: "black"
    })
};
