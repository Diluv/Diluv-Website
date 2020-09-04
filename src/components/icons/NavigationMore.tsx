import React from "react";

type Props = {
    fill?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

export const NavigationMore = ({ width = "20px", height = "20px", className = "" }: Props): JSX.Element => (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`svg-icon ${className || ""}`}>
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

export default NavigationMore;
