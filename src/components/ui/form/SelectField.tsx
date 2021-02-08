import { useField } from "formik";
import Select, { ValueType } from "react-select";
import { reactSelectStyle } from "../../../utils/theme";
import React from "react";
import { SlugName } from "../../../interfaces";

export default function SelectField(props: { options: SlugName[]; iid: string; name: string }) {
    const [field, meta, helpers] = useField(props);

    const { options } = props;
    const { touched, error, value } = meta;
    const { setValue, setTouched } = helpers;

    function convertToOptions(slugNames: SlugName[]) {
        slugNames = slugNames || [];
        return slugNames.map((options) => {
            return { value: options.slug, label: options.name };
        });
    }

    function convertToSlugNames(options: ValueType<any, any>[]) {
        options = options || [];
        return options.map((option) => {
            return { slug: option.value, name: option.label };
        });
    }

    return (
        <Select
            isSearchable={true}
            inputId={props.iid}
            instanceId={props.iid}
            options={convertToOptions(options)}
            name={props.name}
            value={convertToOptions(value)}
            isMulti={true}
            onChange={(option: ValueType<any, any>[]) => {
                setValue(convertToSlugNames(option));
            }}
            styles={reactSelectStyle}
            classNamePrefix={"select"}
            className={`flex-grow`}
            onBlur={() => {
                setTouched(true);
            }}
        />
    );
}
