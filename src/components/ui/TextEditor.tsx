import React, { ChangeEventHandler, Ref, useRef, useState } from "react";

export default function TextEditor({ className, innerClassName, defaultValue, maxLength, onChange, innerRef }: { className: string, innerClassName: string, onChange: ChangeEventHandler<HTMLTextAreaElement>, defaultValue: string, innerRef: Ref<HTMLTextAreaElement>, maxLength: number }) {
    const [length, setLength] = useState(defaultValue.length);
    return <div className={`flex flex-col ${className}`}>
        <textarea
            className={`${innerClassName}`}
            onChange={event => {
                onChange(event);
                setLength(event.target.value.length);
            }}
            defaultValue={defaultValue}
            ref={innerRef}
            maxLength={maxLength}
        />
        <div className={`px-1 ml-auto my-1 ${length > (maxLength * 0.8) ? (length === maxLength ? `text-red-600 dark:text-red-400` : `text-amber-600 dark:text-amber-400`) : `dark:text-gray-400 `}`}>{length} / {maxLength}</div>
    </div>;
}
