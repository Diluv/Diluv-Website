import React, { MutableRefObject, ReactNode, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/solid";

function Alert(props: {
    className?: string;
    children?: ReactNode;
    type: "alert-danger" | "alert-warning" | "alert-success" | "alert-info";
    canDismiss?: boolean;
    onDismiss?: () => void;
}): JSX.Element {
    const [closed, setClosed] = useState(false);
    const { canDismiss, type, children, className } = props;

    const alertRef = useRef(null);
    if (closed) {
        return <></>;
    }
    return (
        <div className={`${className || ""} ${type} px-4 py-3 relative`} ref={alertRef}>
            {children}
            {canDismiss && (
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <XIcon
                        className={`fill-current h-6 w-6`}
                        onClick={() => {
                            const { current }: MutableRefObject<any> = alertRef;
                            if (current) {
                                current.classList += " fadeout";
                            }
                            setTimeout(() => {
                                setClosed(true);
                                if (props.onDismiss) {
                                    props.onDismiss();
                                }
                            }, 200);
                        }}
                        role={`button`}
                    />
                </span>
            )}
        </div>
    );
}

export default Alert;
