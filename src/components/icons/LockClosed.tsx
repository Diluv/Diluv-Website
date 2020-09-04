import React from "react";

type Props = {
    fill?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

export const LockClosed = ({ width = "20px", height = "20px", className = "" }: Props): JSX.Element => (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor" className={`svg-icon ${className || ""}`}>
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);
export default LockClosed;
