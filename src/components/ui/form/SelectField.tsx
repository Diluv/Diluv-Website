import { useField } from "formik";
import Select, { ValueType } from "react-select";
import { reactSelectStyle } from "utils/theme";
import React from "react";
import { SlugName } from "interfaces";
import { Option } from "react-select/src/filters";

export default function SelectField(props: {
    options: SlugName[];
    iid: string;
    name: string;
    isMulti: boolean;
    closeOnSelect: boolean;
    filterOption?: ((option: Option, rawInput: string) => boolean) | null;
}) {
    const [field, meta, helpers] = useField(props);

    const { options } = props;
    const { touched, error, value } = meta;
    const { setValue, setTouched } = helpers;

    function convertToOptions(slugNames: SlugName | SlugName[]) {
        if (!Array.isArray(slugNames)) {
            slugNames = [slugNames];
        }
        slugNames = slugNames || [];
        return slugNames.map((options) => {
            if (typeof options !== "undefined") {
                return { value: options.slug, label: options.name };
            }
        });
    }

    function convertToValue(slugNames: SlugName | SlugName[]) {
        if (props.isMulti) {
            if (!Array.isArray(slugNames)) {
                slugNames = [slugNames];
            }
            slugNames = slugNames || [];
            return slugNames.map((options) => {
                if (typeof options !== "undefined") {
                    return { value: options.slug, label: options.name };
                }
            });
        }
        return { value: (slugNames as SlugName).slug, label: (slugNames as SlugName).name };
    }

    function convertToSlugNames(options: ValueType<any, any> | ValueType<any, any>[]) {
        if (props.isMulti) {
            if (!Array.isArray(options)) {
                options = [options];
            }
            options = options || [];
            return options.map((option: ValueType<any, any>) => {
                return { slug: option.value, name: option.label };
            });
        }

        return { slug: options.value, name: options.label };
    }

    return (
        <Select
            isSearchable={true}
            inputId={props.iid}
            instanceId={props.iid}
            options={convertToOptions(options)}
            name={props.name}
            value={convertToValue(value)}
            isMulti={props.isMulti}
            onChange={(option: ValueType<any, any>[]) => {
                setValue(convertToSlugNames(option));
            }}
            styles={reactSelectStyle}
            classNamePrefix={"select"}
            className={`flex-grow`}
            onBlur={() => {
                setTouched(true);
            }}
            openMenuOnFocus={true}
            closeMenuOnSelect={props.closeOnSelect}
            filterOption={props.filterOption}
            tabSelectsValue={false}
        />
    );
}
