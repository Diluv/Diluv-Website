import { useField } from "formik";
import Select from "react-select";
import { reactSelectStyle } from "../../../utils/theme";
import React from "react";

export default function SelectField(props: { [x: string]: any; name: string }) {
    const [field, meta, helpers] = useField(props);

    const { options } = props;
    const { touched, error, value } = meta;
    const { setValue, setTouched } = helpers;

    return (
        <Select
            isSearchable={true}
            inputId={props.iid}
            instanceId={props.iid}
            options={options}
            name={props.name}
            value={value}
            isMulti={true}
            onChange={(option) => {
                setValue(option);
                setTouched(true);
            }}
            styles={reactSelectStyle}
            classNamePrefix={"select"}
            className={`flex-grow`}
        />
    );
}
