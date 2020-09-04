import React from "react";

type Props = {
    fill?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

export const AtSymbol = ({ width = "20px", height = "20px", className = "" }: Props): JSX.Element => (
    <svg width={width} height={height} fill="none"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`svg-icon ${className || ""}`} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
);
export default AtSymbol;