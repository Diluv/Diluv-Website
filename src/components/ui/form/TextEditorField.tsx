import React, { useState } from "react";
import { useField } from "formik";
import Select from "react-select";
import { reactSelectStyle } from "../../../utils/theme";

export default function TextEditorField(
    props: {
        className: string;
        innerClassName: string;
        maxLength: number;
        minLength: number;
        id: string;
    } & { [x: string]: any; name: string }
) {
    let { className, innerClassName, maxLength, id, minLength } = props;
    const [length, setLength] = useState(0);

    const [field, meta, helpers] = useField(props);

    const { touched, error, value } = meta;
    const { setValue, setTouched } = helpers;

    return (
        <div className={`flex flex-col ${className}`}>
            <textarea
                id={id}
                className={`${innerClassName}`}
                value={value}
                onChange={(event) => {
                    setLength(event.target.value.length);
                    setValue(event.target.value);
                    setTouched(true);
                }}
                maxLength={maxLength}
            />

            <div className={`flex justify-between my-1 px-1`}>
                {touched && error ? <span className={`text-red-600 dark:text-red-500`}>{error}</span> : <div />}
                <div
                    className={` ${
                        length > maxLength * 0.8
                            ? length >= maxLength
                                ? `text-red-600 dark:text-red-400`
                                : `text-amber-600 dark:text-amber-400`
                            : length - minLength < 0
                            ? `text-red-600 dark:text-red-400`
                            : `dark:text-gray-400`
                    }`}
                >
                    {length} / {maxLength}
                </div>
            </div>
        </div>
    );
}
